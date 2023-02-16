import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { MovieProps } from "../utils/globalTypes";

const Movie: React.FC<{ movie: MovieProps }> = ({ movie }) => {
  const directorName = movie.director ? movie.director.name : "Unknown author";
  const releaseDateToDateFormat = new Date(movie.year);
  const releaseDate = movie.year
    ? releaseDateToDateFormat.getFullYear()
    : "Unknown date";
  const alreadySeen = movie.seen ? "Already seen" : "To watch";

  return (
    <div
      className="p-6"
      onClick={() => Router.push("/p/[id]", `/p/${movie.id}`)}
    >
      <h2>{movie.title}</h2>
      <small>By {directorName}</small>
      <p>{releaseDate}</p>
      <p>{alreadySeen}</p>
      {/* <ReactMarkdown children={movie.title} /> */}
    </div>
  );
};

export default Movie;
