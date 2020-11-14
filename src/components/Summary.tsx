import React from 'react';
import styled from 'styled-components';
import { SelectedBooks } from '../constants';
import { sumSelectedBooksPrice } from '../helpers/sum-selected-books-price';

interface SummaryProps {
  selectedBooks: SelectedBooks;
}

const StyledSummary = styled.div`
  height: 16px;
  margin-bottom: 24px;
`;

export const Summary = ({ selectedBooks }: SummaryProps) => {
  const selectedBooksArray = Object.entries(selectedBooks);
  const selectedBooksValue = sumSelectedBooksPrice(selectedBooks);

  return (
    <StyledSummary data-testid="Summary">
      {selectedBooksArray.length > 0 && (
        <div data-testid="SummaryContent">
          {selectedBooksArray.length} books were selected for a total of $
          {selectedBooksValue}
        </div>
      )}
    </StyledSummary>
  );
};
