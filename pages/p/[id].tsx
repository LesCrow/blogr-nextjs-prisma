import React, { useEffect, useState } from "react";
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
import Button from "../../components/Button";
import { getMovieByApiId } from "../../utils/fetcher";

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
  alreadySeen: boolean;
  favourite: boolean;
};

const Movie: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const idToNumber = parseInt(id as string);
  const [isReadMore, setIsReadMore] = useState(true);

  const {
    data: movieDetails,
    isLoading: movieDetailsIsLoading,
    error: movieDetailsError,
  } = useQuery<MovieProps>(["movie"], () => movieById.getOne(idToNumber));

  const {
    data: myMovie,
    isLoading: myMovieIsLoading,
    error: myMovieError,
  } = useQuery<TMyMovie[]>(
    ["myMovie"],
    async () => await getMovieByApiId.getOne(idToNumber)
  );

  if (movieDetailsIsLoading || myMovieIsLoading) {
    return <div>Loading...</div>;
  }

  if (movieDetailsError || myMovieError) {
    return <div>An Error Occured</div>;
  }

  const director: DirectorProps[] = movieDetails.credits.crew.filter(
    ({ job }) => job === "Director"
  );

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-8 pb-8">
      {session && <AddAMovie myMovie={myMovie} />}

      <Image
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        width={200}
        height={300}
        alt={movieDetails.title}
      />
      <div className="w-[200px] space-y-4">
        <h2 className="text-3xl text-primary">{movieDetails.title}</h2>
        <p>by {director[0].name}</p>
        <div className="flex justify-between">
          <p>{releaseDate(movieDetails.release_date)}</p>
          <p>-</p>
          <p>{runtimeToHours(movieDetails.runtime)}</p>
        </div>
      </div>
      <div className="w-[80%] flex flex-wrap pt-4">
        {movieDetails.genres.map((genre) => (
          <Button key={genre.id} content={genre.name} style="text-secondary" />
        ))}
      </div>
      <p className="py-2 px-6">
        {isReadMore
          ? movieDetails.overview.slice(0, 150)
          : movieDetails.overview}
        <span className="cursor-pointer" onClick={toggleReadMore}>
          {isReadMore ? (
            <p className="text-secondary">...lire plus</p>
          ) : (
            <p className="text-secondary mt-4">Réduire</p>
          )}
        </span>
      </p>
      <div className="flex">
        <Image src="/pictos/star.png" width={20} height={20} alt="star" />
        <p className="ml-2">{movieDetails.vote_average}</p>
      </div>
      <div className="flex">
        <Image
          src="/pictos/people.png"
          width={20}
          height={20}
          alt="vote count"
        />
        <p className="ml-2">{movieDetails.vote_count}</p>
      </div>
    </div>
  );
};

export default Movie;
