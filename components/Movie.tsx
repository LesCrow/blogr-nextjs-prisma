import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type MovieProps = {
  id: string;
  title: string;
  director: {
    name: string;
  } | null;
  genre: {
    name: string;
  } | null;
  year: Date;
  seen: boolean;
};

const Movie: React.FC<{ movie: MovieProps }> = ({ movie }) => {
  const directorName = movie.director ? movie.director.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${movie.id}`)}>
      <h2>{movie.title}</h2>
      <small>By {directorName}</small>
      <ReactMarkdown children={movie.title} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Movie;
