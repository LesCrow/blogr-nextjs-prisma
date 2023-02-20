import React, { useState } from "react";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Movie as TMovie } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { movieByString, moviesByTopRated } from "../utils/tmdbFetcher";
import { MovieProps } from "../utils/globalTypes";
import Image from "next/image";
import { Roboto } from "@next/font/google";

// export const getStaticProps: GetStaticProps = async () => {
//   const movies = await prisma.movie.findMany();

//   return {
//     props: { movies: JSON.parse(JSON.stringify(movies)) },
//     revalidate: 10,
//   };
// };
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  movies: TMovie[];
};
type arrayMovieProps = {
  results: [MovieProps];
};

const Movies: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm();
  const [query, setQuery] = useState("");
  const OnSubmit = (data: any) => {
    setQuery(data.query);
  };

  const {
    data: moviesTopRated,
    error: moviesTopRatedError,
    isLoading: moviesTopeRatedIsLoading,
  } = useQuery<arrayMovieProps>(["moviesTopRated"], () =>
    moviesByTopRated.getAll()
  );

  const {
    data: movies,
    error: moviesError,
    isLoading: moviesIsLoading,
  } = useQuery<arrayMovieProps>(["movies"], () => movieByString.getOne(query));

  if (moviesIsLoading || moviesTopeRatedIsLoading) {
    return <div>Loading....</div>;
  }
  console.log(moviesTopRated);

  return (
    <Layout>
      <main className={roboto.className}>
        <Image src="/pictos/logo.png" width={400} height={100} alt="MOOOVIES" />
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <input className="rounded-full h-8 px-4" {...register("query")} />
          <button
            className="border border-blue-600 bg-blue-400 text-white rounded-full w-fit px-4 py-1 mx-auto"
            type="submit"
          >
            Search
          </button>
        </form>
        {query === "" ? (
          <div className="pt-6">
            {moviesTopRated.results.map((movie: MovieProps) => (
              <Link href={`p/${movie.id}`} key={movie.id}>
                <div className="flex justify-between">
                  <p className="w-[80%]">{movie.title} </p>
                  <small>{movie.vote_average}</small>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="pt-6">
            {movies.results.map((movie: MovieProps) => (
              <Link href={`p/${movie.id}`} key={movie.id}>
                <p>{movie.title} </p>
              </Link>
            ))}
          </div>
        )}

        {session ? (
          <>
            <div className="flex justify-between">
              <Link href="/mymovies">My movie list</Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </Layout>
  );
};

export default Movies;
