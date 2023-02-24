import { ParsedUrlQuery } from "querystring";
import axiosInstanceTmdb from "./axiosInstanceTmdb";

export const movieByString = {
  getAll: async (query: string) =>
    (
      await axiosInstanceTmdb.get(
        `/search/movie?api_key=${process.env.NEXT_PUBLIC_APIKEY}&query=${query}`
      )
    ).data,
};

export const movieById = {
  getOne: async (id: any) =>
    (
      await axiosInstanceTmdb.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits&language=fr-FR`
      )
    ).data,
};

export const moviesByTopRated = {
  getAll: async () =>
    (
      await axiosInstanceTmdb.get(
        `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_APIKEY}&language=fr-FR&page=1&append_to_response=credits`
      )
    ).data,
};

export const moviePoster = {
  getOne: async (query: string) =>
    (await axiosInstanceTmdb.get(`https://image.tmdb.org/t/p/w500${query}`))
      .data,
};
