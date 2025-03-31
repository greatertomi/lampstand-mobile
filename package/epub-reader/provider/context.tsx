import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { ThemeModeScheme } from '../../../styles';
import {
  BookMeta,
  ReaderContextProps,
  TrackedState,
  ePubCfi,
  Flow,
  Section,
  Toc,
  Location,
  Bookmark,
  Highlight
} from '../types';
import { getBookmarkAtLocation, getCurrentTimestamp } from '../utils/helpers';
import * as webviewInjectFunctions from '../utils/webviewInjectFunctions';

import { injectTheme } from './reader-theme';

import type WebView from 'react-native-webview';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};

export const ReaderContext = createContext<ReaderContextProps>({
  registerBook: () => {},
  setAtStart: () => {},
  setAtEnd: () => {},
  setCurrentLocation: () => {},
  setTotalLocations: () => {},
  setMeta: () => {},
  setLocations: () => {},
  setIsLoading: () => {},
  setIsRendering: () => {},
  getCurrentLocation: () => null,
  getMeta: () => ({}) as BookMeta,
  meta: {} as BookMeta,
  isLoading: false,
  isRendering: false,
  locations: [],
  totalLocations: 0,
  atStart: false,
  atEnd: false,
  toc: [],
  setToc: () => {},
  flow: 'auto',
  setFlow: () => {},
  goToLocation: () => {},
  goPrevious: () => {},
  goNext: () => {},
  getLocations: () => [],
  setKey: () => {},
  setSection: () => {},
  key: '',
  currentLocation: null,
  section: null,
  fontSize: '1em',
  changeFontSize: () => {},
  theme: ThemeModeScheme.Light,
  highlightText: () => {},
  bookmarks: [],
  addBookmark: () => {},
  setBookmarks: () => {},
  isBookmarked: false,
  setIsBookmarked: () => {},
  removeBookmark: () => {},
  goToChapter: () => {},
  setInitialState: () => {}
});

enum ActionType {
  SET_AT_START = 'SET_AT_START',
  SET_AT_END = 'SET_AT_END',
  SET_KEY = 'SET_KEY',
  SET_TOTAL_LOCATIONS = 'SET_TOTAL_LOCATIONS',
  SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION',
  SET_META = 'SET_META',
  SET_PROGRESS = 'SET_PROGRESS',
  SET_LOCATIONS = 'SET_LOCATIONS',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_IS_RENDERING = 'SET_IS_RENDERING',
  SET_SECTION = 'SET_SECTION',
  SET_TOC = 'SET_TOC',
  SET_FLOW = 'SET_FLOW',
  SET_FONT_SIZE = 'SET_FONT_SIZE',
  SET_THEME = 'SET_THEME',
  SET_BOOKMARKS = 'SET_BOOKMARKS',
  SET_IS_BOOKMARKED = 'SET_IS_BOOKMARKED',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE',
  SET_HIGHLIGHT = 'SET_HIGHLIGHT'
}

type BookPayload = {
  [ActionType.SET_AT_START]: boolean;
  [ActionType.SET_AT_END]: boolean;
  [ActionType.SET_META]: BookMeta;
  [ActionType.SET_KEY]: string;
  [ActionType.SET_TOTAL_LOCATIONS]: number;
  [ActionType.SET_CURRENT_LOCATION]: Location;
  [ActionType.SET_PROGRESS]: number;
  [ActionType.SET_LOCATIONS]: ePubCfi[];
  [ActionType.SET_IS_LOADING]: boolean;
  [ActionType.SET_IS_RENDERING]: boolean;
  [ActionType.SET_SECTION]: Section | null;
  [ActionType.SET_TOC]: Toc;
  [ActionType.SET_FLOW]: Flow;
  [ActionType.SET_FONT_SIZE]: string;
  [ActionType.SET_THEME]: ThemeModeScheme;
  [ActionType.SET_BOOKMARKS]: Bookmark[];
  [ActionType.SET_IS_BOOKMARKED]: boolean;
  [ActionType.SET_INITIAL_STATE]: TrackedState;
  [ActionType.SET_HIGHLIGHT]: ePubCfi;
};

type BookActions = ActionMap<BookPayload>[keyof ActionMap<BookPayload>];

type InitialState = {
  atStart: boolean;
  atEnd: boolean;
  key: string;
  totalLocations: number;
  currentLocation: Location | null;
  meta: BookMeta;
  locations: ePubCfi[];
  isLoading: boolean;
  isRendering: boolean;
  section: Section | null;
  toc: Toc;
  flow: Flow;
  fontSize: string;
  bookmarks: Bookmark[];
  theme: ThemeModeScheme;
  isBookmarked: boolean;
};

const initialState = {
  atStart: false,
  atEnd: false,
  key: '',
  totalLocations: 0,
  currentLocation: null,
  meta: {
    cover: '',
    author: '',
    title: '',
    description: '',
    language: '',
    publisher: '',
    rights: ''
  },
  locations: [],
  isLoading: true,
  isRendering: true,
  section: null,
  toc: [],
  flow: 'auto' as Flow,
  fontSize: '1em',
  theme: ThemeModeScheme.Dark,
  bookmarks: [],
  isBookmarked: false
};

const bookReducer = (state: InitialState, action: BookActions) => {
  switch (action.type) {
    case ActionType.SET_AT_START: {
      return { ...state, atStart: action.payload };
    }
    case ActionType.SET_AT_END: {
      return { ...state, atEnd: action.payload };
    }
    case ActionType.SET_KEY: {
      return { ...state, key: action.payload };
    }
    case ActionType.SET_CURRENT_LOCATION: {
      return { ...state, currentLocation: action.payload };
    }
    case ActionType.SET_META: {
      return { ...state, meta: action.payload };
    }
    case ActionType.SET_TOTAL_LOCATIONS: {
      return { ...state, totalLocations: action.payload };
    }
    case ActionType.SET_LOCATIONS: {
      return { ...state, locations: action.payload };
    }
    case ActionType.SET_IS_LOADING: {
      return { ...state, isLoading: action.payload };
    }
    case ActionType.SET_IS_RENDERING: {
      return { ...state, isRendering: action.payload };
    }
    case ActionType.SET_TOC: {
      return { ...state, toc: action.payload };
    }
    case ActionType.SET_FLOW: {
      return { ...state, flow: action.payload };
    }
    case ActionType.SET_SECTION: {
      return { ...state, section: action.payload };
    }
    case ActionType.SET_FONT_SIZE: {
      return { ...state, fontSize: action.payload };
    }
    case ActionType.SET_THEME: {
      return { ...state, theme: action.payload };
    }
    case ActionType.SET_BOOKMARKS: {
      return { ...state, bookmarks: action.payload };
    }
    case ActionType.SET_IS_BOOKMARKED: {
      return { ...state, isBookmarked: action.payload };
    }
    case ActionType.SET_INITIAL_STATE: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export const ReaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const book = useRef<WebView | null>(null);

  useEffect(() => {
    const trackedState: TrackedState = {
      fontSize: state.fontSize,
      currentLocation: state.currentLocation,
      flow: state.flow,
      bookmarks: state.bookmarks,
      theme: state.theme
    };

    webviewInjectFunctions.injectJavaScript(
      book,
      `
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "onStateUpdated",
        readerState: ${JSON.stringify(trackedState)},
      }));
    `
    );
  }, [state.fontSize, state.currentLocation, state.flow, state.bookmarks, state.theme]);

  const registerBook = useCallback((bookRef: WebView) => {
    book.current = bookRef;
  }, []);

  const setAtStart = useCallback((atStart: boolean) => {
    dispatch({ type: ActionType.SET_AT_START, payload: atStart });
  }, []);

  const setAtEnd = useCallback((atEnd: boolean) => {
    dispatch({ type: ActionType.SET_AT_END, payload: atEnd });
  }, []);

  const setCurrentLocation = useCallback((location: Location) => {
    book.current?.injectJavaScript(`
      rendition.location = "${location}";
    `);
    dispatch({ type: ActionType.SET_CURRENT_LOCATION, payload: location });
  }, []);

  const setTotalLocations = useCallback((totalLocations: number) => {
    dispatch({ type: ActionType.SET_TOTAL_LOCATIONS, payload: totalLocations });
  }, []);

  const setMeta = useCallback((meta: BookMeta) => {
    dispatch({ type: ActionType.SET_META, payload: meta });
  }, []);

  const setLocations = useCallback((locations: ePubCfi[]) => {
    dispatch({ type: ActionType.SET_LOCATIONS, payload: locations });
  }, []);

  const setIsLoading = useCallback((isLoading: boolean) => {
    dispatch({ type: ActionType.SET_IS_LOADING, payload: isLoading });
  }, []);

  const changeFontSize = useCallback((fontSize: string) => {
    book.current?.injectJavaScript(`rendition.themes.default({ "p": { "font-size": "${fontSize} !important"}})`);
    dispatch({ type: ActionType.SET_FONT_SIZE, payload: fontSize });
  }, []);

  const setIsRendering = useCallback((isRendering: boolean) => {
    dispatch({ type: ActionType.SET_IS_RENDERING, payload: isRendering });
  }, []);

  const getCurrentLocation = useCallback(() => state.currentLocation, [state.currentLocation]);

  const setBookmarks = useCallback((bookmarks: Bookmark[]) => {
    dispatch({ type: ActionType.SET_BOOKMARKS, payload: bookmarks });
  }, []);

  const setIsBookmarked = useCallback((isBookmarked: boolean) => {
    dispatch({ type: ActionType.SET_IS_BOOKMARKED, payload: isBookmarked });
  }, []);

  const addBookmark = useCallback(() => {
    const location = state.currentLocation;
    webviewInjectFunctions.injectJavaScript(
      book,
      `
      const location = ${JSON.stringify(location)};
      const chapter = getChapter(${JSON.stringify(location)});
      const createdAt = ${JSON.stringify(getCurrentTimestamp().timestamp)};

      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "onAddBookmark",
        bookmark: {
          id: Date.now(),
          chapter,
          location,
          createdAt
        },
      }));
    `
    );
    setIsBookmarked(true);
  }, [setIsBookmarked, state.currentLocation]);

  const goToChapter = useCallback((href: string) => {
    book.current?.injectJavaScript(`rendition.display('${href}');`);
  }, []);

  const removeBookmark = useCallback(() => {
    const currentBookmark = getBookmarkAtLocation(state.currentLocation, state.bookmarks);

    if (currentBookmark) {
      webviewInjectFunctions.injectJavaScript(
        book,
        `
      const bookmark = ${JSON.stringify(currentBookmark)};
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: "onRemoveBookmark",
        bookmark
      }));
    `
      );
      setIsBookmarked(false);
    }
  }, [setIsBookmarked, state.bookmarks, state.currentLocation]);

  const goToLocation = useCallback((targetCfi: ePubCfi) => {
    book.current?.injectJavaScript(`rendition.display('${targetCfi}'); true`);
  }, []);

  const goPrevious = useCallback(() => {
    book.current?.injectJavaScript('rendition.prev()');
  }, []);

  const goNext = useCallback(() => {
    book.current?.injectJavaScript('rendition.next()');
  }, []);

  const getLocations = useCallback(() => state.locations, [state.locations]);

  const getMeta = useCallback(() => state.meta, [state.meta]);

  const setKey = useCallback((key: string) => {
    dispatch({ type: ActionType.SET_KEY, payload: key });
  }, []);

  const setToc = useCallback((toc: Toc) => {
    dispatch({ type: ActionType.SET_TOC, payload: toc });
  }, []);

  const setFlow = useCallback((flow: Flow) => {
    book.current?.injectJavaScript(`rendition.flow('${flow}')`);
    dispatch({ type: ActionType.SET_FLOW, payload: flow });
  }, []);

  const setSection = useCallback((section: Section | null) => {
    dispatch({ type: ActionType.SET_SECTION, payload: section });
  }, []);

  const changeTheme = useCallback((theme: ThemeModeScheme) => {
    dispatch({ type: ActionType.SET_THEME, payload: theme });
    injectTheme(theme, book);
  }, []);

  const highlightText = useCallback(
    (selectedText: Highlight) => {
      console.log('context', selectedText.cfiRange);
      webviewInjectFunctions.injectJavaScript(
        book,
        `
      rendition.annotations.highlight(
        '${selectedText.cfiRange}',
        {},
        (e) => {},
        '${selectedText.colour}',
        { fill: '${selectedText.colour}' }
      );
    `
      );
      dispatch({ type: ActionType.SET_HIGHLIGHT, payload: selectedText.cfiRange });
    },
    [book, dispatch]
  );

  const setInitialState = useCallback((_initialState: TrackedState) => {
    book.current?.injectJavaScript(`
      rendition.themes.default({ "p": { "font-size": "${_initialState.fontSize} !important" } });
      rendition.location = "${_initialState.currentLocation}";
      rendition.flow("${_initialState.flow}");
    `);
    injectTheme(_initialState.theme, book);
    dispatch({ type: ActionType.SET_INITIAL_STATE, payload: _initialState });
  }, []);

  const contextValue = useMemo(
    () => ({
      registerBook,
      setAtStart,
      setAtEnd,
      setTotalLocations,
      setCurrentLocation,
      setMeta,
      setLocations,
      setIsLoading,
      setIsRendering,
      goToLocation,
      goPrevious,
      goNext,
      getLocations,
      getCurrentLocation,
      getMeta,
      setKey,
      key: state.key,
      atStart: state.atStart,
      atEnd: state.atEnd,
      totalLocations: state.totalLocations,
      currentLocation: state.currentLocation,
      meta: state.meta,
      locations: state.locations,
      isLoading: state.isLoading,
      isRendering: state.isRendering,
      setSection,
      setToc,
      section: state.section,
      toc: state.toc,
      setFlow,
      flow: state.flow,
      fontSize: state.fontSize,
      changeFontSize,
      theme: state.theme,
      changeTheme,
      highlightText,
      bookmarks: state.bookmarks,
      addBookmark,
      setBookmarks,
      setIsBookmarked,
      isBookmarked: state.isBookmarked,
      removeBookmark,
      goToChapter,
      savedBookState: { fontSize: state.fontSize, currentLocation: state.currentLocation },
      setInitialState
    }),
    [
      registerBook,
      setAtStart,
      setAtEnd,
      setTotalLocations,
      setCurrentLocation,
      setMeta,
      setLocations,
      setIsLoading,
      setIsRendering,
      goToLocation,
      goPrevious,
      goNext,
      getLocations,
      getCurrentLocation,
      getMeta,
      setKey,
      state.key,
      state.atStart,
      state.atEnd,
      state.totalLocations,
      state.currentLocation,
      state.meta,
      state.locations,
      state.isLoading,
      state.isRendering,
      state.section,
      state.toc,
      state.flow,
      state.fontSize,
      state.theme,
      state.bookmarks,
      state.isBookmarked,
      setSection,
      setToc,
      setFlow,
      changeFontSize,
      changeTheme,
      highlightText,
      addBookmark,
      setBookmarks,
      setIsBookmarked,
      removeBookmark,
      goToChapter,
      setInitialState
    ]
  );

  return <ReaderContext.Provider value={contextValue}>{children}</ReaderContext.Provider>;
};
