import axiosInstanceTmdb from "./axiosInstanceTmdb";

export const movieFetcherByString = {
  getOne: async (query: string) =>
    (await axiosInstanceTmdb.get(`search/movie?api_key=&query=${query}`)).data,
};

export const moviePosterFetcher = {
  getOne: async (query: string) =>
    await axiosInstanceTmdb.get(`https://image.tmdb.org/t/p/w500${query}`),
};
