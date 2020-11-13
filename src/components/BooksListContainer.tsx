import React, { Fragment, MouseEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Book, SelectedBooks, GET_BOOKS_QUERY } from '../constants';
import { selectAllBooks } from '../helpers/select-books';
import { toggleBookSelection } from '../helpers/toggle-book-selection';
import { Summary } from './Summary';
import { BooksList } from './BooksList';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import { Empty } from './Empty';

interface BooksListContainerProps {
  onBookEditClick: (book: Book) => void;
}

interface GetBooksData {
  books: Book[];
}

export const BooksListContainer = ({
  onBookEditClick
}: BooksListContainerProps) => {
  const { data, error, loading } = useQuery<GetBooksData>(GET_BOOKS_QUERY);

  const [selectedBooks, setSelectedBooks] = useState<SelectedBooks>({});

  if (loading) {
    return <Loader />;
  }

  if (error) {
    const message =
      'Something went wrong while fetching data. Please refresh page.';
    return <ErrorMessage message={message} />;
  }

  const { books } = data as GetBooksData;

  if (!books.length) {
    return <Empty />;
  }

  const slectedBooksArray = Object.entries(selectedBooks);
  const isAllSelected = slectedBooksArray.length === books.length;
  const isAnySelected = slectedBooksArray.length > 0;

  const handleBookSelect = (bookId: number) => () => {
    const book = books.find((book) => book.bookId === bookId);

    if (!book) {
      return;
    }

    const newSelectedBooks = toggleBookSelection(selectedBooks, book);
    setSelectedBooks(newSelectedBooks);
  };

  const handleAllBooksSelect = () => {
    const newSelectedBooks = isAnySelected ? {} : selectAllBooks(books);
    setSelectedBooks(newSelectedBooks);
  };

  const handleBookEditClick = (book: Book) => (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onBookEditClick(book);
  };

  return (
    <Fragment>
      <Summary selectedBooks={selectedBooks} />
      <BooksList
        books={books}
        selectedBooks={selectedBooks}
        isAnySelected={isAnySelected}
        isAllSelected={isAllSelected}
        onBookEditClick={handleBookEditClick}
        onBookSelect={handleBookSelect}
        onAllBooksSelect={handleAllBooksSelect}
      />
    </Fragment>
  );
};
