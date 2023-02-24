import axios from "axios";

const fetchClientTmdb = () => {
  const defaultOptions = {
    baseURL: process.env.API_URL || "https://api.themoviedb.org/3/",
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  return instance;
};
export default fetchClientTmdb();
