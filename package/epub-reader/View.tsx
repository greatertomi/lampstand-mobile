import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions, View as RNView } from 'react-native';
import { WebView } from 'react-native-webview';

import { logger } from '../../utils';

import { OpeningBook } from './components/Loaders';
import { GestureHandler } from './GestureHandler';
import { ReaderContext } from './provider';
import { isLocationWithinRange } from './utils/helpers';

import type { Bookmark, ReaderProps, Location } from '../types';
import type { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

export type ViewProps = Omit<ReaderProps, 'src'> & {
  templateUri: string;
  allowedUris: string;
};

export const View = ({
  templateUri,
  allowedUris,
  onStarted = () => {},
  onReady = () => {},
  onDisplayError = () => {},
  onResized = () => {},
  onLocationChange = () => {},
  onRendered = () => {},
  onLocationsReady = () => {},
  onSelected = () => {},
  onOrientationChange = () => {},
  onLayout = () => {},
  onNavigationLoaded = () => {},
  onBeginning = () => {},
  onAddBookmark = () => {},
  onIsBookmarked = () => {},
  onFinish = () => {},
  onSingleTap = () => {},
  onDoubleTap = () => {},
  onLongPress = () => {},
  width,
  height,
  enableSwipe = true,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onSwipeUp = () => {},
  onSwipeDown = () => {},
  renderOpeningBookComponent = () => <OpeningBook width={width} height={height} theme={theme} />,
  openingBookComponentContainerStyle = {
    width: width || Dimensions.get('screen').width,
    height: height || Dimensions.get('screen').height
  },
  onPressExternalLink,
  menuItems,
  injectedJavascript,
  getInjectionJavascriptFn,
  waitForLocationsReady = false,
  flow,
  onBookStateUpdated = () => {},
  onReaderStateUpdated = () => {},
  onRemoveBookmark = () => {},
  onAddHighlight = () => {},
  onRemoveHighlight = () => {},
  onAddNote = () => {},
  onRemoveNote = () => {},
  bookState,
  readerState,
  theme,
  onSearch = () => {}
}: ViewProps) => {
  const {
    registerBook,
    setTotalLocations,
    setCurrentLocation,
    setMeta,
    setLocations,
    setAtStart,
    setAtEnd,
    goNext,
    goPrevious,
    goToLocation,
    setKey,
    setSection,
    setToc,
    setFlow,
    bookmarks,
    setIsBookmarked,
    setBookmarks,
    setBookState,
    setReaderState,
    highlights,
    setHighlight,
    setSearchResults,
    setIsSearching,
    notes,
    setNotes,
    isRendering,
    setIsRendering
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);
  const [selectedText, setSelectedText] = React.useState<{ cfiRange: string; cfiRangeText: string }>({
    cfiRange: '',
    cfiRangeText: ''
  });

  useEffect(() => {
    setFlow(flow || 'scrolled');
  }, [flow, setFlow]);

  useEffect(() => {
    if (getInjectionJavascriptFn && book.current) {
      getInjectionJavascriptFn(book.current.injectJavaScript);
    }
  }, [getInjectionJavascriptFn]);

  const handleChangeIsBookmarked = (items: Bookmark[], currentLoc: Location) => {
    const isBookmarked = items.some((bookmark) => isLocationWithinRange(currentLoc, bookmark.location));
    setIsBookmarked(isBookmarked);
    onIsBookmarked(isBookmarked);
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const onMessage = (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(event.nativeEvent.data);

    const { type } = parsedEvent;

    delete parsedEvent.type;

    if (type === 'meta') {
      const { metadata } = parsedEvent;
      setMeta(metadata);
    }

    if (type === 'onStarted') {
      setIsRendering(true);

      return onStarted();
    }

    if (type === 'onReady') {
      const { totalLocations, currentLocation, progress } = parsedEvent;
      if (!waitForLocationsReady) {
        setIsRendering(false);
      }

      if (bookState?.currentLocation?.start.cfi && bookState.currentLocation.start.cfi.trim() !== '') {
        goToLocation(bookState.currentLocation.start.cfi);
      }

      if (bookState) {
        setBookState(bookState);
      }

      if (readerState) {
        setReaderState(readerState);
      }

      if (injectedJavascript) {
        book.current?.injectJavaScript(injectedJavascript);
      }

      return onReady(totalLocations, currentLocation, progress);
    }

    if (type === 'onDisplayError') {
      const { reason } = parsedEvent;
      setIsRendering(false);

      return onDisplayError(reason);
    }

    if (type === 'onResized') {
      const { layout } = parsedEvent;

      return onResized(layout);
    }

    if (type === 'onBookStateUpdated') {
      const { trackedBookState } = parsedEvent;

      return onBookStateUpdated(trackedBookState);
    }

    if (type === 'onReaderStateUpdated') {
      const { trackedReaderState } = parsedEvent;

      return onReaderStateUpdated(trackedReaderState);
    }

    if (type === 'onLocationChange') {
      const { totalLocations, currentLocation, progress, currentSection } = parsedEvent;
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setSection(currentSection);

      handleChangeIsBookmarked(bookmarks, currentLocation);

      if (currentLocation.atStart) setAtStart(true);
      else if (currentLocation.atEnd) setAtEnd(true);
      else {
        setAtStart(false);
        setAtEnd(false);
      }
      return onLocationChange(totalLocations, currentLocation, progress, currentSection);
    }

    if (type === 'onLocationsReady') {
      const { epubKey, totalLocations, currentLocation } = parsedEvent;
      setLocations(parsedEvent.locations);
      setKey(epubKey);
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);

      if (waitForLocationsReady) {
        setIsRendering(false);
      }

      return onLocationsReady(epubKey, parsedEvent.locations);
    }

    if (type === 'onSelected') {
      const { cfiRange, text } = parsedEvent;

      setSelectedText({ cfiRange, cfiRangeText: text });

      return onSelected(text, cfiRange);
    }

    if (type === 'onAddNote') {
      const { noteItem } = parsedEvent;
      return onAddNote(noteItem);
    }

    if (type === 'onRemoveNote') {
      const { noteToRemove } = parsedEvent;
      setNotes(notes.filter((item) => item.id !== noteToRemove.id));
      return onRemoveNote(noteToRemove);
    }

    if (type === 'onOrientationChange') {
      const { orientation } = parsedEvent;

      return onOrientationChange(orientation);
    }

    if (type === 'onBeginning') {
      setAtStart(true);

      return onBeginning();
    }

    if (type === 'onFinish') {
      setAtEnd(true);

      return onFinish();
    }

    if (type === 'onRendered') {
      const { section, currentSection } = parsedEvent;

      return onRendered(section, currentSection);
    }

    if (type === 'onLayout') {
      const { layout } = parsedEvent;

      return onLayout(layout);
    }

    if (type === 'onNavigationLoaded') {
      const { toc } = parsedEvent;

      setToc(toc);

      return onNavigationLoaded({ toc });
    }

    if (type === 'onAddHighlight') {
      const { highlightedText } = parsedEvent;
      setHighlight([...highlights, highlightedText]);
      return onAddHighlight(highlightedText);
    }

    if (type === 'onRemoveHighlight') {
      const { highlightedText } = parsedEvent;
      setHighlight(highlights.filter((item) => item.id !== highlightedText.id));
      return onRemoveHighlight(highlightedText);
    }

    if (type === 'onAddBookmark') {
      const { bookmark } = parsedEvent;
      setBookmarks([...bookmarks, bookmark]);
      return onAddBookmark(bookmark);
    }

    if (type === 'onRemoveBookmark') {
      const { bookmark } = parsedEvent;
      setBookmarks(bookmarks.filter((item) => item.id !== bookmark.id));
      return onRemoveBookmark(bookmark);
    }

    if (type === 'onSearch') {
      const { results, totalResults, finished, error } = parsedEvent;
      
      if (error) {
        logger.error(`Search error: ${error}`);
        setIsSearching(false);
        return onSearch([], 0);
      }
      
      setSearchResults({ results: results || [], totalResults: totalResults || 0 });

      if (finished) {
        setIsSearching(false);
      }
      return onSearch(results || [], totalResults || 0);
    }

    if (type === 'webview_error') {
      const { error, stack } = parsedEvent;
      logger.error(`WebView injection error: ${error}`, { stack });
      return () => {};
    }

    return () => {};
  };

  const handleOnCustomMenuSelection = (event: {
    nativeEvent: {
      label: string;
      key: string;
      selectedText: string;
    };
  }) => {
    // eslint-disable-next-line consistent-return
    menuItems?.forEach((item) => {
      if (event.nativeEvent.label === item.label) {
        return item.action(selectedText.cfiRange, selectedText.cfiRangeText);
      }
    });
  };

  useEffect(() => {
    if (book.current) registerBook(book.current);
  }, [registerBook]);

  return (
    <RNView style={{ width, height }}>
      <GestureHandler
        width={width}
        height={height}
        onSingleTap={onSingleTap}
        onDoubleTap={onDoubleTap}
        onLongPress={onLongPress}
        onSwipeLeft={() => {
          if (enableSwipe) {
            goNext();
            onSwipeLeft();
          }
        }}
        onSwipeRight={() => {
          if (enableSwipe) {
            goPrevious();
            onSwipeRight();
          }
        }}
        onSwipeUp={() => {
          if (enableSwipe) {
            onSwipeUp();
          }
        }}
        onSwipeDown={() => {
          if (enableSwipe) {
            onSwipeDown();
          }
        }}
      >
        {isRendering && (
          <RNView
            style={{
              ...openingBookComponentContainerStyle,
              position: 'absolute',
              zIndex: 2
            }}
          >
            {renderOpeningBookComponent()}
          </RNView>
        )}

        <WebView
          ref={book}
          source={{ uri: templateUri }}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled
          domStorageEnabled
          thirdPartyCookiesEnabled={false}
          originWhitelist={['*']}
          scrollEnabled={false}
          renderToHardwareTextureAndroid
          removeClippedSubviews
          mixedContentMode="compatibility"
          androidHardwareAccelerationDisabled={false}
          androidLayerType="hardware"
          cacheEnabled
          cacheMode="LOAD_DEFAULT"
          textZoom={100}
          onMessage={onMessage}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            logger.error(`WebView error: ${nativeEvent.description}`);
            setIsRendering(false);
          }}
          menuItems={[]}
          onCustomMenuSelection={handleOnCustomMenuSelection}
          allowingReadAccessToURL={allowedUris}
          allowUniversalAccessFromFileURLs
          allowFileAccessFromFileURLs
          allowFileAccess
          javaScriptCanOpenWindowsAutomatically
          onOpenWindow={(event) => {
            event.preventDefault();

            if (onPressExternalLink) {
              onPressExternalLink(event.nativeEvent.targetUrl);
            }
          }}
          // Additional properties to disable context menu
          startInLoadingState={false}
          hideKeyboardAccessoryView
          keyboardDisplayRequiresUserAction={false}
          // Inject JavaScript to disable context menu
          injectedJavaScript={`
            // Disable context menu globally
            document.addEventListener('contextmenu', function(e) {
              e.preventDefault();
              return false;
            });

            // Disable text selection context menu
            document.addEventListener('selectstart', function(e) {
              e.preventDefault();
              return false;
            });

            // Disable drag and drop
            document.addEventListener('dragstart', function(e) {
              e.preventDefault();
              return false;
            });

            // Disable right click
            document.addEventListener('mousedown', function(e) {
              if (e.button === 2) {
                e.preventDefault();
                return false;
              }
            });

            true; // Required for injectedJavaScript
          `}
          style={{
            width,
            backgroundColor: theme?.colors.background,
            height
          }}
        />
      </GestureHandler>
    </RNView>
  );
};
