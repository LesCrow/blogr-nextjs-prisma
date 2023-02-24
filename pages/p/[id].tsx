import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { DirectorProps, MovieProps } from "../../utils/globalTypes";
import { movieById } from "../../utils/tmdbFetcher";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";
import { releaseDate, runtimeToHours } from "../../utils/constants";
import AddAMovie from "../../components/AddAmovie";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const {
//     data: movie,
//     error: movieError,
//     isLoading: movieIsLoading,
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//   } = useQuery(["movie"], () => movieById.getOne(150));
//   return {
//     props: { movie },
//   };
// };

const Movie: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const idToNumber = parseInt(id as string);

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useQuery<MovieProps>(["movie"], () => movieById.getOne(idToNumber));

  if (movieIsLoading) {
    return <div>Loading...</div>;
  }

  const director: DirectorProps[] = movie.credits.crew.filter(
    ({ job }) => job === "Director"
  );

  return (
    <div className="flex flex-col items-center space-y-2 mt-8 pb-8">
      {session && <AddAMovie />}

      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        width={200}
        height={300}
        alt={movie.title}
      />
      <div>
        <h2 className="text-3xl text-primary">{movie.title}</h2>
        <p>by {director[0].name}</p>
        <div className="flex justify-between">
          <p>{releaseDate(movie.release_date)}</p>
          <p>-</p>
          <p>{runtimeToHours(movie.runtime)}</p>
        </div>
      </div>
      <div className="w-[80%] flex flex-wrap pt-6">
        {movie.genres.map((genre) => (
          <p
            className="rounded-full bg-gray mb-4 mr-2 px-6 py-1 text-secondary"
            key={genre.id}
          >
            {genre.name}
          </p>
        ))}
      </div>
      <p className="py-2 px-6">{movie.overview}</p>
      <div className="flex">
        <Image src="/pictos/star.png" width={20} height={20} alt="star" />
        <p className="ml-2">{movie.vote_average}</p>
      </div>
      <div className="flex">
        <Image
          src="/pictos/people.png"
          width={20}
          height={20}
          alt="vote count"
        />
        <p className="ml-2">{movie.vote_count}</p>
      </div>
    </div>
  );
};

export default Movie;
