import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddBookInput = {
  author?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Book;
  deleteBook: Book;
  updateBook: Book;
};


export type MutationAddBookArgs = {
  input?: InputMaybe<AddBookInput>;
};


export type MutationDeleteBookArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateBookArgs = {
  id?: InputMaybe<Scalars['Int']>;
  input?: InputMaybe<UpdateBookInput>;
};

export type Query = {
  __typename?: 'Query';
  books: Array<Book>;
};

export type UpdateBookInput = {
  author?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type AddBookMutationVariables = Exact<{
  input?: InputMaybe<AddBookInput>;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', title: string, author?: string | null } };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', title: string, author?: string | null }> };

export type DeleteBookMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook: { __typename?: 'Book', title: string, author?: string | null } };

export type UpdateBookMutationVariables = Exact<{
  input?: InputMaybe<UpdateBookInput>;
}>;


export type UpdateBookMutation = { __typename?: 'Mutation', updateBook: { __typename?: 'Book', title: string, author?: string | null } };


export const AddBookDocument = gql`
    mutation AddBook($input: AddBookInput) {
  addBook(input: $input) {
    title
    author
  }
}
    `;

export function useAddBookMutation() {
  return Urql.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument);
};
export const BooksDocument = gql`
    query books {
  books {
    title
    author
  }
}
    `;

export function useBooksQuery(options?: Omit<Urql.UseQueryArgs<BooksQueryVariables>, 'query'>) {
  return Urql.useQuery<BooksQuery, BooksQueryVariables>({ query: BooksDocument, ...options });
};
export const DeleteBookDocument = gql`
    mutation DeleteBook($id: Int!) {
  deleteBook(id: $id) {
    title
    author
  }
}
    `;

export function useDeleteBookMutation() {
  return Urql.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument);
};
export const UpdateBookDocument = gql`
    mutation UpdateBook($input: UpdateBookInput) {
  updateBook(input: $input) {
    title
    author
  }
}
    `;

export function useUpdateBookMutation() {
  return Urql.useMutation<UpdateBookMutation, UpdateBookMutationVariables>(UpdateBookDocument);
};