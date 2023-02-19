import { Movie } from "@prisma/client";
import axiosInstance from "./axiosInstance";

export const directorFetcher = {
  getAll: async () => (await axiosInstance.get("directors")).data,
};

export const genreFetcher = {
  getAll: async () => (await axiosInstance.get("genres")).data,
};

export const moviePost = {
  post: async (
    title: string,
    directorId: string,
    genreId: string,
    year: Date,
    seen: boolean
  ) =>
    await axiosInstance.post<Movie>("movies", {
      title: title,
      directorId: directorId,
      genreId: genreId,
      year: year,
      seen: seen,
    }),
};
