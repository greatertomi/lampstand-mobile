/* eslint-disable @typescript-eslint/no-explicit-any */
import type WebView from 'react-native-webview';

export type Flow = 'auto' | 'paginated' | 'scrolled' | 'scrolled-doc' | 'scrolled-continuous';

type LocationDetails = {
  cfi: ePubCfi;
  displayed: {
    page: number;
    total: number;
  };
  href: string;
  index: number;
  location: number;
  percentage: number;
};

export type Location = {
  atStart?: boolean;
  atEnd?: boolean;
  end: LocationDetails;
  start: LocationDetails;
};

export type BookMeta = {
  cover: string | ArrayBuffer | null | undefined;
  author: string;
  title: string;
  description: string;
  language: string;
  publisher: string;
  rights: string;
};

export type Section = {
  id: string;
  label: string;
  href: string;
  subitems?: any[];
  parent?: any;
};

export type ePubCfi = string;

export type Toc = Section[];

export enum ThemeModeScheme {
  Dark = 'dark',
  Light = 'light',
  System = 'system'
}

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
  theme: ThemeModeScheme;
  changeTheme: (theme: ThemeModeScheme) => void;
};

export type TrackedState = Pick<ReaderContextProps, 'fontSize'>;
