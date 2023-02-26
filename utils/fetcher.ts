import { Movie } from "@prisma/client";
import axiosInstance from "./axiosInstance";

export const getMovieByApiId = {
  getOne: async (api_id: number) =>
    await (
      await axiosInstance.get(`/movies?api_id=${api_id}`)
    ).data,
};

export const movieFetcher = {
  getAll: async () => (await axiosInstance.get<Movie[]>("movies")).data,
  post: async (api_id: number, alreadySeen: boolean, favourite: boolean) =>
    await axiosInstance.post<Movie>("movies", {
      api_id: api_id,
      alreadySeen: alreadySeen,
      favourite: favourite,
    }),
  update: async (id: string, alreadySeen?: boolean, favourite?: boolean) =>
    await axiosInstance.put(`movies/${id}`, {
      alreadySeen: alreadySeen,
      favourite: favourite,
    }),
};
