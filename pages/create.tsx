// pages/create.tsx

import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useQuery } from "@tanstack/react-query";
import { directorFetcher, genreFetcher, moviePost } from "../utils/fetcher";
import Image from "next/image";
import { Director, Genre } from "@prisma/client";

const AddAMovie: React.FC = () => {
  const {
    data: directors,
    error: directorsError,
    isLoading: directorsIsLoading,
  } = useQuery(["directors"], () => directorFetcher.getAll());

  const {
    data: genres,
    error: genresError,
    isLoading: genresIsLoading,
  } = useQuery(["genres"], () => genreFetcher.getAll());

  const [title, setTitle] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [genreId, setGenreId] = useState("");
  const [year, setYear] = useState(null);
  const [seen, setSeen] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const dataSubmitted = await moviePost.post(
        title,
        directorId,
        genreId,
        year,
        seen
      );
      console.log(dataSubmitted);
    } catch (error) {
      console.error(error);
    }
  };

  if (directorsIsLoading || genresIsLoading) {
    return (
      <Image
        src="/pictos/waiting.png"
        width={50}
        height={50}
        alt="Loading..."
      />
    );
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Movie</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <div className="flex flex-col space-y-2">
            <label>Choose a director</label>
            <select className="w-full p-2 rounded-md border-2 border-gray-300 bg-white">
              {directors.map((director: Director) => (
                <option key={director.id}>{director.name}</option>
              ))}
            </select>
            <label>Choose a genre</label>
            <select className="w-full p-2 rounded-md border-2 border-gray-300 bg-white">
              {genres.map((genre: Genre) => (
                <option key={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
          {/* <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          /> */}
          <input disabled={!title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
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
