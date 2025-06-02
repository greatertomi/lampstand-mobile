import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { Dimensions, View as RNView } from 'react-native';
import { WebView } from 'react-native-webview';

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
    setBookState,
    setReaderState,
    highlights,
    setHighlight,
    setSearchResults,
    setIsSearching,
    notes,
    setNotes
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);
  const [selectedText, setSelectedText] = React.useState<{ cfiRange: string; cfiRangeText: string }>({
    cfiRange: '',
    cfiRangeText: ''
  });
  const lastBookmarkCheck = useRef<{ cfi: string | null; isBookmarked: boolean }>({
    cfi: null,
    isBookmarked: false
  });

  useEffect(() => {
    setFlow(flow || 'auto');
  }, [flow, setFlow]);

  useEffect(() => {
    if (getInjectionJavascriptFn && book.current) {
      getInjectionJavascriptFn(book.current.injectJavaScript);
    }
  }, [getInjectionJavascriptFn]);

  const handleChangeIsBookmarked = useCallback(
    (items: Bookmark[], currentLoc: Location) => {
      if (lastBookmarkCheck.current.cfi === currentLoc.start.cfi) {
        setIsBookmarked(lastBookmarkCheck.current.isBookmarked);
        return;
      }

      const isBookmarked = items.some((bookmark) => isLocationWithinRange(currentLoc, bookmark.location));

      lastBookmarkCheck.current = {
        cfi: currentLoc.start.cfi,
        isBookmarked
      };
      setIsBookmarked(isBookmarked);
      onIsBookmarked(isBookmarked);
    },
    [setIsBookmarked, onIsBookmarked]
  );

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
      const newBookmarks = [...bookmarks, bookmark];
      setBookmarks(newBookmarks);
      setIsBookmarked(true);
      lastBookmarkCheck.current = {
        cfi: bookmark.location.start.cfi,
        isBookmarked: true
      };
      return onAddBookmark(bookmark);
    }

    if (type === 'onRemoveBookmark') {
      const { bookmark } = parsedEvent;
      const newBookmarks = bookmarks.filter((item) => item.id !== bookmark.id);
      setBookmarks(newBookmarks);
      setIsBookmarked(false);
      lastBookmarkCheck.current = {
        cfi: bookmark.location.start.cfi,
        isBookmarked: false
      };
      return onRemoveBookmark(bookmark);
    }

    if (type === 'onSearch') {
      const { results, totalResults, finished } = parsedEvent;
      setSearchResults({ results, totalResults });

      if (finished) {
        setIsSearching(false);
      }
      return onSearch(results, totalResults);
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

  useEffect(() => {
    if (bookState?.currentLocation && bookmarks.length > 0) {
      handleChangeIsBookmarked(bookmarks, bookState?.currentLocation);
    }
  }, [bookState?.currentLocation, bookmarks, handleChangeIsBookmarked]);

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
