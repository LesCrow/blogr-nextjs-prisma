import axios from "axios";

const fetchClient = () => {
  const defaultOptions = {
    baseURL:
      process.env.NEXT_PUBLIC_SERVER_URL_DEVELOPPMENT ||
      process.env.NEXT_PUBLIC_URL,
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  return instance;
};
export default fetchClient();
