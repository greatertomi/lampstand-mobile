import type WebView from 'react-native-webview';

export const injectJavaScript = (ref: React.MutableRefObject<WebView | null>, script: string) => {
  ref.current?.injectJavaScript(`
    (function() {
      try {
        ${script}
        return true;
      } catch (error) {
        console.error('WebView injection error:', error);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'webview_error',
            error: error.message || 'Unknown error',
            stack: error.stack
          }));
        }
        return false;
      }
    })();
  `);
};
