import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { DirectorProps, MovieProps } from "../../utils/globalTypes";
import { movieById } from "../../utils/tmdbFetcher";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { getMovieByApiId, moviePost } from "../../utils/fetcher";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { releaseDate } from "../../utils/constants";
import Modal from "../../components/modal/Modal";
import useModal from "../../components/modal/UseModal";

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

type TMyMovie = {
  id: string;
  api_id: number;
  already_seen: boolean;
  favourite: boolean;
};

const Movie: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { id } = router.query;
  const idToNumber = parseInt(id as string);
  const notify = () => toast("Veuillez vous connectez");
  const { isShowing, toggle } = useModal();

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useQuery<MovieProps>(["movie"], () => movieById.getOne(idToNumber));

  const {
    data: myMovie,
    error: myMovieError,
    isLoading: myMovieIsLoading,
  } = useQuery<TMyMovie[]>(["myMovie"], () => getMovieByApiId.getOne(238));

  console.log(myMovie);

  if (movieIsLoading || myMovieIsLoading) {
    return <div>Loading...</div>;
  }

  const onClickAdd = (session: object) => {
    if (session) {
      return toggle;
    }
    return notify;
  };

  const handleSubmitMovieList = (
    id: number,
    alreadySeen: boolean,
    favourite: boolean
  ) => {
    moviePost.post(id, alreadySeen, favourite);
  };

  const handleSubmitFavourite = (session: object) => {
    return notify;
  };

  const director: DirectorProps[] = movie.credits.crew.filter(
    ({ job }) => job === "Director"
  );

  return (
    <Layout>
      <ToastContainer position="top-center" />

      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-full justify-around mb-4">
          <button onClick={onClickAdd(session)}>
            <Image src="/pictos/ajouter.png" width={40} height={40} alt="add" />
          </button>
          <button onClick={handleSubmitFavourite(session)}>
            {myMovie[0].favourite ? (
              <Image
                src="/pictos/coeur.png"
                width={30}
                height={30}
                alt="liked"
              />
            ) : (
              <Image
                src="/pictos/coeur-noir.png"
                width={30}
                height={30}
                alt="not liked"
              />
            )}
          </button>
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={200}
          height={300}
          alt={movie.title}
        />

        <h2>{movie.title}</h2>
        <p>by {director[0].name}</p>
        <p>{releaseDate(movie.release_date)}</p>
        <div className="flex w-full justify-between">
          {movie.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <p className="text-center">{movie.overview}</p>
        <p>{movie.vote_average}</p>
        <Modal isShowing={isShowing} hide={toggle} title="Ajouter à ma liste">
          <div className="flex flex-col space-y-5">
            <button
              onClick={() => {
                handleSubmitMovieList(idToNumber, true, false);
              }}
            >
              A Voir
            </button>
            <button
              onClick={() => {
                handleSubmitMovieList(idToNumber, false, false);
              }}
            >
              Déjà vu
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Movie;
