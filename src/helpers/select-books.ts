import { Book, SelectedBooks } from '../constants';

export const selectAllBooks = (books: Book[]) => {
  const booksReducer = (
    booksSelection: SelectedBooks,
    { bookId, price }: Book
  ) => ({
    ...booksSelection,
    [bookId]: price
  });

  const selectedBooks = books.reduce(booksReducer, {});

  return selectedBooks;
};
