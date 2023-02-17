import axiosInstance from "./axiosInstance";

export const directorFetcher = {
  getAll: async () => (await axiosInstance.get("directors")).data,
};
