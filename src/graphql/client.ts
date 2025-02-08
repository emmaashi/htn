import { ApolloClient, InMemoryCache } from "@apollo/client";

// hit endpoint
const client = new ApolloClient({
  uri: "https://api.hackthenorth.com/v3/frontend-challenge",
  cache: new InMemoryCache(),
});

export default client;