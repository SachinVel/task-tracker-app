import axios from "axios";
import { ApolloClient, InMemoryCache } from '@apollo/client';

const BACKEND_URL = process.env.REACT_APP_NODE_API;

export const backendCall = axios.create({
  baseURL: BACKEND_URL,
});


export const apolloClient = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
});