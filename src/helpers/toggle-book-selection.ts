import { Book, SelectedBooks } from '../constants';

export const toggleBookSelection = (
  selectedBooks: SelectedBooks,
  book: Book
) => {
  const newSelectedBooks = { ...selectedBooks };

  if (newSelectedBooks[book.bookId]) {
    delete newSelectedBooks[book.bookId];
  } else {
    newSelectedBooks[book.bookId] = book.price;
  }

  return newSelectedBooks;
};
