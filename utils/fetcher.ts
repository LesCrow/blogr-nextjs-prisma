import axiosInstance from "./axiosInstance";

export const directorFetcher = {
  getAll: async () => (await axiosInstance.get("directors")).data,
};

export const genreFetcher = {
  getAll: async () => (await axiosInstance.get("genres")).data,
};
