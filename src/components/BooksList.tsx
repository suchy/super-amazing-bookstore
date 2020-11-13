import React, { MouseEvent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { Summary } from './Summary';
import { Book } from '../constants';
import { filterSelectedItems } from '../helpers/filter-selected-items';

interface BooksListProps {
  books: Book[];
  onBookSelect: (bookId: string) => void;
  onBookEditClick: (bookId: string) => void;
}

export const BooksList = ({
  books,
  onBookEditClick,
  onBookSelect
}: BooksListProps) => {
  const selectedBooks = filterSelectedItems(books);

  const isAllSelected = selectedBooks.length === books.length;
  const isAnySelected = selectedBooks.length > 0;

  const handleBookSelect = (bookId: string) => () => {
    onBookSelect(bookId);
  };

  const handleBookEditClick = (bookId: string) => (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onBookEditClick(bookId);
  };

  return (
    <TableContainer component={Paper}>
      <Summary selectedBooks={selectedBooks} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={isAnySelected}
                indeterminate={isAnySelected && !isAllSelected}
                color="primary"
              />
            </TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((book) => (
            <TableRow
              hover
              key={book.bookId}
              onClick={handleBookSelect(book.bookId)}
            >
              <TableCell>
                <Checkbox checked={book.selected} color="primary" />
              </TableCell>
              <TableCell>{book.bookId}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell align="right">{book.price}</TableCell>
              <TableCell align="right">
                <button onClick={handleBookEditClick(book.bookId)}>Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
