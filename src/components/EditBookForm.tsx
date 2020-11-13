import React, { ChangeEvent, EventHandler, MouseEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Book } from '../constants';

interface EditBookModalProps {
  book: Book;
  onClose: EventHandler<MouseEvent<HTMLButtonElement>>;
  onSubmit: (book: Book) => void;
}

interface Errors {
  title: boolean;
  author: boolean;
  price: boolean;
}
export const EditBookForm = ({
  book: initialBook,
  onClose
}: EditBookModalProps) => {
  const [book, setBook] = useState(initialBook);
  const [errors, setErrors] = useState<Errors>({
    author: false,
    price: false,
    title: false
  });

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
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

    if (!hasErrors) {
      console.log('submit!');
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
    <Dialog open onClose={onClose}>
      {book.bookId && (
        <DialogTitle>Edit book: "{initialBook.title}"</DialogTitle>
      )}

      {!book.bookId && <DialogTitle>Create new book</DialogTitle>}

      <DialogContent>
        <TextField
          autoFocus
          id="title"
          label="Title"
          type="text"
          fullWidth
          onChange={handleChange('title')}
          value={book.title}
          required
          error={errors.title}
        />

        <TextField
          autoFocus
          id="author"
          label="Author"
          type="text"
          fullWidth
          onChange={handleChange('author')}
          value={book.author}
          required
          error={errors.author}
        />

        <TextField
          autoFocus
          id="price"
          label="Price"
          type="number"
          fullWidth
          onChange={handleChange('price')}
          value={book.price}
          required
          error={errors.price}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isSubmitDisabled}
        >
          {book.bookId ? 'Save book' : 'Create book'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
