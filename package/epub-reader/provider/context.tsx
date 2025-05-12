import { createContext, ReactNode, useCallback, useEffect, useMemo, useReducer, useRef } from 'react';

import { ThemeModeScheme } from '../../../styles';
import {
  Bookmark,
  BookMeta,
  BookTrackedState,
  ePubCfi,
  Flow,
  Highlight,
  Location,
  ReaderContextProps,
  ReaderTrackedState,
  Section,
  READING_PRESET,
  Note,
  Toc,
  SearchResult,
  SearchOptions,
  BOOKMARK_SORT_PREFERENCE
} from '../../types';
import { getBookmarkAtLocation, getCurrentTimestamp } from '../utils/helpers';
import * as webviewInjectFunctions from '../utils/webviewInjectFunctions';

import { injectTheme } from './reader-theme';

import type WebView from 'react-native-webview';

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key; payload: M[Key] };
};

const injectHighlightAnnotation = (item: Highlight) => `
  rendition.annotations.highlight(
    '${item.cfiRange}',
    {},
    (e) => {},
    '${item.colour}',
    { fill: '${item.colour}' }
  );
`;

const injectNoteAnnotation = (note: Note) => `
    const range = rendition.getRange('${note.cfiRange}');
    if (range) {
      const heart = document.createElement('span');
      heart.textContent = '📝';
      range.insertNode(heart);
    } else {
      console.error('Range not found for cfi:', '${note.cfiRange}');
    }
  `;

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
  flow: 'scrolled',
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
  bookmarks: [],
  addBookmark: () => {},
  setBookmarks: () => {},
  isBookmarked: false,
  setIsBookmarked: () => {},
  removeBookmark: () => {},
  goToChapter: () => {},
  setBookState: () => {},
  setReaderState: () => {},
  highlights: [],
  addHighlight: () => {},
  setHighlight: () => {},
  removeHighlight: () => {},
  preset: READING_PRESET.ORIGINAL,
  applyPreset: () => {},
  resetPreset: () => {},
  searchBook: () => {},
  clearSearchResults: () => {},
  setIsSearching: () => {},
  isSearching: false,
  searchResults: { results: [], totalResults: 0 },
  setSearchResults: () => {},
  notes: [],
  addNote: () => {},
  setNotes: () => {},
  removeNote: () => {},
  bookmarkSortPreference: BOOKMARK_SORT_PREFERENCE.DATE_ADDED_NEWEST,
  setBookmarkSortPreference: () => {}
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
  SET_NOTES = 'SET_NOTES',
  SET_INITIAL_READER_STATE = 'SET_INITIAL_READER_STATE',
  SET_HIGHLIGHT = 'SET_HIGHLIGHT',
  SET_PRESET = 'SET_PRESET',
  SET_SEARCH_RESULT = 'SET_SEARCH_RESULT',
  SET_IS_SEARCHING = 'SET_IS_SEARCHING',
  SET_BOOKMARK_SORT_PREFERENCE = 'SET_BOOKMARK_SORT_PREFERENCE'
}

type StatePayload = {
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
  [ActionType.SET_BOOKMARKS]: Bookmark[];
  [ActionType.SET_IS_BOOKMARKED]: boolean;
  [ActionType.SET_INITIAL_STATE]: BookTrackedState;
  [ActionType.SET_HIGHLIGHT]: Highlight[];
  [ActionType.SET_FLOW]: Flow;
  [ActionType.SET_FONT_SIZE]: string;
  [ActionType.SET_THEME]: ThemeModeScheme;
  [ActionType.SET_PRESET]: READING_PRESET;
  [ActionType.SET_NOTES]: Note[];
  [ActionType.SET_INITIAL_READER_STATE]: ReaderTrackedState;
  [ActionType.SET_SEARCH_RESULT]: { results: SearchResult[]; totalResults: number };
  [ActionType.SET_IS_SEARCHING]: boolean;
  [ActionType.SET_BOOKMARK_SORT_PREFERENCE]: BOOKMARK_SORT_PREFERENCE;
};

type StateActions = ActionMap<StatePayload>[keyof ActionMap<StatePayload>];

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
  bookmarks: Bookmark[];
  isBookmarked: boolean;
  highlights: Highlight[];
  flow: Flow;
  theme: ThemeModeScheme;
  preset: READING_PRESET;
  notes: Note[];
  fontSize: string;
  isSearching: boolean;
  searchResults: { results: SearchResult[]; totalResults: number };
  bookmarkSortPreference: BOOKMARK_SORT_PREFERENCE;
  currentBookId: string;
  books: {
    [bookId: string]: {
      key: string;
      currentLocation: Location | null;
      locations: ePubCfi[];
      bookmarks: Bookmark[];
      isBookmarked: boolean;
      highlights: Highlight[];
      notes: Note[];
    };
  };
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
  bookmarks: [],
  isBookmarked: false,
  highlights: [],
  preset: READING_PRESET.ORIGINAL,
  notes: [],
  flow: 'scrolled' as Flow,
  fontSize: '1em',
  theme: ThemeModeScheme.Light,
  isSearching: false,
  searchResults: { results: [], totalResults: 0 },
  bookmarkSortPreference: BOOKMARK_SORT_PREFERENCE.DATE_ADDED_NEWEST,
  currentBookId: '',
  books: {}
};

const stateReducer = (state: InitialState, action: StateActions) => {
  switch (action.type) {
    case ActionType.SET_AT_START: {
      return { ...state, atStart: action.payload };
    }
    case ActionType.SET_AT_END: {
      return { ...state, atEnd: action.payload };
    }
    case ActionType.SET_KEY: {
      const bookId = action.payload;
      return {
        ...state,
        currentBookId: bookId,
        books: {
          ...state.books,
          [bookId]: state.books[bookId] || {
            key: bookId,
            currentLocation: null,
            locations: [],
            bookmarks: [],
            isBookmarked: false,
            highlights: [],
            notes: []
          }
        }
      };
    }
    case ActionType.SET_CURRENT_LOCATION: {
      return {
        ...state,
        books: {
          ...state.books,
          [state.currentBookId]: {
            ...state.books[state.currentBookId],
            currentLocation: action.payload
          }
        }
      };
    }
    case ActionType.SET_META: {
      return { ...state, meta: action.payload };
    }
    case ActionType.SET_TOTAL_LOCATIONS: {
      return { ...state, totalLocations: action.payload };
    }
    case ActionType.SET_LOCATIONS: {
      return {
        ...state,
        books: {
          ...state.books,
          [state.currentBookId]: {
            ...state.books[state.currentBookId],
            locations: action.payload
          }
        }
      };
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
    case ActionType.SET_SECTION: {
      return { ...state, section: action.payload };
    }
    case ActionType.SET_BOOKMARKS: {
      return {
        ...state,
        books: {
          ...state.books,
          [state.currentBookId]: {
            ...state.books[state.currentBookId],
            bookmarks: action.payload
          }
        }
      };
    }
    case ActionType.SET_IS_BOOKMARKED: {
      return {
        ...state,
        books: {
          ...state.books,
          [state.currentBookId]: {
            ...state.books[state.currentBookId],
            isBookmarked: action.payload
          }
        }
      };
    }
    case ActionType.SET_HIGHLIGHT: {
      return {
        ...state,
        books: {
          ...state.books,
          [state.currentBookId]: {
            ...state.books[state.currentBookId],
            highlights: action.payload
          }
        }
      };
    }
    case ActionType.SET_NOTES: {
      return {
        ...state,
        books: {
          ...state.books,
          [state.currentBookId]: {
            ...state.books[state.currentBookId],
            notes: action.payload
          }
        }
      };
    }
    case ActionType.SET_INITIAL_STATE: {
      return { ...state, ...action.payload };
    }
    case ActionType.SET_FLOW: {
      return { ...state, flow: action.payload };
    }
    case ActionType.SET_FONT_SIZE: {
      return { ...state, fontSize: action.payload };
    }
    case ActionType.SET_PRESET: {
      return { ...state, preset: action.payload };
    }
    case ActionType.SET_THEME: {
      return { ...state, theme: action.payload };
    }
    case ActionType.SET_INITIAL_READER_STATE: {
      return { ...state, ...action.payload };
    }
    case ActionType.SET_IS_SEARCHING: {
      return { ...state, isSearching: action.payload };
    }
    case ActionType.SET_SEARCH_RESULT: {
      return { ...state, searchResults: action.payload };
    }
    case ActionType.SET_BOOKMARK_SORT_PREFERENCE: {
      return { ...state, bookmarkSortPreference: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const ReaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const book = useRef<WebView | null>(null);

  useEffect(() => {
    const bookId = state.currentBookId;
    if (!bookId || !state.books[bookId]) return;

    const currentBook = state.books[bookId];

    const bookState: BookTrackedState = {
      currentLocation: currentBook.currentLocation,
      bookmarks: currentBook.bookmarks,
      highlights: currentBook.highlights,
      notes: currentBook.notes
    };

    webviewInjectFunctions.injectJavaScript(
      book,
      `
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onBookStateUpdated",
          trackedBookState: ${JSON.stringify(bookState)},
        }));
      `
    );
  }, [state.books, state.currentBookId]);

  useEffect(() => {
    (async () => {
      const readerState: ReaderTrackedState = {
        fontSize: state.fontSize,
        flow: state.flow,
        theme: state.theme,
        preset: state.preset
      };

      webviewInjectFunctions.injectJavaScript(
        book,
        `
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onReaderStateUpdated",
          trackedReaderState: ${JSON.stringify(readerState)},
        }));
      `
      );
    })();
  }, [state.fontSize, state.flow, state.preset, state.theme]);

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

  const getCurrentLocation = useCallback(
    () => state.books[state.currentBookId].currentLocation ?? null,
    [state.books, state.currentBookId]
  );

  const setBookmarks = useCallback((bookmarks: Bookmark[]) => {
    dispatch({ type: ActionType.SET_BOOKMARKS, payload: bookmarks });
  }, []);

  const setIsBookmarked = useCallback((isBookmarked: boolean) => {
    dispatch({ type: ActionType.SET_IS_BOOKMARKED, payload: isBookmarked });
  }, []);

  const applyPreset = useCallback(
    (preset: READING_PRESET) => {
      dispatch({ type: ActionType.SET_PRESET, payload: preset });
      injectTheme(state.theme, book, preset);
    },
    [state.theme]
  );

  const resetPreset = useCallback(() => {
    dispatch({ type: ActionType.SET_PRESET, payload: READING_PRESET.ORIGINAL });
    injectTheme(state.theme, book, READING_PRESET.ORIGINAL);
  }, [state.theme]);

  const addBookmark = useCallback(() => {
    const location = state.books[state.currentBookId]?.currentLocation ?? null;
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
  }, [setIsBookmarked, state.books, state.currentBookId]);

  const goToChapter = useCallback((href: string) => {
    book.current?.injectJavaScript(`rendition.display('${href}');`);
  }, []);

  const removeBookmark = useCallback(() => {
    const currentBookmark = getBookmarkAtLocation(
      state.books[state.currentBookId].currentLocation ?? null,
      state.books[state.currentBookId].bookmarks ?? []
    );

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
  }, [setIsBookmarked, state.books, state.currentBookId]);

  const goToLocation = useCallback((targetCfi: ePubCfi) => {
    book.current?.injectJavaScript(`rendition.display('${targetCfi}'); true`);
  }, []);

  const goPrevious = useCallback(() => {
    book.current?.injectJavaScript('rendition.prev()');
  }, []);

  const goNext = useCallback(() => {
    book.current?.injectJavaScript('rendition.next()');
  }, []);

  const getLocations = useCallback(
    () => state.books[state.currentBookId].locations,
    [state.books, state.currentBookId]
  );

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

  const addNote = useCallback(
    (note: Note, bookId: string) => {
      webviewInjectFunctions.injectJavaScript(
        book,
        `
          ${injectNoteAnnotation(note)}
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'onAddNote',
            bookId: '${bookId}',
            noteItem: {
              id: '${note.id}',
              text: '${note.text}',
              cfiRange: '${note.cfiRange}',
              createdAt: '${note.createdAt}'
            }
          }));
        `
      );
    },
    [book]
  );

  const setNotes = useCallback((notes: Note[]) => {
    dispatch({ type: ActionType.SET_NOTES, payload: notes });
  }, []);

  const addHighlight = useCallback(
    (highlightedTexts: Highlight) => {
      webviewInjectFunctions.injectJavaScript(
        book,
        `${injectHighlightAnnotation(highlightedTexts)}

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onAddHighlight",
          highlightedText: {
            id: '${highlightedTexts.id}',
            colour: '${highlightedTexts.colour}',
            text: '${highlightedTexts.text}',
            cfiRange: '${highlightedTexts.cfiRange}',
            createdAt: ${highlightedTexts.createdAt}
          },
        }));
      `
      );
    },
    [book]
  );

  const removeNote = useCallback(
    (note: Note) => {
      const noteToRemove = state.books[state.currentBookId].notes.find((item) => item.id === note.id);
      if (noteToRemove) {
        webviewInjectFunctions.injectJavaScript(
          book,
          `
         window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onRemoveNote",
          noteToRemove: ${JSON.stringify(noteToRemove)},
        }));
        `
        );
      }
    },
    [state.currentBookId, state.books]
  );

  const removeHighlight = useCallback(
    (cfiRange: string, text: string) => {
      const highlightToRemove = state.books[state.currentBookId].highlights.find(
        (item) => item.cfiRange === cfiRange && item.text === text
      );
      if (highlightToRemove) {
        webviewInjectFunctions.injectJavaScript(
          book,
          `
            rendition.annotations.remove('${highlightToRemove.cfiRange}', 'highlight');
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "onRemoveHighlight",
              highlightedText: ${JSON.stringify(highlightToRemove)},
            }));
          `
        );
      }
    },
    [state.books, state.currentBookId]
  );

  const setHighlight = useCallback((highlightedTexts: Highlight[]) => {
    dispatch({ type: ActionType.SET_HIGHLIGHT, payload: highlightedTexts });
  }, []);

  const setBookState = useCallback((_initialState: BookTrackedState) => {
    book.current?.injectJavaScript(`
        rendition.location = "${_initialState.currentLocation}";
      `);

    // First inject highlights
    _initialState?.highlights?.forEach((item: Highlight) => {
      webviewInjectFunctions.injectJavaScript(book, `${injectHighlightAnnotation(item)}`);
    });

    // Then inject notes with a slight delay to ensure content is rendered
    setTimeout(() => {
      _initialState?.notes?.forEach((item: Note) => {
        webviewInjectFunctions.injectJavaScript(book, `${injectNoteAnnotation(item)}`);
      });
    }, 1000);
    dispatch({ type: ActionType.SET_INITIAL_STATE, payload: _initialState });
  }, []);

  const setReaderState = useCallback((_initialReaderState: ReaderTrackedState) => {
    book.current?.injectJavaScript(`
      rendition.themes.default({ "p": { "font-size": "${_initialReaderState.fontSize} !important" } });
      rendition.flow("${_initialReaderState.flow}");
    `);

    injectTheme(_initialReaderState.theme, book, _initialReaderState.preset);

    dispatch({
      type: ActionType.SET_INITIAL_READER_STATE,
      payload: _initialReaderState
    });
  }, []);

  const searchBook = useCallback((term: string, options?: SearchOptions) => {
    dispatch({
      type: ActionType.SET_SEARCH_RESULT,
      payload: { results: [], totalResults: 0 }
    });

    if (!term || term.trim().length < 3) {
      dispatch({ type: ActionType.SET_IS_SEARCHING, payload: false });
      return;
    }

    dispatch({ type: ActionType.SET_IS_SEARCHING, payload: true });

    webviewInjectFunctions.injectJavaScript(
      book,
      `
        const term = ${JSON.stringify(term)};
        const chapterId = ${JSON.stringify(options?.sectionId)};
        const reactNativeWebview = window.ReactNativeWebView !== undefined &&
          window.ReactNativeWebView !== null ?
          window.ReactNativeWebView : window;

        Promise.all(
          book.spine.spineItems.map((item) => {
            return item.load(book.load.bind(book)).then(() => {
              let results = item.find(term.trim());
              const locationHref = item.href;

              let [match] = flatten(book.navigation.toc)
                .filter((chapter) => {
                  return book.canonical(chapter.href).includes(locationHref);
                }, null);

              if (results.length > 0) {
                results = results.map(result => ({
                  ...result,
                  section: {
                    ...match,
                    index: book.navigation.toc.findIndex(elem => elem.id === match?.id)
                  }
                }));

                if (chapterId) {
                  results = results.filter(result => result.section.id === chapterId);
                }
              }

              item.unload();

              reactNativeWebview.postMessage(
                JSON.stringify({ type: 'onSearch',
                  results: results,
                  totalResults: results.length,
                  finished: false
                })
              );

              return Promise.resolve(results);
            });
          })
        ).then((results) => {
          const items = [].concat.apply([], results);
          reactNativeWebview.postMessage(
            JSON.stringify({ type: 'onSearch',
              results: items,
              totalResults: items.length,
              finished: true
            }),
          );
        });
      `
    );
  }, []);

  const clearSearchResults = useCallback(() => {
    dispatch({
      type: ActionType.SET_SEARCH_RESULT,
      payload: { results: [], totalResults: 0 }
    });
  }, []);

  const setIsSearching = useCallback((value: boolean) => {
    dispatch({ type: ActionType.SET_IS_SEARCHING, payload: value });
  }, []);

  const setSearchResults = useCallback(
    ({ results, totalResults }: { results: SearchResult[]; totalResults: number }) => {
      dispatch({
        type: ActionType.SET_SEARCH_RESULT,
        payload: { results, totalResults }
      });
    },
    []
  );

  const setBookmarkSortPreference = useCallback((sort: BOOKMARK_SORT_PREFERENCE) => {
    dispatch({ type: ActionType.SET_BOOKMARK_SORT_PREFERENCE, payload: sort });
  }, []);

  const contextValue = useMemo(() => {
    const currentBook = state.books[state.currentBookId] || {};
    return {
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
      currentLocation: currentBook.currentLocation ?? null,
      meta: state.meta,
      locations: currentBook.locations ?? [],
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
      bookmarks: currentBook.bookmarks ?? [],
      addBookmark,
      setBookmarks,
      setIsBookmarked,
      isBookmarked: currentBook.isBookmarked,
      removeBookmark,
      goToChapter,
      savedBookState: {
        fontSize: state.fontSize,
        currentLocation: currentBook.currentLocation ?? []
      },
      highlights: currentBook.highlights ?? [],
      addHighlight,
      setHighlight,
      setBookState,
      setReaderState,
      removeHighlight,
      preset: state.preset,
      applyPreset,
      resetPreset,
      searchBook,
      clearSearchResults,
      setIsSearching,
      isSearching: state.isSearching,
      searchResults: state.searchResults,
      setSearchResults,
      notes: currentBook.notes ?? [],
      setNotes,
      addNote,
      removeNote,
      bookmarkSortPreference: state.bookmarkSortPreference,
      setBookmarkSortPreference,
      books: state.books,
      currentBookId: state.currentBookId
    };
  }, [
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
    state.meta,
    state.isLoading,
    state.isRendering,
    state.section,
    state.toc,
    state.flow,
    state.fontSize,
    state.theme,
    setSection,
    setToc,
    setFlow,
    changeFontSize,
    addBookmark,
    setBookmarks,
    setIsBookmarked,
    removeBookmark,
    addHighlight,
    setHighlight,
    goToChapter,
    setBookState,
    setReaderState,
    removeHighlight,
    state.preset,
    applyPreset,
    resetPreset,
    searchBook,
    clearSearchResults,
    setIsSearching,
    setSearchResults,
    state.isSearching,
    state.searchResults,
    addNote,
    setNotes,
    removeNote,
    state.bookmarkSortPreference,
    setBookmarkSortPreference,
    state.books,
    state.currentBookId
  ]);

  return <ReaderContext.Provider value={contextValue}>{children}</ReaderContext.Provider>;
};
