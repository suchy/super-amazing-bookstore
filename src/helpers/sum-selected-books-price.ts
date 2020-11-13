import { Book } from '../constants';

export const sumSelectedBooksPrice = (books: Book[]) =>
  books.reduce((acc, { price }) => acc + price, 0);
