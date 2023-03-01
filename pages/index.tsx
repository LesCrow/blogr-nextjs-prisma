import React, { useState } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { movieByString, moviesByTopRated } from "../utils/tmdbFetcher";
import { MovieProps } from "../utils/globalTypes";
import Image from "next/image";
import { Roboto } from "@next/font/google";
import MovieList from "../components/MovieCard";
import MovieCard from "../components/MovieCard";
import Button from "../components/Button";
import Loader from "../components/Loader";

// export const getStaticProps: GetStaticProps = async () => {
//   const movies = await prisma.movie.findMany();

//   return {
//     props: { movies },
//     revalidate: 10,
//   };
// };

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

type arrayMovieProps = {
  results: [MovieProps];
};

const Movies: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [queryString, setQueryString] = useState(undefined);

  const {
    data: moviesTopRated,
    isLoading: moviesTopeRatedIsLoading,
    error: moviesTopRatedError,
  } = useQuery<arrayMovieProps>(["moviesTopRated"], () =>
    moviesByTopRated.getAll()
  );

  const {
    data: moviesByQueryString,
    isLoading: moviesByQueryStringIsLoading,
    error: moviesByQueryStringError,
  } = useQuery(["movies", queryString], () =>
    movieByString.getAll(queryString)
  );

  if (moviesTopeRatedIsLoading || moviesByQueryStringIsLoading) {
    return <Loader />;
  }

  if (moviesTopRatedError || moviesByQueryStringError) {
    return <div>An Error Occurred</div>;
  }

  const onSubmit = (data: { query: string }) => {
    setQueryString(data.query);
  };

  return (
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="rounded-full h-8 px-4 text-center text-black border border-black"
          placeholder="Recherchez..."
          {...register("query")}
        />
        <Button content="Search" />
      </form>

      {queryString === undefined ? (
        <div className="mt-10">
          <h1 className="w-fit mb-6 mx-auto text-2xl text-primary">
            Les mieux notés
          </h1>
          <div className="flex flex-wrap justify-between w-full">
            {moviesTopRated.results.map((movie: MovieProps) => (
              <Link href={`p/${movie.id}`} key={movie.id}>
                <MovieCard key={movie.id} movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <div className="flex flex-wrap justify-between w-full">
            {moviesByQueryString.results.map((movie: MovieProps) => (
              <Link href={`p/${movie.id}`} key={movie.id}>
                <MovieList key={movie.id} movie={movie} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Movies;
