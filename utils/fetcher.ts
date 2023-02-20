import { Movie } from "@prisma/client";
import axiosInstance from "./axiosInstance";

export const directorFetcher = {
  getAll: async () => (await axiosInstance.get("directors")).data,
};

export const genreFetcher = {
  getAll: async () => (await axiosInstance.get("genres")).data,
};

export const moviePost = {
  post: async (api_id: number, toWatch: boolean, favourite: boolean) =>
    await axiosInstance.post<Movie>("movies", {
      api_id: api_id,
      toWatch: toWatch,
      favourite: favourite,
    }),
};
