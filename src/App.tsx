import React from "react";
import { Provider } from "urql";
import "./App.css";
import { gqlClient } from "./common/gqlClient";
import { useAddBookMutation, useBooksQuery, useDeleteBookMutation, useUpdateBookMutation } from "./generated/graphql";

const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;

const client = gqlClient({ url: "http://localhost:4000/", token: token });

// type Node = {
//   id?: string;
//   url?: string;
//   name?: string;
//   description?: string;
//   createdAt?: string;
// };

const App = () => {
  return (
    <div className="App">
      <div></div>
      <Provider value={client}>
        <Content />
      </Provider>
    </div>
  );
};

const Content = () => {
  const searchQuery = "React in:readme";

  const [{ fetching, data, error }] = useBooksQuery({});

  // const [addResult, addBook] = useAddBookMutation();
  const [addResult, addBook] = useAddBookMutation();
  const [updateResult, updateBook] = useUpdateBookMutation();
  const [deleteResult, deleteBook] = useDeleteBookMutation();

  // const [result, reexecuteQuery] = useQuery<RepositoryResult>({
  //   query: query,
  //   variables: { searchQuery },
  // });
  // const { data, fetching, error } = result;

  // const [{ fetching, data, error }] = useFindIssueIdQuery({ variables: { issueNumber: 1 } });

  // const [{ fetching, data, error }] = useRepositoryQuery({
  //   variables: {
  //     // const [{ fetching, data, error }] = useQuery<RepositoryResult>({
  //     searchQuery,
  //   },
  // });

  const onAdd = () => addBook({ input: { title: "foo", author: "bar" } });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {data &&
          data.books.map((b, i) => (
            <li key={i}>
              {b.title} / {b.author}
            </li>
          ))}
      </ul>
      <button onClick={onAdd}>add</button>
      <button onClick={() => updateBook({ input: { title: "foobar" } })}>update</button>
      <button onClick={() => deleteBook({ id: 3 })}>delete</button>
    </>
  );
};

export default App;
