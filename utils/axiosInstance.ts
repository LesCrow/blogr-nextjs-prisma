import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "SERVER_URL",
    timeout: 1000,
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  return instance;
};
export default fetchClient();
