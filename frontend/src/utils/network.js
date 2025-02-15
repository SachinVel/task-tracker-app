import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_NODE_API;

export const backendCall = axios.create({
  baseURL: BACKEND_URL,
});