import React from 'react';
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
}

export const BooksList = ({ books, onBookSelect }: BooksListProps) => {
  const selectedBooks = filterSelectedItems(books);

  const isAllSelected = selectedBooks.length === books.length;
  const isAnySelected = selectedBooks.length > 0;

  const handleBookSelect = (bookId: string) => () => {
    onBookSelect(bookId);
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
            <TableCell>Authors</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {books.map((book) => (
            <TableRow hover key={book.id} onClick={handleBookSelect(book.id)}>
              <TableCell>
                <Checkbox checked={book.selected} color="primary" />
              </TableCell>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.authors}</TableCell>
              <TableCell align="right">{book.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// add clickable row
