import { ParsedUrlQuery } from "querystring";
import axiosInstanceTmdb from "./axiosInstanceTmdb";

export const movieFetcherByString = {
  getOne: async (query: string) =>
    (
      await axiosInstanceTmdb.get(
        `search/movie?api_key=${process.env.NEXT_PUBLIC_APIKEY}&query=${query}`
      )
    ).data,
};

export const movieById = {
  getOne: async (id: number) =>
    (
      await axiosInstanceTmdb.get(
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits`
      )
    ).data,
};

export const moviePosterFetcher = {
  getOne: async (query: string) =>
    (await axiosInstanceTmdb.get(`https://image.tmdb.org/t/p/w500${query}`))
      .data,
};
