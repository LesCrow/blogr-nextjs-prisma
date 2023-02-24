import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getMovieByApiId, movieFetcher } from "../utils/fetcher";
import { ToastContainer, toast } from "react-toastify";
import useModal from "./modal/UseModal";
import Modal from "./modal/Modal";

type TMyMovie = {
  id: string;
  api_id: number;
  already_seen: boolean;
  favourite: boolean;
};

export default function AddAmovie() {
  const router = useRouter();
  const { id } = router.query;
  const idToNumber = parseInt(id as string);
  const { data: session, status } = useSession();

  const notify = () => toast("Veuillez vous connectez");
  const { isShowing, toggle } = useModal();
  const [data, setData] = useState<TMyMovie[]>([]);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const {
    data: myMovie,
    error: myMovieError,
    isLoading: myMovieIsLoading,
  } = useQuery<TMyMovie[]>(
    ["myMovie"],
    async () => await getMovieByApiId.getOne(idToNumber)
  );

  useEffect(() => {
    if (myMovie) {
      setData(myMovie);
    }
  }, [myMovie]);

  if (myMovieIsLoading) {
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
    movieFetcher.post(id, alreadySeen, favourite);
  };

  const handleSubmitFavourite = (id: string, favourite: boolean) => {
    movieFetcher.update(id, favourite);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="w-[50%] flex items-center justify-between">
        <button onClick={onClickAdd(session)}>
          <Image src="/pictos/ajouter.png" width={40} height={40} alt="add" />
        </button>
        <button
          onClick={() => {
            setIsFavourite(!isFavourite);
            handleSubmitFavourite(myMovie[0].id, isFavourite);
          }}
        >
          {myMovie[0] !== undefined && myMovie[0].favourite ? (
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
            <button
              className="text-black"
              onClick={() => {
                handleSubmitMovieList(idToNumber, true, false);
              }}
            >
              A Voir
            </button>
            <button
              className="text-black"
              onClick={() => {
                handleSubmitMovieList(idToNumber, false, false);
              }}
            >
              Déjà vu
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
