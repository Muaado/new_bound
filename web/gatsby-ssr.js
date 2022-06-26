/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://y7yu20xn.api.sanity.io/v1/graphql/master/default",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <div className="root-parallax">{element}</div>
  </ApolloProvider>
);
