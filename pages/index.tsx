import React, { useState } from "react";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Movie as TMovie } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { movieFetcherByString } from "../utils/tmdbFetcher";
import Router from "next/router";
import { MovieProps } from "../utils/globalTypes";

// export const getStaticProps: GetStaticProps = async () => {
//   const movies = await prisma.movie.findMany();

//   return {
//     props: { movies: JSON.parse(JSON.stringify(movies)) },
//     revalidate: 10,
//   };
// };

type Props = {
  movies: TMovie[];
};

const Movies: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm();
  const [query, setQuery] = useState("forrest+gump");
  const OnSubmit = (data: any) => {
    setQuery(data.query);
  };

  const {
    data: movies,
    error: moviesError,
    isLoading: moviesIsLoading,
  } = useQuery(["movies"], () => movieFetcherByString.getOne(query));

  if (moviesIsLoading) {
    return <div>Loading....</div>;
  }

  return (
    <Layout>
      <main className="">
        <h1 className="text-center">MOOOVIES</h1>
        {session ? (
          <>
            <div className="flex justify-between">
              <Link href="/create">Add a movie</Link>
            </div>
            <form onSubmit={handleSubmit(OnSubmit)}>
              <input {...register("query")} />
              <input type="submit" />
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
            </form>
            {movies.results.map((movie: MovieProps) => (
              <Link href={`p/${movie.id}`} key={movie.id}>
                <p>{movie.title} </p>
              </Link>
            ))}
          </>
        ) : (
          <></>
        )}
      </main>
    </Layout>
  );
};

export default Movies;
