import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getMovieByApiId, movieFetcher } from "../utils/fetcher";
import { ToastContainer, toast } from "react-toastify";
import useModal from "./modal/UseModal";
import Modal from "./modal/Modal";
import { Movie } from "@prisma/client";
import ToWatch from "./ToWatch";
import AlreadySeen from "./AlreadySeen";

type Props = {
  myMovie: Movie[];
  isMovieInMyList: boolean;
};

export default function AddAmovie({ myMovie, isMovieInMyList }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const idToNumber = parseInt(id as string);
  const { data: session, status } = useSession();
  const { isShowing, toggle } = useModal();
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const notify = () => toast("Veuillez vous connectez");

  useEffect(() => {
    if (myMovie[0] !== undefined && myMovie[0].favourite) {
      setIsFavourite(true);
    }
  }, [myMovie]);

  const handleClickAddAMovie = (session: object) => {
    if (session) {
      return toggle;
    }
    return notify;
  };

  const handleSubmitMovieList = (
    api_id: number,
    alreadySeen: boolean,
    favourite: boolean
  ) => {
    movieFetcher.post(api_id, alreadySeen, favourite);
  };

  const handleSubmitUpdateMovieList = (
    id: string,
    alreadySeen: boolean,
    favourite: boolean
  ) => {
    movieFetcher.update(id, alreadySeen, favourite);
  };

  console.log("state :", isFavourite, "data:", myMovie[0].favourite);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="w-[50%] flex items-center justify-between">
        <button onClick={handleClickAddAMovie(session)}>
          <Image src="/pictos/ajouter.png" width={40} height={40} alt="add" />
        </button>

        <button
          onClick={() => {
            setIsFavourite(!isFavourite);
            if (myMovie.length === 0) {
              handleSubmitMovieList(idToNumber, true, true);
            } else {
              handleSubmitUpdateMovieList(
                myMovie[0].id,
                myMovie[0].alreadySeen,
                isFavourite
              );
            }
          }}
        >
          {myMovie[0] !== undefined && myMovie[0].favourite && isFavourite ? (
            <Image src="/pictos/coeur.png" width={30} height={30} alt="liked" />
          ) : (
            <Image
              src="/pictos/contour-en-forme-de-coeur-blanc.png"
              width={30}
              height={30}
              alt="not liked"
            />
          )}
        </button>
        <Modal isShowing={isShowing} hide={toggle} title="Ajouter à ma liste">
          <div className="flex flex-col space-y-5">
            <ToWatch myMovie={myMovie} isMovieInMyList={isMovieInMyList} />
            <AlreadySeen myMovie={myMovie} isMovieInMyList={isMovieInMyList} />
          </div>
        </Modal>
      </div>
    </>
  );
}
