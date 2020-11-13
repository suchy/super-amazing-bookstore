import React from 'react';
import { useMutation } from '@apollo/client';
import { EditBookForm } from './EditBookForm';
import {
  Book,
  CREATE_BOOK_MUTATION,
  EDIT_BOOK_MUTATION,
  GET_BOOKS_QUERY
} from '../constants';
import { replaceOrAddBook } from '../helpers/replace-or-add-book';
import { ErrorMessage } from './ErrorMessage';
import { Loader } from './Loader';
import { Modal } from './Modal';

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
}

export const EditBookModal = ({ book, onClose }: EditBookModalProps) => {
  const mutation = book.bookId ? EDIT_BOOK_MUTATION : CREATE_BOOK_MUTATION;

  const [saveBook, { loading, error, client }] = useMutation(mutation);

  const title = book.bookId ? `Edit book: "${book.title}"` : 'Create new book';

  const handleSubmit = async (book: Book) => {
    book.price = Number(book.price);

    const saveBookResponse = await saveBook({ variables: book });

    // small hack to get saveBookResponse.data.editBook or saveBookResponse.data.createBook
    // as any of those properties is possible, depends on which query was used
    const savedBook = Object.values(saveBookResponse.data)[0] as Book;

    const { books } = client.readQuery({ query: GET_BOOKS_QUERY });

    const newBooks = replaceOrAddBook(books, savedBook);

    client.writeQuery({
      query: GET_BOOKS_QUERY,
      data: { books: newBooks }
    });

    onClose();
  };

  return (
    <Modal title={title} onClose={onClose}>
      {error && (
        <ErrorMessage message="Something went wrong while saving a book. Please try again." />
      )}

      {loading && <Loader />}

      {!loading && (
        <EditBookForm book={book} onClose={onClose} onSubmit={handleSubmit} />
      )}
    </Modal>
  );
};
