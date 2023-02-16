import React from "react";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Movie, { MovieProps } from "../components/Movie";
import { useSession } from "next-auth/react";

export const getStaticProps: GetStaticProps = async () => {
  const movies = await prisma.movie.findMany({
    include: {
      director: {
        select: { name: true },
      },
    },
  });

  return {
    props: { movies: JSON.parse(JSON.stringify(movies)) },
    revalidate: 10,
  };
};

type Props = {
  movies: MovieProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  return (
    <Layout>
      <main className="">
        <h1 className="text-center">MOOOVIES</h1>
        {session ? (
          <>
            <h1>Movie List</h1>

            {props.movies.map((movie) => (
              <div key={movie.id} className="bg-white mt-4">
                <Movie movie={movie} />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </main>
    </Layout>
  );
};

export default Blog;
