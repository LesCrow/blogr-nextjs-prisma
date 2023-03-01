import { Movie } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { movieFetcher } from "../utils/fetcher";

type Props = {
  myMovie: Movie[];
  isMovieInMyList: boolean;
};

function ToWatch({ myMovie, isMovieInMyList }: Props) {
  const handleSubmitAddToWatchList = (
    id: string,
    api_id: number,
    alreadySeen: boolean,
    favourite: boolean
  ) => {
    if (myMovie[0] !== undefined) {
      movieFetcher.post(api_id, alreadySeen, favourite);
    } else {
    }
    movieFetcher.update(id, alreadySeen, favourite);
  };

  return (
    <>
      <button
        className="text-black w-fit mx-auto"
        onClick={() => {
          handleSubmitAddToWatchList(
            myMovie[0].id,
            myMovie[0].api_id,
            false,
            myMovie[0].favourite
          );
        }}
      >
        {myMovie[0] !== undefined && !myMovie[0].alreadySeen ? (
          <div className="flex justify-center -ml-8">
            <Image
              src="/pictos/checkmark.png"
              width={30}
              height={30}
              alt="checkmark"
            />
            <p>A Voir</p>
          </div>
        ) : (
          <p>A voir</p>
        )}
      </button>
    </>
  );
}

export default ToWatch;
