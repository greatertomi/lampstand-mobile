import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions, View as RNView } from 'react-native';
import { WebView } from 'react-native-webview';

import { OpeningBook } from './components/Loaders';
import { GestureHandler } from './GestureHandler';
import { ReaderContext } from './provider';
import { isLocationWithinRange } from './utils/helpers';

import type { Bookmark, ReaderProps, Location } from './types';
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
  onStateUpdated = () => {},
  onReaderStateUpdated = () => {},
  onRemoveBookmark = () => {},
  onAddHighlight = () => {},
  onRemoveHighlight = () => {},
  initialState,
  initialReaderState,
  theme
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
    isRendering,
    setIsRendering,
    goToLocation,
    setKey,
    setSection,
    setToc,
    setFlow,
    bookmarks,
    setIsBookmarked,
    setBookmarks,
    setInitialState,
    setInitialReaderState,
    highlights,
    setHighlight
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);
  const [selectedText, setSelectedText] = React.useState<{ cfiRange: string; cfiRangeText: string }>({
    cfiRange: '',
    cfiRangeText: ''
  });

  useEffect(() => {
    setFlow(flow || 'auto');
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

      if (initialState?.currentLocation?.start.cfi) {
        goToLocation(initialState.currentLocation.start.cfi);
      }

      if (initialState) {
        setInitialState(initialState);
      }

      if (initialReaderState) {
        setInitialReaderState(initialReaderState);
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

    if (type === 'onStateUpdated') {
      const { bookState } = parsedEvent;

      return onStateUpdated(bookState);
    }

    if (type === 'onReaderStateUpdated') {
      const { readerState } = parsedEvent;

      return onReaderStateUpdated(readerState);
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
        originWhitelist={['*']}
        scrollEnabled={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        menuItems={menuItems?.map((item, key) => ({
          label: item.label,
          key: key.toString()
        }))}
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
        style={{
          width,
          backgroundColor: theme?.colors.background,
          height
        }}
      />
    </GestureHandler>
  );
};
