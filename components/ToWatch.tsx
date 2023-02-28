import { Movie } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { movieFetcher } from "../utils/fetcher";

type Props = {
  myMovie: Movie[];
};

function ToWatch({ myMovie }: Props) {
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
