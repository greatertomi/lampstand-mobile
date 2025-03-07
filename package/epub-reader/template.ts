/* eslint-disable max-len */
export default `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lampstand EPUB.js</title>
    <script id="jszip"></script>
    <script id="epubjs"></script>

    <style type="text/css">
      body {
        margin: 0;
      }

      #viewer {
        height: 100vh;
        width: 100vw;
        overflow: hidden !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>

  <body oncopy='return false' oncut='return false'>
    <div id="viewer"></div>

    <script>
      let book;
      let rendition;

      const type = window.type;
      const file = window.book;
      const theme = window.theme;
      const initialLocations = window.locations;
      const enableSelection = window.enable_selection;

      if (!file) {
        alert('Failed load book');
      }

      if (type === 'epub' || type === 'opf' || type === 'binary') {
        book = ePub(file);
      } else if (type === 'base64') {
        book = ePub(file, { encoding: "base64" });
      } else {
        alert('Missing file type');
      }

      rendition = book.renderTo("viewer", {
        width: "100%",
        height: "100%",
        manager: "default",
        flow: "auto",
        snap: undefined,
        spread: undefined,
        fullsize: undefined,
        allowPopups: allowPopups,
        allowScriptedContent: allowScriptedContent
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onStarted" }));

      function flatten(chapters) {
        return [].concat.apply([], chapters.map((chapter) => [].concat.apply([chapter], flatten(chapter.subitems))));
      }

      function getCfiFromHref(book, href) {
        const [_, id] = href.split('#')
        let section = book.spine.get(href.split('/')[1]) || book.spine.get(href) || book.spine.get(href.split('/').slice(1).join('/'))

        const el = (id ? section.document.getElementById(id) : section.document.body)
        return section.cfiFromElement(el)
      }

      function getChapter(location) {
          const locationHref = location.start.href

          let match = flatten(book.navigation.toc)
              .filter((chapter) => {
                  return book.canonical(chapter.href).includes(locationHref)
              }, null)
              .reduce((result, chapter) => {
                  const locationAfterChapter = ePub.CFI.prototype.compare(location.start.cfi, getCfiFromHref(book, chapter.href)) > 0
                  return locationAfterChapter ? chapter : result
              }, null);

          return match;
      }

      if (!enableSelection) {
        rendition.themes.default({
          'body': {
            '-webkit-touch-callout': 'none', /* iOS Safari */
            '-webkit-user-select': 'none', /* Safari */
            '-khtml-user-select': 'none', /* Konqueror HTML */
            '-moz-user-select': 'none', /* Firefox */
            '-ms-user-select': 'none', /* Internet Explorer/Edge */
            'user-select': 'none'
          }
        });
      }

      book.ready
        .then(function () {
          if (initialLocations) {
            return book.locations.load(initialLocations);
          }

          book.locations.generate(1600).then(function () {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "onLocationsReady",
              epubKey: book.key(),
              locations: book.locations.save(),
              totalLocations: book.locations.total,
              currentLocation: rendition.currentLocation(),
              progress: book.locations.percentageFromCfi(rendition.currentLocation().start.cfi),
            }));
          });
        })
        .then(function () {
          var displayed = rendition.display();

          displayed.then(function () {
            var currentLocation = rendition.currentLocation();

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "onReady",
              totalLocations: book.locations.total,
              currentLocation: currentLocation,
              progress: book.locations.percentageFromCfi(currentLocation.start.cfi),
            }));
          });

          book
          .coverUrl()
          .then(async (url) => {
            var reader = new FileReader();
            reader.onload = (res) => {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type: "meta",
                  metadata: {
                    cover: reader.result,
                    author: book.package.metadata.creator,
                    title: book.package.metadata.title,
                    description: book.package.metadata.description,
                    language: book.package.metadata.language,
                    publisher: book.package.metadata.publisher,
                    rights: book.package.metadata.rights,
                  },
                })
              );
            };
            reader.readAsDataURL(await fetch(url).then((res) => res.blob()));
          })
          .catch(() => {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "meta",
                metadata: {
                  cover: undefined,
                  author: book.package.metadata.creator,
                  title: book.package.metadata.title,
                  description: book.package.metadata.description,
                  language: book.package.metadata.language,
                  publisher: book.package.metadata.publisher,
                  rights: book.package.metadata.rights,
                },
              })
            );
          });

          book.loaded.navigation.then(function (item) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'onNavigationLoaded',
              toc: item.toc,
              landmarks: item.landmarks
            }));
          });
        })
        .catch(function (err) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onDisplayError",
          reason: err.message,
        }));
      });

      rendition.on('started', () => {
        rendition.themes.register({ theme: theme });
        rendition.themes.select('theme');
        rendition.themes.register('custom', {
        'body': {
          'font-family': "'plus-jakarta-sans', sans-serif !important"
        }
         });
        rendition.themes.select('custom');
        rendition.hooks.content.register((contents) => {
        const doc = contents.window.document;
        const style = document.createElement('style');
        style.innerHTML = \`
        @font-face {
            font-family: 'plus-jakarta-sans';
            src: url('../../assets/fonts/PlusJakartaSans-Regular.ttf') format('truetype');
        }
          * {
            font-family: 'plus-jakarta-sans', sans-serif !important;
          }
        \`;
        doc.head.appendChild(style);
      });
      });

      rendition.on("relocated", function (location) {
        var percent = book.locations.percentageFromCfi(location.start.cfi);
        var percentage = Math.floor(percent * 100);
        var chapter = getChapter(location);

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onLocationChange",
          totalLocations: book.locations.total,
          currentLocation: location,
          progress: percentage,
          currentSection: chapter,
        }));

        if (location.atStart) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "onBeginning",
          }));
        }

        if (location.atEnd) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "onFinish",
          }));
        }
      });

      rendition.on("orientationchange", function (orientation) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onOrientationChange',
          orientation: orientation
        }));
      });

      rendition.on("rendered", function (section) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onRendered',
          section: section,
          currentSection: book.navigation.get(section.href),
        }));
      });

      rendition.on("layout", function (layout) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onLayout',
          layout: layout
        }));
      });

      rendition.on("selected", function (cfiRange, contents) {
        book.getRange(cfiRange).then(function (range) {
          if (range) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'onSelected',
              cfiRange: cfiRange,
              text: range.toString()
            }));
          }
        });
      });

      rendition.on("resized", function (layout) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onResized',
          layout: layout
        }));
      });
    </script>
  </body>
</html>
`;
