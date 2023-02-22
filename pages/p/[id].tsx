import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { DirectorProps, MovieProps } from "../../utils/globalTypes";
import { movieById } from "../../utils/tmdbFetcher";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { getMovieByApiId, movieFetcher } from "../../utils/fetcher";
import { useSession } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";
import { releaseDate } from "../../utils/constants";
import Modal from "../../components/modal/Modal";
import useModal from "../../components/modal/UseModal";
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
    <Layout>
      <div className="flex flex-col items-center space-y-2 mt-8">
        {session && <AddAMovie />}

        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={200}
          height={300}
          alt={movie.title}
        />

        <h2 className="text-2xl">{movie.title}</h2>
        <p>by {director[0].name}</p>
        <p>{releaseDate(movie.release_date)}</p>
        <div className="flex w-full justify-around">
          {movie.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <p className="text-center">{movie.overview}</p>
        <p>{movie.vote_average}</p>
      </div>
    </Layout>
  );
};

export default Movie;
