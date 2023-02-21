import Image from "next/image";
import React from "react";
import { releaseDate, srcImage } from "../utils/constants";
import { DirectorProps, MovieProps } from "../utils/globalTypes";

type Props = {
  movie: MovieProps;
};

export default function MovieList({ movie }: Props) {
  return (
    <div className="flex shadow-lg bg-white border border-black rounded-md mb-4 p-4">
      <Image
        src={srcImage(movie.poster_path)}
        width={100}
        height={150}
        alt={movie.title}
      />
      <div className="w-full px-2 text-center flex flex-col justify-between ">
        <h1 className="text-xl">{movie.title}</h1>
        <div>
          <p>{releaseDate(movie.release_date)}</p>
          <p>{movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
