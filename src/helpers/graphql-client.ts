import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getConfig } from '../config';

const config = getConfig();

export const client = new ApolloClient({
  uri: config.graphQlUrl,
  cache: new InMemoryCache()
});
