import { Book } from '../constants';

export const filterSelectedItems = (books: Book[]) =>
  books.filter(({ selected }) => selected);
