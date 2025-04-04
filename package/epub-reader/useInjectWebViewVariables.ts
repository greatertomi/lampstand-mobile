import { useCallback } from 'react';

import { ePubCfi, Flow, Manager, SourceType, Spread } from '../types';

import template from './template';

export interface InjectWebViewVariables {
  jszip: string;
  epubjs: string;
  type: SourceType;
  book: string;
  hasEnableSelection: boolean;
  locations?: ePubCfi[];
  allowScriptedContent: boolean;
  canAllowPopups: boolean;
  manager: Manager;
  flow: Flow;
  snap?: boolean;
  spread?: Spread;
  fullsize?: boolean;
}

export const useInjectWebViewVariables = () => {
  const injectWebViewVariables = useCallback(
    ({
      jszip,
      epubjs,
      type,
      book,
      hasEnableSelection,
      locations,
      allowScriptedContent,
      canAllowPopups,
      manager,
      flow,
      snap,
      spread,
      fullsize
    }: InjectWebViewVariables) =>
      template
        .replace(/<script id="jszip"><\/script>/, `<script src="${jszip}"></script>`)
        .replace(/<script id="epubjs"><\/script>/, `<script src="${epubjs}"></script>`)
        .replace(/const type = window.type;/, `const type = '${type}';`)
        .replace(/const file = window.book;/, `const file = '${book}';`)
        .replace(/const initialLocations = window.locations;/, `const initialLocations = ${locations ?? undefined};`)
        .replace(/const enableSelection = window.enable_selection;/, `const enableSelection = ${hasEnableSelection};`)
        .replace(/allowScriptedContent: allowScriptedContent/, `allowScriptedContent: ${allowScriptedContent}`)
        .replace(/allowPopups: allowPopups/, `allowPopups: ${canAllowPopups}`)
        .replace(/manager: "default"/, `manager: ${JSON.stringify(manager)}`)
        .replace(/flow: "auto"/, `flow: ${JSON.stringify(flow)}`)
        .replace(/snap: undefined/, `snap: ${snap ?? undefined}`)
        .replace(/spread: undefined/, `spread: ${spread ? JSON.stringify(spread) : undefined}`)
        .replace(/fullsize: undefined/, `fullsize: ${fullsize ?? undefined}`),
    []
  );
  return { injectWebViewVariables };
};
