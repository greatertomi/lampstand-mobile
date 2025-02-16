export const hasFinishedBook = (percentage?: number, isFinished?: number) => {
  if (isFinished !== undefined && isFinished < 0) return false;
  if (isFinished === 1) return true;
  return (percentage ?? 0) >= 0.99;
};
