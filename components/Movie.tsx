import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { MovieProps } from "../utils/globalTypes";
import { useQuery } from "@tanstack/react-query";
import { moviePosterFetcher } from "../utils/tmdbFetcher";

const Movie: React.FC<{ movie: MovieProps }> = ({ movie }) => {
  // const alreadySeen = movie.seen ? "Already seen" : "To watch";

  const {
    data: moviePoster,
    error: moviePosterError,
    isLoading: moviePosterIsLoading,
  } = useQuery(["movies"], () => moviePosterFetcher.getOne(movie.poster_path));

  if (moviePosterIsLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div
      className="p-6"
      onClick={() => Router.push("/p/[id]", `/p/${movie.id}`)}
    >
      {/* <Image
        src={moviePoster}
        width={100}
        height={100}
        alt="backdrop"
      /> */}
      <p>{movie.title}</p>
      {/* <ReactMarkdown children={movie.title} /> */}
    </div>
  );
};

export default Movie;
