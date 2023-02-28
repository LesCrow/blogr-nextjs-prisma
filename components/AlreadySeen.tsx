import { Movie } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { movieFetcher } from "../utils/fetcher";

type Props = {
  myMovie: Movie[];
  isMovieInMyList: boolean;
};

export default function AlreadySeen({ myMovie, isMovieInMyList }: Props) {
  const handleSubmitUpdateMovieList = (
    id: string,
    alreadySeen: boolean,
    favourite: boolean
  ) => {
    movieFetcher.update(id, alreadySeen, favourite);
  };
  return (
    <>
      <button
        className="text-black w-fit mx-auto"
        onClick={() => {
          handleSubmitUpdateMovieList(
            myMovie[0].id,
            true,
            myMovie[0].favourite
          );
        }}
      >
        {myMovie[0] !== undefined && myMovie[0].alreadySeen ? (
          <div className="flex justify-center -ml-6">
            <Image
              src="/pictos/checkmark.png"
              width={30}
              height={30}
              alt="checkmark"
            />
            <p>Déjà vu</p>
          </div>
        ) : (
          <p>Déjà vu</p>
        )}
      </button>
    </>
  );
}
