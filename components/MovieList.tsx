import Image from "next/image";
import React from "react";
import { releaseDate, srcImage } from "../utils/constants";
import { DirectorProps, MovieProps } from "../utils/globalTypes";

type Props = {
  movie: MovieProps;
};

export default function MovieList({ movie }: Props) {
  return (
    <div className="w-full mb-10 border border-[#1A1A1A]">
      <Image
        src={srcImage(movie.poster_path)}
        width={150}
        height={300}
        alt={movie.title}
      />
      <div className="mt-2 pb-4 w-fit space-y-2">
        <div className="flex pl-2">
          <Image src="/pictos/star.png" width={20} height={20} alt="star" />
          <p className="ml-2">{movie.vote_average}</p>
        </div>

        <div className="space-y-2">
          <h1 className="w-[150px] truncate px-2">{movie.title}</h1>
          <p className="text-xs px-2 ">{releaseDate(movie.release_date)}</p>
        </div>
      </div>
    </div>
  );
}
