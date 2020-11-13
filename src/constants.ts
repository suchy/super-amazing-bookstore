import { gql } from '@apollo/client';

export interface Book {
  author: string;
  bookId: number;
  price: number;
  title: string;
  selected?: boolean;
}

export interface SelectedBooks {
  [bookId: number]: number;
}

export const EMPTY_BOOK = { author: '', bookId: 0, price: 0, title: '' };

export const GET_BOOKS_QUERY = gql`
  query GetBooks {
    books {
      author
      bookId
      price
      title
    }
  }
`;

export const CREATE_BOOK_MUTATION = gql`
  mutation CreateBookMutation(
    $author: String!
    $price: Float!
    $title: String!
  ) {
    createBook(author: $author, price: $price, title: $title) {
      author
      bookId
      price
      title
    }
  }
`;

export const EDIT_BOOK_MUTATION = gql`
  mutation EditBookMutation(
    $author: String!
    $bookId: Int!
    $price: Float!
    $title: String!
  ) {
    editBook(author: $author, bookId: $bookId, price: $price, title: $title) {
      author
      bookId
      price
      title
    }
  }
`;
