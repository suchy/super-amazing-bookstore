export interface Book {
  authors: string;
  id: string;
  price: number;
  title: string;
  selected?: boolean;
}

export interface EditableBook extends Omit<Book, 'id'> {
  id?: string;
}
