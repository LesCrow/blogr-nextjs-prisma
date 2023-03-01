/* eslint-disable react-hooks/exhaustive-deps */
import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Loader from "../components/Loader";
import MovieList from "../components/MovieCard";
import { movieFetcher } from "../utils/fetcher";

type TProps = {
  movies: Movie[];
};

const MyMovieList = (props: TProps) => {
  const { data: session, status } = useSession();
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
      console.log(movies);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies");
    }
  };

  useEffect(() => {
    if (!myMoviesIsLoading) {
      fetchMovies(api_ids);
    }
  }, [myMoviesIsLoading]);

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
    if (!myMoviesIsLoading) {
      fetchMoviesAlreadySeen(api_idsAlreadySeen);
    }
  }, [myMoviesIsLoading]);

  const fetchMoviesTowatch = async (api_idsNotSeen: number[]) => {
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
    if (!myMoviesIsLoading) {
      fetchMoviesTowatch(api_idsToWatch);
    }
  }, [myMoviesIsLoading]);

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
    if (!myMoviesIsLoading) {
      fetchMoviesFavourite(api_idsFavourite);
    }
  }, [myMoviesIsLoading]);

  // Loaders and Error
  if (myMoviesIsLoading) {
    return <Loader />;
  }

  if (myMoviesError) {
    return <div>An Error Occured</div>;
  }

  // Fill api ids arrays
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

  // No session
  if (!session) {
    return (
      <p className="flex justify-center mt-16 text-xl">
        Veuillez vous connectez
      </p>
    );
  }

  // Handle click
  const handleclickMyList = () => {
    setMyListOpen(true);
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

  return (
    <div className="mt-10 w-[90%] mx-auto">
      <button
        className="w-full mb-6 mx-auto text-2xl text-primary"
        onClick={handleclickMyList}
      >
        MA LISTE
      </button>
      <>
        <div className="flex justify-around">
          <Button
            content="A voir"
            handleClick={handleClickToWatch}
            style={
              myListOpen || toWatchOpen
                ? `bg-secondary text-black`
                : `text-secondary`
            }
          />
          <Button
            content="Déjà vu"
            handleClick={handleClickAlreadySeen}
            style={
              myListOpen || alreadySeenOpen
                ? `bg-secondary text-black`
                : `text-secondary`
            }
          />
        </div>
        <div className="flex mt-4">
          <Button
            content="Favoris"
            handleClick={handleClickFavourite}
            style={
              myListOpen || favouriteOpen
                ? `bg-secondary text-black`
                : `text-secondary`
            }
          />
        </div>
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
      </>
    </div>
  );
};

export default MyMovieList;
