import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { BooksList } from './BooksList';
import { CreateBookModal } from './CreateBookModal';
import { EditBookModal } from './EditBookModal';
import { Book } from '../constants';

const initialBooks: Book[] = [
  {
    author: 'Mateusz Suchoń',
    bookId: 'sdfasdfasdfasfasf',
    price: 17.76,
    title: 'Lorem ipsum dolor',
    selected: false
  },
  {
    author: 'Mateusz Suchoń',
    bookId: 'sdfasdfasdfasffdsgsdgsdasf',
    price: 17.76,
    title: 'Lorem ipsum dolor',
    selected: false
  }
];

export const App = () => {
  const [books, setBooks] = useState(initialBooks);
  const [editedBookId, setEditedBookId] = useState<string | undefined>();
  const editedBook = books.find(({ bookId }) => bookId === editedBookId);

  const handleBookEditClick = (bookId: string) => {
    setEditedBookId(bookId);
  };

  const handleCreateBookClick = () => {
    setEditedBookId('');
  };

  const handleBookSelect = (bookId: string) => {
    const bookIndex = books.findIndex((book) => book.bookId === bookId);

    if (bookIndex > -1) {
      const newBooks = [...books];
      newBooks[bookIndex].selected = !newBooks[bookIndex].selected;
      setBooks(newBooks);
    }
  };

  const handleCloseModal = () => {
    setEditedBookId(undefined);
  };

  return (
    <div>
      <h1>Books</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateBookClick}
      >
        Create new
      </Button>

      {editedBookId === '' && <CreateBookModal onClose={handleCloseModal} />}

      {editedBookId && editedBook && (
        <EditBookModal book={editedBook} onClose={handleCloseModal} />
      )}

      <BooksList
        books={books}
        onBookEditClick={handleBookEditClick}
        onBookSelect={handleBookSelect}
      />
    </div>
  );
};
