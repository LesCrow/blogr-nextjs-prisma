/* eslint-disable react-hooks/exhaustive-deps */
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieCard";
import { movieFetcher } from "../utils/fetcher";

type TProps = {
  movies: Movie[];
};

const MyMovieList = (props: TProps) => {
  const {
    data: myMovies,
    error: myMoviesError,
    isLoading: myMoviesIsLoading,
  } = useQuery<Movie[]>(["myMovies"], async () => movieFetcher.getAll());

  const api_ids: number[] = [];
  const api_idsAlreadySeen = [];
  const api_idsToWatch = [];
  const [toWatchOpen, setToWatchOpen] = useState(false);
  const [alreadySeenOpen, setAlreadySeenOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesAlreadySeen, setMoviesAlreadySeen] = useState([]);
  const [moviesToWatch, setMoviesToWatch] = useState([]);
  myMovies.map((movie) => api_ids.push(movie.api_id));
  myMovies.filter((movie) =>
    movie.alreadySeen
      ? api_idsAlreadySeen.push(movie.api_id)
      : api_idsToWatch.push(movie.api_id)
  );

  const fetchMovies = async (api_ids: number[]) => {
    const promises = api_ids.map((api_id) =>
      axios.get(
        `https://api.themoviedb.org/3/movie/${api_id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits`
      )
    );
    try {
      const responses = await Promise.all(promises);
      const myMovies = responses.map((res) => res.data);
      setMovies(myMovies);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies(api_ids);
  }, []);

  const fetchMoviesAlreadySeen = async (api_idsAlreadySeen: number[]) => {
    const promises = api_idsAlreadySeen.map((api_id) =>
      axios.get(
        `https://api.themoviedb.org/3/movie/${api_id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits`
      )
    );
    try {
      const responses = await Promise.all(promises);
      const myMoviesAlreadySeen = responses.map((res) => res.data);
      setMoviesAlreadySeen(myMoviesAlreadySeen);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMoviesNotSeen(api_idsToWatch);
  }, []);

  const fetchMoviesNotSeen = async (api_idsNotSeen: number[]) => {
    const promises = api_idsNotSeen.map((api_id) =>
      axios.get(
        `https://api.themoviedb.org/3/movie/${api_id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits`
      )
    );
    try {
      const responses = await Promise.all(promises);
      const myMoviesToWatch = responses.map((res) => res.data);
      setMoviesToWatch(myMoviesToWatch);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMoviesNotSeen(api_idsToWatch);
  }, []);

  const handleClickAlreadySeen = () => {
    setAlreadySeenOpen(!alreadySeenOpen);
  };
  const handleClickToWatch = () => {
    setToWatchOpen(!toWatchOpen);
  };

  console.log(alreadySeenOpen, toWatchOpen);

  return (
    <div className="mt-10 w-[90%] mx-auto">
      <h1 className="w-fit mb-6 mx-auto text-2xl text-primary">Ma liste</h1>
      <div className="flex justify-around">
        <button onClick={handleClickToWatch}>A voir</button>
        <button onClick={handleClickAlreadySeen}>Déjà vu</button>
      </div>

      <div className="flex flex-wrap justify-between w-full mt-8">
        {!alreadySeenOpen &&
          !toWatchOpen &&
          movies.map((movie) => (
            <Link key={movie.id} href={`p/${movie.id}`}>
              <MovieList movie={movie} />
            </Link>
          ))}
        {alreadySeenOpen &&
          moviesAlreadySeen.map((movie) => (
            <Link key={movie.id} href={`p/${movie.id}`}>
              <MovieList movie={movie} />
            </Link>
          ))}
        {toWatchOpen &&
          moviesToWatch.map((movie) => (
            <Link key={movie.id} href={`p/${movie.id}`}>
              <MovieList movie={movie} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MyMovieList;
