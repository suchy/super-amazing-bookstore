import React, { ChangeEvent, useState } from 'react';
import { BooksList } from './BooksList';
import { CreateBook } from './CreateBook';
import { Book } from '../constants';

const initialBooks: Book[] = [
  {
    authors: 'Mateusz Suchoń',
    id: 'sdfasdfasdfasfasf',
    price: 17.76,
    title: 'Lorem ipsum dolor',
    selected: false
  },
  {
    authors: 'Mateusz Suchoń',
    id: 'sdfasdfasdfasffdsgsdgsdasf',
    price: 17.76,
    title: 'Lorem ipsum dolor',
    selected: false
  }
];

export const App = () => {
  const [books, setBooks] = useState(initialBooks);

  const handleBookSelect = (bookId: string) => {
    const bookIndex = books.findIndex(({ id }) => id === bookId);

    if (bookIndex > -1) {
      const newBooks = [...books];
      newBooks[bookIndex].selected = !newBooks[bookIndex].selected;
      setBooks(newBooks);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <CreateBook />
      <BooksList books={books} onBookSelect={handleBookSelect} />
    </div>
  );
};
