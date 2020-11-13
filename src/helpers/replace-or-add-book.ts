import { Book } from '../constants';

export const replaceOrAddBook = (books: Book[], newBook: Book) => {
  const bookIndex = books.findIndex(({ bookId }) => bookId === newBook.bookId);
  const newBooks = [...books];

  if (bookIndex === -1) {
    newBooks.push(newBook);
  } else {
    newBooks[bookIndex] = newBook;
  }

  return newBooks;
};
