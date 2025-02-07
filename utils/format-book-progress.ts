export const formatBookProgress = (progress?: number) => {
  if (progress == null || progress < 0 || progress > 1) {
    return null;
  }
  return `${Math.round(progress * 100)}%`;
};
