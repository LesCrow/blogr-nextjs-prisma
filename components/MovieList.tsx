import Image from "next/image";
import React from "react";
import { releaseDate, srcImage } from "../utils/constants";
import { DirectorProps, MovieProps } from "../utils/globalTypes";

type Props = {
  movie: MovieProps;
};

export default function MovieList({ movie }: Props) {
  return (
    <div className="flex border border-black mb-4 p-4">
      <Image
        src={srcImage(movie.poster_path)}
        width={100}
        height={150}
        alt={movie.title}
      />
      <div className="w-full text-center">
        <h1 className="text-xl">{movie.title}</h1>
        <p>{releaseDate(movie.release_date)}</p>
        <p>{movie.vote_average}</p>
      </div>
    </div>
  );
}
