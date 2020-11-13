import React, { EventHandler, MouseEvent } from 'react';
import { Book } from '../constants';
import { EditBookForm } from './EditBookForm';

interface EditBookModalProps {
  book: Book;
  onClose: EventHandler<MouseEvent<HTMLButtonElement>>;
}

export const EditBookModal = ({ book, onClose }: EditBookModalProps) => {
  const handleSubmit = (book: Book) => {
    console.log(book);
  };

  return <EditBookForm book={book} onClose={onClose} onSubmit={handleSubmit} />;
};
