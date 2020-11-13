import React from 'react';
import { Book } from '../constants';
import { sumSelectedBooksPrice } from '../helpers/sum-selected-books-price';

interface SummaryProps {
  selectedBooks: Book[];
}

export const Summary = ({ selectedBooks }: SummaryProps) => {
  if (!selectedBooks.length) {
    return null;
  }

  const selectedBooksValue = sumSelectedBooksPrice(selectedBooks);

  return (
    <div>
      Selected: {selectedBooks.length}, price: {selectedBooksValue}
    </div>
  );
};
