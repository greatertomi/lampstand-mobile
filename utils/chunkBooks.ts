import { BookType } from '../customTypes';

export const chunkBooks = (books: BookType[]) => {
  const chunks = [];
  for (let i = 0; i < books.length; i += 3) {
    chunks.push(books.slice(i, i + 3));
  }
  return chunks;
};
