export type SelectionActions = {
  onAddHighlight: (color: string) => void;
  onRemoveHighlight: () => void;
  onAddNote: () => void;
  onCopyToClipboard: () => void;
  onShare: () => void;
};
