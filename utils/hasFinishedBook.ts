export const hasFinishedBook = (percentage?: number, progress?: number) => {
  if (progress !== undefined && progress < 0) return false;
  if (progress === 1) return true;
  return (percentage ?? 0) >= 0.99;
};
