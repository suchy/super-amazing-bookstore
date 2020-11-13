import { SelectedBooks } from '../constants';

export const sumSelectedBooksPrice = (selectedBooks: SelectedBooks): number =>
  Object.values(selectedBooks)
    .reduce((acc: number, price: number) => acc + price, 0)
    .toPrecision(4);
