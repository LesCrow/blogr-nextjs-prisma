import React from "react";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Movie, { MovieProps } from "../components/Movie";

export const getStaticProps: GetStaticProps = async () => {
  const movies = await prisma.movie.findMany({
    include: {
      director: {
        select: { name: true },
      },
    },
  });

  return {
    props: { movies },
    revalidate: 10,
  };
};

type Props = {
  movies: MovieProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Movie List</h1>
        <main>
          {props.movies.map((movie) => (
            <div key={movie.id} className="movie">
              <Movie movie={movie} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .movie {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .movie:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .movie + .movie {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
