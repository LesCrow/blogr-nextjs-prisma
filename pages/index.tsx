import React, { useEffect, useState } from "react";
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
import MovieList from "../components/MovieList";

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

  const OnSubmit = (data: any) => {
    setQuery(data.query);
  };

  return (
    <Layout>
      <main className={`w-[90%] mx-auto ${roboto.className}`}>
        <Image
          src="/pictos/logo.png"
          width={400}
          height={100}
          alt="MOOOVIES"
          className="mx-auto "
        />
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(OnSubmit)}
        >
          <input
            className="rounded-full h-8 px-4 text-center text-black border border-black"
            placeholder="Recherchez..."
            {...register("query")}
          />
          <button
            className="bg-[#292E35] text-secondary rounded-full w-fit px-6 py-1 mx-auto"
            type="submit"
          >
            Search
          </button>
        </form>

        {query === "" ? (
          <div className="mt-10">
            <h1 className="w-fit mb-6 mx-auto text-2xl text-primary">
              Les mieux notés
            </h1>
            <div className="flex flex-wrap justify-between w-full">
              {moviesTopRated.results.map((movie: MovieProps) => (
                <Link href={`p/${movie.id}`} key={movie.id}>
                  <MovieList key={movie.id} movie={movie} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div className="flex flex-wrap justify-between w-full">
              {movies.results.map((movie: MovieProps) => (
                <Link href={`p/${movie.id}`} key={movie.id}>
                  <MovieList key={movie.id} movie={movie} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {session ? (
          <>
            <div className="flex flex-wrap justify-between w-full">
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
