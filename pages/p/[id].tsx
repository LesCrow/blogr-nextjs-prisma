import React from "react";
import Layout from "../../components/Layout";
import { MovieProps } from "../../utils/globalTypes";
import {
  movieById,
  movieFetcherByString,
  moviePosterFetcher,
} from "../../utils/tmdbFetcher";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

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
  const { id } = router.query;
  const idToNumber = parseInt(id as string);

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useQuery(["movie"], () => movieById.getOne(idToNumber));

  if (movieIsLoading) {
    return <div>Loading...</div>;
  }
  console.log(movie);

  const director = movie.credits.crew.filter(({ job }) => job === "Director");

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={200}
          height={300}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p>by {director[0].name}</p>

        {/* <ReactMarkdown children={props.title} /> */}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Movie;
