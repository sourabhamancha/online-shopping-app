import React from "react";
import App from "./App";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const httpLink = new HttpLink({
  uri: "https://online-shopping-app-server.herokuapp.com/graphql/",
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("jwtToken");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
