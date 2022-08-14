import React from "react";
import { Provider, useQuery } from "urql";
import "./App.css";
import { gqlClient } from "./common/gqlClient";

const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN;
console.log(token);

const client = gqlClient({ url: "https://api.github.com/graphql", token: token });

type Node = {
  id?: string;
  url?: string;
  name?: string;
  description?: string;
  createdAt?: string;
};

type RepositoryResult = {
  search: {
    nodes: Node[];
  };
};

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

const query = `
query RepositoryNameQuery($searchQuery: String!) {
  search(type: REPOSITORY, query: $searchQuery, last: 20) {
    repositoryCount
    nodes {
      ... on Repository {
        id
        url
        name
        description
        createdAt
      }
    }
  }
}
`;

const Content = () => {
  const searchQuery = "React in:readme";
  // const [result, reexecuteQuery] = useQuery<RepositoryResult>({
  //   query: query,
  //   variables: { searchQuery },
  // });
  // const { data, fetching, error } = result;

  const [{ fetching, data, error }] = useQuery<RepositoryResult>({
    query: query,
    variables: { searchQuery },
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul className="list-group">
      {data &&
        data.search.nodes.map((r, i) => (
          <li key={i}>
            <a href={r.url}>{r.url}</a>
          </li>
        ))}
    </ul>
  );
};

export default App;
