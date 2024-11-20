import React, { useContext, useEffect, useRef } from 'react';
import { Dimensions, View as RNView } from 'react-native';
import { WebView } from 'react-native-webview';

import { OpeningBook } from './components/Loaders';
import { ReaderContext } from './context';
import { GestureHandler } from './GestureHandler';
import INTERNAL_EVENTS from './utils/internalEvents';

import type { ReaderProps } from './types';
import type { ShouldStartLoadRequest, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

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
  onFinish = () => {},
  onSingleTap = () => {},
  onDoubleTap = () => {},
  onLongPress = () => {},
  width,
  height,
  initialLocation,
  enableSwipe = true,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onSwipeUp = () => {},
  onSwipeDown = () => {},
  renderOpeningBookComponent = () => <OpeningBook width={width} height={height} />,
  openingBookComponentContainerStyle = {
    width: width || Dimensions.get('screen').width,
    height: height || Dimensions.get('screen').height
  },
  onPressExternalLink,
  menuItems,
  injectedJavascript,
  getInjectionJavascriptFn,
  onWebViewMessage,
  waitForLocationsReady = false,
  flow
}: ViewProps) => {
  const {
    registerBook,
    setTotalLocations,
    setCurrentLocation,
    setMeta,
    setProgress,
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
    setFlow
  } = useContext(ReaderContext);
  const book = useRef<WebView>(null);

  useEffect(() => {
    setFlow(flow || 'auto');
  }, [flow, setFlow]);

  useEffect(() => {
    if (getInjectionJavascriptFn && book.current) {
      getInjectionJavascriptFn(book.current.injectJavaScript);
    }
  }, [getInjectionJavascriptFn]);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const onMessage = (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(event.nativeEvent.data);

    const { type } = parsedEvent;

    if (!INTERNAL_EVENTS.includes(type) && onWebViewMessage) {
      return onWebViewMessage(parsedEvent);
    }

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

      if (initialLocation) {
        goToLocation(initialLocation);
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

    if (type === 'onLocationChange') {
      const { totalLocations, currentLocation, progress, currentSection } = parsedEvent;
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);
      setSection(currentSection);

      if (currentLocation.atStart) setAtStart(true);
      else if (currentLocation.atEnd) setAtEnd(true);
      else {
        setAtStart(false);
        setAtEnd(false);
      }
      return onLocationChange(totalLocations, currentLocation, progress, currentSection);
    }

    if (type === 'onLocationsReady') {
      const { epubKey, totalLocations, currentLocation, progress } = parsedEvent;
      setLocations(parsedEvent.locations);
      setKey(epubKey);
      setTotalLocations(totalLocations);
      setCurrentLocation(currentLocation);
      setProgress(progress);

      if (waitForLocationsReady) {
        setIsRendering(false);
      }

      return onLocationsReady(epubKey, parsedEvent.locations);
    }

    if (type === 'onSelected') {
      const { cfiRange, text } = parsedEvent;

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

    return () => {};
  };

  const handleOnShouldStartLoadWithRequest = (request: ShouldStartLoadRequest) => {
    if (!isRendering && request.mainDocumentURL && request.url !== request.mainDocumentURL) {
      goToLocation(request.url.replace(request.mainDocumentURL, ''));
    }

    if ((request.url.includes('mailto:') || request.url.includes('tel:')) && onPressExternalLink) {
      onPressExternalLink(request.url);
    }

    return true;
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
        onShouldStartLoadWithRequest={handleOnShouldStartLoadWithRequest}
        style={{
          width,
          backgroundColor: '#fff',
          height
        }}
      />
    </GestureHandler>
  );
};
