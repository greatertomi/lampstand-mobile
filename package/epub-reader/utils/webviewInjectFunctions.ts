import type WebView from 'react-native-webview';

export const injectJavaScript = (ref: React.MutableRefObject<WebView | null>, script: string) => {
  ref.current?.injectJavaScript(`
    try {
      ${script}
    } catch (error) {
      alert(error?.message);
    }

    true;
  `);
};
