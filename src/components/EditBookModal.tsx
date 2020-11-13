import React, { ChangeEvent, EventHandler, MouseEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Book, EditableBook } from '../constants';

interface EditBookModalProps {
  book?: EditableBook;
  isOpen: boolean;
  onClose: EventHandler<MouseEvent<HTMLButtonElement>>;
}

const emptyBook: EditableBook = { authors: '', price: 0, title: '' };

export const EditBookModal = ({
  book: initialBook,
  isOpen,
  onClose
}: EditBookModalProps) => {
  const [book, setBook] = useState(initialBook || emptyBook);

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(book);
  };

  const handleChange = (field: keyof EditableBook) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newBook = { ...book };
    // @ts-ignore
    newBook[field] = event.target.value;
    setBook(newBook);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit book</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="title"
          label="Title"
          type="text"
          fullWidth
          onChange={handleChange('title')}
          value={book.title}
        />

        <TextField
          autoFocus
          id="authors"
          label="Authors"
          type="text"
          fullWidth
          onChange={handleChange('authors')}
          value={book.authors}
        />

        <TextField
          autoFocus
          id="price"
          label="Price"
          type="number"
          fullWidth
          value={book.price}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button onClick={handleSubmit} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};
