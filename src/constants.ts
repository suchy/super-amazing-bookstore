export interface Book {
  author: string;
  bookId: string;
  price: number;
  title: string;
  selected?: boolean;
}

export interface EditableBook extends Omit<Book, 'bookId'> {
  bookId?: string;
}
