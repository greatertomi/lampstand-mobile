import { ReaderContextMenuItem } from '../../package/types';
import { Theme } from '../../styles';
import { logger } from '../../utils';

type ContextMenuItemsParams = {
  theme: Theme;
  handleSelectedHighlight: (cfiRange: string, text: string, color: string) => void;
  removeHighlight: (cfiRange: string, text: string) => void;
  handleAddNote: (cfiRange: string, text: string) => void;
};

export const createContextMenuItems = ({
  theme,
  handleSelectedHighlight,
  removeHighlight,
  handleAddNote
}: ContextMenuItemsParams): {
  defaultMenuItems: ReaderContextMenuItem[];
  highlightedMenuItems: ReaderContextMenuItem[];
} => {
  const defaultMenuItems: ReaderContextMenuItem[] = [
    {
      key: 'lime-green',
      label: '🟢',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightGoogleGreen);
        return false;
      }
    },
    {
      key: 'red-highlight',
      label: '🟡',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightSunFlower);
        return false;
      }
    },
    {
      key: 'yellow-highlight',
      label: '🟣',
      action: (cfiRange: string, text: string) => {
        handleSelectedHighlight(cfiRange, text, theme.colors.highlightVividViolet);
        return false;
      }
    },
    {
      key: 'share',
      label: 'Share',
      action: (cfiRange: string, text: string) => {
        logger.info('share', cfiRange, text);
        return false;
      }
    },
    {
      key: 'comment',
      label: 'Comment',
      action: (cfiRange: string, text: string) => {
        handleAddNote(cfiRange, text);
        return false;
      }
    }
  ];

  const highlightedMenuItems: ReaderContextMenuItem[] = [
    {
      key: 'share',
      label: 'Share',
      action: (cfiRange: string, text: string) => {
        logger.info('share', cfiRange, text);
        return false;
      }
    },
    {
      key: 'remove_highlight',
      label: 'Remove Highlight',
      action: (cfiRange: string, text: string) => {
        removeHighlight(cfiRange, text);
        return false;
      }
    },
    {
      key: 'comment',
      label: 'Comment',
      action: (cfiRange: string, text: string) => {
        handleAddNote(cfiRange, text);
        return false;
      }
    }
  ];

  return {
    defaultMenuItems,
    highlightedMenuItems
  };
};
