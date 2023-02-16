import React from "react";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { MovieProps } from "../../utils/globalTypes";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      director: {
        select: { name: true },
      },
    },
  });
  return {
    props: JSON.parse(JSON.stringify(movie)),
  };
};

const Movie: React.FC<MovieProps> = (props) => {
  const releaseDateToDateFormat = new Date(props.year);
  const releaseDate = props.year
    ? releaseDateToDateFormat.getFullYear()
    : "Unknown date";
  const alreadySeen = props.seen ? "Already seen" : "To watch";

  return (
    <Layout>
      <div>
        <h2>
          {props.title} ({alreadySeen})
        </h2>
        <p>By {props.director.name || "Unknown author"}</p>
        <p>{releaseDate}</p>
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
