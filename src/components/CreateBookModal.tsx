import React, { EventHandler, MouseEvent } from 'react';
import { EditBookForm } from './EditBookForm';
import { Book } from '../constants';

const newBook: Book = { bookId: '', author: '', price: 0, title: '' };

interface CreateBookModalProps {
  onClose: EventHandler<MouseEvent<HTMLButtonElement>>;
  // onSubmit: (book: Book) => void;
}

export const CreateBookModal = ({ onClose }: CreateBookModalProps) => {
  const handleSubmit = (book: Book) => {
    console.log(book);
  };

  return (
    <EditBookForm book={newBook} onClose={onClose} onSubmit={handleSubmit} />
  );
};
