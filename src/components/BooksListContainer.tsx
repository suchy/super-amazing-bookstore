import React, { Fragment, MouseEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Book, SelectedBooks, GET_BOOKS_QUERY } from '../constants';
import { Summary } from './Summary';
import { BooksList } from './BooksList';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';

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
    return (
      <ErrorMessage message="Something went wrong while fetching data. Please refresh page." />
    );
  }

  const { books } = data as GetBooksData;

  const slectedBooksArray = Object.entries(selectedBooks);
  const isAllSelected = slectedBooksArray.length === books.length;
  const isAnySelected = slectedBooksArray.length > 0;

  const handleBookSelect = (bookId: number) => () => {
    const book = books.find((book) => book.bookId === bookId);

    if (!book) {
      return;
    }

    const newSelectedBooks = { ...selectedBooks };

    if (newSelectedBooks[bookId]) {
      delete newSelectedBooks[bookId];
    } else {
      newSelectedBooks[bookId] = book.price;
    }

    setSelectedBooks(newSelectedBooks);
  };

  const handleAllBooksSelect = () => {
    let newSelectedBooks: SelectedBooks;

    if (isAnySelected) {
      newSelectedBooks = {};
    } else {
      newSelectedBooks = books.reduce(
        (selected: SelectedBooks, book) => ({
          ...selected,
          [book.bookId]: book.price
        }),
        {}
      );
    }

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
