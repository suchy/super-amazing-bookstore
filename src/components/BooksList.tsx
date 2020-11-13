import React, { MouseEvent, EventHandler, ChangeEvent } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import { Book, SelectedBooks } from '../constants';

interface BooksListProps {
  books: Book[];
  isAnySelected: boolean;
  isAllSelected: boolean;
  selectedBooks: SelectedBooks;
  onBookSelect: (
    bookId: number
  ) => EventHandler<MouseEvent<HTMLTableRowElement>>;
  onAllBooksSelect: EventHandler<ChangeEvent<HTMLInputElement>>;
  onBookEditClick: (book: Book) => EventHandler<MouseEvent<HTMLButtonElement>>;
}

export const BooksList = ({
  books,
  isAnySelected,
  isAllSelected,
  selectedBooks,
  onBookEditClick,
  onBookSelect,
  onAllBooksSelect
}: BooksListProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              checked={isAnySelected}
              indeterminate={isAnySelected && !isAllSelected}
              color="primary"
              onChange={onAllBooksSelect}
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
            key={`book-${book.bookId}`}
            onClick={onBookSelect(book.bookId)}
          >
            <TableCell>
              <Checkbox
                checked={!!selectedBooks[book.bookId]}
                color="primary"
              />
            </TableCell>
            <TableCell>{book.bookId}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell align="right">{book.price}</TableCell>
            <TableCell align="right">
              <IconButton onClick={onBookEditClick(book)}>
                <CreateIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
