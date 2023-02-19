// pages/create.tsx

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { movieById, movieFetcherByString } from "../utils/tmdbFetcher";
import Movie from "../components/Movie";
import { MovieProps } from "../utils/globalTypes";
import Link from "next/link";

const AddAMovie: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("et");
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
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default AddAMovie;
