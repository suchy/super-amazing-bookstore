import React, { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { Book } from '../constants';

const Field = styled.div`
  margin-bottom: 16px;
`;

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSubmit: (book: Book) => void;
}

interface Errors {
  title: boolean;
  author: boolean;
  price: boolean;
}

export const EditBookForm = ({
  book: initialBook,
  onClose,
  onSubmit
}: EditBookModalProps) => {
  const [book, setBook] = useState(initialBook);

  const [errors, setErrors] = useState<Errors>({
    author: false,
    price: false,
    title: false
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = {
      author: !book.author,
      price: !book.price,
      title: !book.title
    };

    setErrors(errors);

    const hasErrors = Object.values(errors).reduce(
      (hasError, error) => (error ? error : hasError),
      false
    );

    const hasChanges = !Object.is(
      JSON.stringify(book),
      JSON.stringify(initialBook)
    );

    if (!hasErrors && hasChanges) {
      onSubmit(book);
    } else {
      onClose();
    }
  };

  const handleChange = (field: keyof Book) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newBook = { ...book };
    // @ts-ignore
    newBook[field] = event.target.value;
    setBook(newBook);
  };

  const isSubmitDisabled = !book.author || !book.title || !book.price;

  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <TextField
          autoFocus
          error={errors.title}
          fullWidth
          id="title"
          label="Title"
          onChange={handleChange('title')}
          required
          type="text"
          value={book.title}
        />
      </Field>

      <Field>
        <TextField
          error={errors.author}
          fullWidth
          id="author"
          label="Author"
          onChange={handleChange('author')}
          required
          type="text"
          value={book.author}
        />
      </Field>

      <Field>
        <TextField
          error={errors.price}
          fullWidth
          id="price"
          label="Price"
          onChange={handleChange('price')}
          required
          type="number"
          value={book.price}
        />
      </Field>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button type="submit" color="primary" disabled={isSubmitDisabled}>
          {book.bookId ? 'Save book' : 'Create new book'}
        </Button>
      </DialogActions>
    </form>
  );
};
