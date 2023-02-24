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
  const api_idsAlreadySeen: number[] = [];
  const api_idsToWatch: number[] = [];
  const api_idsFavourite: number[] = [];
  const [toWatchOpen, setToWatchOpen] = useState(false);
  const [alreadySeenOpen, setAlreadySeenOpen] = useState(false);
  const [favouriteOpen, setFavouriteOpen] = useState(false);
  const [myListOpen, setMyListOpen] = useState(true);
  const [movies, setMovies] = useState([]);
  const [moviesAlreadySeen, setMoviesAlreadySeen] = useState([]);
  const [moviesToWatch, setMoviesToWatch] = useState([]);
  const [moviesFavourite, setMoviesFavourite] = useState([]);

  // Fetch movies
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
    fetchMoviesAlreadySeen(api_idsAlreadySeen);
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

  const fetchMoviesFavourite = async (api_idsFavourite: number[]) => {
    const promises = api_idsFavourite.map((api_id) =>
      axios.get(
        `https://api.themoviedb.org/3/movie/${api_id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits`
      )
    );
    try {
      const responses = await Promise.all(promises);
      const myMoviesFavourite = responses.map((res) => res.data);
      setMoviesFavourite(myMoviesFavourite);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMoviesFavourite(api_idsFavourite);
  }, []);

  // Handle click
  const handleclickMyList = () => {
    setMyListOpen(!myListOpen);
    if (alreadySeenOpen) {
      setAlreadySeenOpen(false);
    }
    if (toWatchOpen) {
      setToWatchOpen(false);
    }
    if (favouriteOpen) {
      setFavouriteOpen(false);
    }
  };

  const handleClickAlreadySeen = () => {
    setAlreadySeenOpen(!alreadySeenOpen);
    if (myListOpen) {
      setMyListOpen(false);
    }
    if (toWatchOpen) {
      setToWatchOpen(false);
    }
    if (favouriteOpen) {
      setFavouriteOpen(false);
    }
  };

  const handleClickToWatch = () => {
    setToWatchOpen(!toWatchOpen);
    if (myListOpen) {
      setMyListOpen(false);
    }
    if (alreadySeenOpen) {
      setAlreadySeenOpen(false);
    }
    if (favouriteOpen) {
      setFavouriteOpen(false);
    }
  };

  const handleClickFavourite = () => {
    setFavouriteOpen(!favouriteOpen);
    if (myListOpen) {
      setMyListOpen(false);
    }
    if (toWatchOpen) {
      setToWatchOpen(false);
    }
    if (alreadySeenOpen) {
      setAlreadySeenOpen(false);
    }
  };

  // Loader
  if (myMoviesIsLoading) {
    return <div>Loading...</div>;
  }

  myMovies.map((movie) => api_ids.push(movie.api_id));
  myMovies.filter((movie) => {
    if (movie.alreadySeen) {
      api_idsAlreadySeen.push(movie.api_id);
    }
    if (!movie.alreadySeen) {
      api_idsToWatch.push(movie.api_id);
    }
    if (movie.favourite) {
      api_idsFavourite.push(movie.api_id);
    }
  });

  return (
    <div className="mt-10 w-[90%] mx-auto">
      <button
        className="w-full mb-6 mx-auto text-2xl text-primary"
        onClick={handleclickMyList}
      >
        MA LISTE
      </button>
      <div className="flex justify-around">
        <button
          className={myListOpen || toWatchOpen ? `text-white` : `text-gray`}
          onClick={handleClickToWatch}
        >
          A voir
        </button>
        <button
          className={myListOpen || alreadySeenOpen ? `text-white` : `text-gray`}
          onClick={handleClickAlreadySeen}
        >
          Déjà vu
        </button>
      </div>
      <button
        className={
          myListOpen || favouriteOpen
            ? `text-white mx-auto w-full`
            : `text-gray mx-auto w-full`
        }
        onClick={handleClickFavourite}
      >
        Favoris
      </button>
      <div className="flex flex-wrap justify-between w-full mt-8">
        {myListOpen &&
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
        {favouriteOpen &&
          moviesFavourite.map((movie) => (
            <Link key={movie.id} href={`p/${movie.id}`}>
              <MovieList movie={movie} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MyMovieList;
