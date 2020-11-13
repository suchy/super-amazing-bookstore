import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { BooksListContainer } from './BooksListContainer';
import { EditBookModal } from './EditBookModal';
import { Book, EMPTY_BOOK } from '../constants';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AppContainer = styled.div`
  max-width: 1248px;
  padding: 0 16px 16px;
  margin: 0 auto;
`;

export const App = () => {
  const [editedBook, setEditedBook] = useState<Book | undefined>();

  const handleBookEditClick = (book: Book) => {
    setEditedBook(book);
  };

  const handleCreateBookClick = () => {
    setEditedBook(EMPTY_BOOK);
  };

  const handleCloseModal = () => {
    setEditedBook(undefined);
  };

  return (
    <AppContainer>
      <Header>
        <h1>Books</h1>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateBookClick}
        >
          Create new
        </Button>
      </Header>

      {editedBook && (
        <EditBookModal book={editedBook} onClose={handleCloseModal} />
      )}

      <BooksListContainer onBookEditClick={handleBookEditClick} />
    </AppContainer>
  );
};
