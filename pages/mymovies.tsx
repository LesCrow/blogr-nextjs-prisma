/* eslint-disable react-hooks/exhaustive-deps */
import { Movie } from "@prisma/client";
import axios from "axios";
import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const movies = await prisma.movie.findMany();

  return {
    props: { movies },
    revalidate: 10,
  };
};

type TProps = {
  movies: Movie[];
};

const MovieList = (props: TProps) => {
  const api_ids: number[] = [];
  const [movies, setMovies] = useState([]);
  props.movies.map((movie) => api_ids.push(movie.api_id));

  const fetchMovies = async (api_ids) => {
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

  console.log(movies);

  return (
    <Layout>
      <div>
        {movies.map((movie) => (
          <p key={movie.id}>{movie.title}</p>
        ))}
      </div>
    </Layout>
  );
};

export default MovieList;

//`/movie/${id}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits`
