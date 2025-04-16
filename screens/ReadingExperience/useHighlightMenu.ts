import { Highlight, useReader } from '../../package/epub-reader';
import { Theme } from '../../styles';
import { logger } from '../../utils';

export type ActionType = 'highlight' | 'share' | 'comment' | 'remove_highlight';

export interface ActionHandlerParams {
  actionType: ActionType;
  cfiRange: string;
  text: string;
  color?: string;
}

export interface BaseMenuItemType {
  key?: string;
  label: string;
  action: (cfiRange: string, text: string) => boolean;
}

export interface HighlightMenuItemType extends BaseMenuItemType {
  actionType: 'highlight';
  color: string;
}

export interface StandardMenuItemType extends BaseMenuItemType {
  actionType: Exclude<ActionType, 'highlight'>;
}

export type MenuItemType = HighlightMenuItemType | StandardMenuItemType;

export interface UseHighlightMenuProps {
  theme: Theme;
  bookId: string;
}

export const useHighlightMenu = ({ theme }: UseHighlightMenuProps) => {
  const { addHighlight, removeHighlight } = useReader();

  const handleAction = (props: ActionHandlerParams): boolean => {
    const { actionType, cfiRange, text, color } = props;

    switch (actionType) {
      case 'highlight': {
        if (color) {
          const highlightedText: Highlight = {
            id: Date.now(),
            cfiRange,
            text,
            colour: color,
            createdAt: Date.now()
          };
          addHighlight(highlightedText);
        }
        break;
      }
      case 'share': {
        logger.info('share', cfiRange, text);
        break;
      }
      case 'comment': {
        logger.info('comment', cfiRange, text);
        break;
      }
      case 'remove_highlight': {
        removeHighlight(cfiRange, text);
        break;
      }
      default: {
        logger.warn('Unhandled action type:', actionType);
        break;
      }
    }
    return false;
  };

  const createHighlightMenuItem = (label: string, key: string, color: string): HighlightMenuItemType => ({
    key,
    label,
    actionType: 'highlight',
    color,
    action: (cfiRange: string, text: string) => handleAction({ actionType: 'highlight', cfiRange, text, color })
  });

  const createStandardMenuItem = (
    label: string,
    actionType: Exclude<ActionType, 'highlight'>,
    key: string
  ): StandardMenuItemType => ({
    key,
    label,
    actionType,
    action: (cfiRange: string, text: string) => handleAction({ actionType, cfiRange, text })
  });

  const menuItems1: MenuItemType[] = [
    createHighlightMenuItem('🟢', 'lime-green', theme.colors.highlightGoogleGreen),
    createHighlightMenuItem('🟡', 'red-highlight', theme.colors.highlightSunFlower),
    createHighlightMenuItem('🟣', 'yellow-highlight', theme.colors.highlightVividViolet),
    createStandardMenuItem('Share', 'share', 'share'),
    createStandardMenuItem('Comment', 'comment', 'comment')
  ];

  const menuItems2: MenuItemType[] = [
    createStandardMenuItem('Share', 'share', 'share'),
    createStandardMenuItem('Remove Highlight', 'remove_highlight', 'remove_highlight'),
    createStandardMenuItem('Comment', 'comment', 'comment')
  ];

  return { menuItems1, menuItems2 };
};
