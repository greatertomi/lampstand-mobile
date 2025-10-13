export default `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lampstand EPUB.js</title>
    <script id="jszip"></script>
    <script id="epubjs"></script>

    <style>
      body {
        margin: 0;
        /* Disable context menu and text selection globally */
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      #viewer {
        height: 300vh;
        width: 100vw;
        overflow: hidden !important;
        display: flex;
        justify-content: center;
        align-items: center;
        /* Ensure context menu is disabled on viewer */
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Disable context menu on all elements */
      * {
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Re-enable text selection only when enableSelection is true */
      .enable-selection * {
        -webkit-user-select: text;
        -webkit-touch-callout: default;
        -khtml-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
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
        manager: "continuous",
        flow: "scrolled",
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
        const [cleanHref, id] = href.split('#');
        let section = book.spine.get(cleanHref);

        if (!section) {
          const path = cleanHref.split('/');
          const lastPart = path[path.length - 1];
          section = book.spine.get(lastPart);

          // If still not found, search through spine items
          if (!section) {
            const spineItem = book.spine.items.find(
              (item) => item.href === cleanHref || item.href.endsWith('/' + cleanHref)
            );
            if (spineItem) {
              section = book.spine.get(spineItem.index);
            }
          }
        }


        if (section) {
          if (section.document && section.document.body) {
              const el = id ? section.document.getElementById(id) : section.document.body;
              return section.cfiFromElement(el || section.document.body);
          }
        }
        return null;
      }

      function getChapter(location) {
        if (!location?.start?.cfi) {
          return null;
        }

        const currentCfi = location.start.cfi;
        const flattenedToc = flatten(book.navigation.toc);

        return flattenedToc.reduce((result, chapter) => {
          const chapterCfi = getCfiFromHref(book, chapter.href);

          if (chapterCfi) {
            if (ePub.CFI.prototype.compare(currentCfi, chapterCfi) >= 0) {
              return chapter;
            }
          }
          return result;
        }, null);
      }

      // Apply selection class to body when selection is enabled
      if (enableSelection) {
        document.body.classList.add('enable-selection');
      }

      // Always disable context menu regardless of selection state
      rendition.themes.default({
        'body': {
          '-webkit-touch-callout': 'none', /* iOS Safari */
          '-webkit-user-select': enableSelection ? 'text' : 'none', /* Safari */
          '-khtml-user-select': enableSelection ? 'text' : 'none', /* Konqueror HTML */
          '-moz-user-select': enableSelection ? 'text' : 'none', /* Firefox */
          '-ms-user-select': enableSelection ? 'text' : 'none', /* Internet Explorer/Edge */
          'user-select': enableSelection ? 'text' : 'none'
        }
      });

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
            reader.onload = () => {
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

      rendition.on("selected", function (cfiRange) {
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

      // Comprehensive context menu disabling
      document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
      });

      // Disable long press context menu
      document.addEventListener('selectstart', function(e) {
        if (!enableSelection) {
          e.preventDefault();
          return false;
        }
      });

      // Disable drag start (can trigger context menu)
      document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
      });

      // Additional context menu prevention
      document.addEventListener('mousedown', function(e) {
        if (e.button === 2) { // Right click
          e.preventDefault();
          return false;
        }
      });

      // Disable touch context menu
      document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) { // Multi-touch
          e.preventDefault();
          return false;
        }
      });

      // Prevent default browser context menu on all elements
      document.addEventListener('DOMContentLoaded', function() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(function(element) {
          element.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
          });
        });
      });
    </script>
  </body>
</html>
`;
