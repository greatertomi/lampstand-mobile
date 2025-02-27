export const trimTitle = (title: string, maxWords: number = 5) => {
  const words = title.split(' ');
  return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : title;
};
