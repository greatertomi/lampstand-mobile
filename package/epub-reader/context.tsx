import { createContext, ReactNode, useCallback, useMemo, useReducer, useRef } from 'react';

import { BookMeta, ePubCfi, Flow, Section, Toc } from './types';

import type WebView from 'react-native-webview';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};

export type ReaderContextProps = {
  registerBook: (bookRef: WebView) => void;
  setAtStart: (atStart: boolean) => void;
  setAtEnd: (atEnd: boolean) => void;
  setCurrentLocation: (location: Location) => void;
  setTotalLocations: (totalLocations: number) => void;
  setMeta: (meta: BookMeta) => void;
  setProgress: (progress: number) => void;
  setLocations: (locations: ePubCfi[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsRendering: (isRendering: boolean) => void;
  getCurrentLocation: () => Location | null;
  getMeta: () => BookMeta;
  meta: BookMeta;
  progress: number;
  isLoading: boolean;
  isRendering: boolean;
  locations: ePubCfi[];
  totalLocations: number;
  atStart: boolean;
  atEnd: boolean;
  toc: Toc;
  setToc: (toc: Toc) => void;
  flow: Flow;
  setFlow: (flow: Flow) => void;
  goToLocation: (cfi: ePubCfi) => void;
  goPrevious: () => void;
  goNext: () => void;
  getLocations: () => ePubCfi[];
  setKey: (key: string) => void;
  setSection: (section: Section | null) => void;
  key: string;
  currentLocation: Location | null;
  section: Section | null;
  fontSize: string;
  changeFontSize: (fontSize: string) => void;
};

export const ReaderContext = createContext<ReaderContextProps>({
  registerBook: () => {},
  setAtStart: () => {},
  setAtEnd: () => {},
  setCurrentLocation: () => {},
  setTotalLocations: () => {},
  setMeta: () => {},
  setProgress: () => {},
  setLocations: () => {},
  setIsLoading: () => {},
  setIsRendering: () => {},
  getCurrentLocation: () => null,
  getMeta: () => ({}) as BookMeta,
  meta: {} as BookMeta,
  progress: 0,
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
  changeFontSize: () => {}
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
  SET_FONT_SIZE = 'SET_FONT_SIZE'
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
};

type BookActions = ActionMap<BookPayload>[keyof ActionMap<BookPayload>];

type InitialState = {
  atStart: boolean;
  atEnd: boolean;
  key: string;
  totalLocations: number;
  currentLocation: Location | null;
  meta: BookMeta;
  progress: number;
  locations: ePubCfi[];
  isLoading: boolean;
  isRendering: boolean;
  section: Section | null;
  toc: Toc;
  flow: Flow;
  fontSize: string;
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
  progress: 0,
  locations: [],
  isLoading: true,
  isRendering: true,
  section: null,
  toc: [],
  flow: 'auto' as Flow,
  fontSize: ''
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
    case ActionType.SET_PROGRESS: {
      return { ...state, progress: action.payload };
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
    default: {
      return state;
    }
  }
};

export const ReaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const book = useRef<WebView | null>(null);

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
    dispatch({ type: ActionType.SET_CURRENT_LOCATION, payload: location });
  }, []);

  const setTotalLocations = useCallback((totalLocations: number) => {
    dispatch({ type: ActionType.SET_TOTAL_LOCATIONS, payload: totalLocations });
  }, []);

  const setMeta = useCallback((meta: BookMeta) => {
    dispatch({ type: ActionType.SET_META, payload: meta });
  }, []);

  const setProgress = useCallback((progress: number) => {
    dispatch({ type: ActionType.SET_PROGRESS, payload: progress });
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
    book.current?.injectJavaScript(`changeFlow('${flow}')`);
    dispatch({ type: ActionType.SET_FLOW, payload: flow });
  }, []);

  const setSection = useCallback((section: Section | null) => {
    dispatch({ type: ActionType.SET_SECTION, payload: section });
  }, []);

  const contextValue = useMemo(
    () => ({
      registerBook,
      setAtStart,
      setAtEnd,
      setTotalLocations,
      setCurrentLocation,
      setMeta,
      setProgress,
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
      progress: state.progress,
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
      changeFontSize
    }),
    [
      getCurrentLocation,
      getMeta,
      getLocations,
      goNext,
      goPrevious,
      goToLocation,
      registerBook,
      setAtEnd,
      setAtStart,
      setCurrentLocation,
      setMeta,
      setIsLoading,
      setIsRendering,
      setKey,
      setLocations,
      setProgress,
      setTotalLocations,
      state.atEnd,
      state.atStart,
      state.currentLocation,
      state.meta,
      state.isLoading,
      state.isRendering,
      state.key,
      state.locations,
      state.progress,
      state.totalLocations,
      setSection,
      setToc,
      state.section,
      state.toc,
      setFlow,
      state.flow,
      changeFontSize,
      state.fontSize
    ]
  );

  return <ReaderContext.Provider value={contextValue}>{children}</ReaderContext.Provider>;
};
