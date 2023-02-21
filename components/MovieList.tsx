import Image from "next/image";
import React from "react";
import { releaseDate } from "../utils/constants";
import { DirectorProps, MovieProps } from "../utils/globalTypes";

type Props = {
  movie: MovieProps;
};

export default function MovieList({ movie }: Props) {
  return (
    <div className="flex border mb-4 p-4">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={100}
        height={150}
        alt={movie.title}
      />
      <div className="w-full text-center">
        <h1>{movie.title}</h1>
        <p>{releaseDate(movie.release_date)}</p>
        <p>{movie.vote_average}</p>
      </div>
    </div>
  );
}
