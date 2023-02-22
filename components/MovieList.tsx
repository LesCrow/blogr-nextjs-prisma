import Image from "next/image";
import React from "react";
import { releaseDate, srcImage } from "../utils/constants";
import { DirectorProps, MovieProps } from "../utils/globalTypes";

type Props = {
  movie: MovieProps;
};

export default function MovieList({ movie }: Props) {
  return (
    <div className="w-full mb-10">
      <Image
        src={srcImage(movie.poster_path)}
        width={150}
        height={300}
        alt={movie.title}
      />
      <div className="mt-2">
        <h1 className="w-[150px] truncate">{movie.title}</h1>
        <div>
          <p className="text-sm">{releaseDate(movie.release_date)}</p>
          <p className="text-sm">{movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
