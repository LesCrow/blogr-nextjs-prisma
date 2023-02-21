import React, { useState } from "react";
import Layout from "../../components/Layout";
import { DirectorProps, MovieProps } from "../../utils/globalTypes";
import { movieById } from "../../utils/tmdbFetcher";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { moviePost } from "../../utils/fetcher";
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

  if (movieIsLoading) {
    return <div>Loading...</div>;
  }

  console.log(session);

  // const handleSubmitList = (session: object) => {
  //   if (session) {
  //     moviePost.post(idToNumber, false, false);
  //   }
  //   return notify;
  // };
  // const handleSubmitAdd = (session: object) => {
  //   if (session) {
  //     return toggle;
  //   }
  //   return notify;
  // };

  const handleSubmitFavourite = (session: object) => {
    return notify;
  };

  const handleSubmitAlreadySeen = (session: object) => {
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
          <button onClick={toggle}>
            <Image src="/pictos/ajouter.png" width={40} height={40} alt="add" />
          </button>
          <button onClick={handleSubmitAlreadySeen(session)}>
            <Image
              src="/pictos/checkmark.png"
              width={40}
              height={40}
              alt="check"
            />
          </button>
          <button onClick={handleSubmitFavourite(session)}>
            <Image
              src="/pictos/coeur-noir.png"
              width={30}
              height={30}
              alt="not liked"
            />
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
        <Modal isShowing={isShowing} hide={toggle} title="select">
          <p>agfezgfdfsg</p>
        </Modal>
        {/* <ReactMarkdown children={props.title} /> */}
      </div>
    </Layout>
  );
};

export default Movie;
