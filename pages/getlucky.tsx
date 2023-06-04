import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import MovieCard from "../components/MovieCard";
import { MovieProps } from "../utils/globalTypes";
import { Montaga } from "@next/font/google";
import Link from "next/link";

export default function GetLucky() {
  const [randomMovie, setRandomMovie] = useState<MovieProps>(null);
  const [error, setError] = useState(false);
  const errors = [
    "Et si tu lisais un livre aujourd'hui ?",
    "Regarde comment il fait beau dehors, c'est l'heure pour aller jouer !",
    "test 3",
    "test 4",
  ];

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  // 890,226

  const getRandomMovie = async (randomId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${randomId}?api_key=${process.env.NEXT_PUBLIC_APIKEY}&append_to_response=credits&language=fr-FR`
      );
      const movieData = response.data;
      if (response.status == 200) {
        setError(false);
      }
      setRandomMovie(movieData);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la récupération du film aléatoire.",
        error
      );
      setError(true);
      setRandomMovie(null);
    }
  };

  return (
    <div>
      <div className=" ">
        <Button
          content="GET LUCKY"
          handleClick={() => getRandomMovie(getRandomInt(1, 1000))}
          style={"flex my-10 hover:text-secondary"}
        />
      </div>
      <div>
        {error && (
          <p className="w-fit mx-auto">
            {errors[Math.floor(Math.random() * errors.length)]}
          </p>
        )}
        {randomMovie && (
          <div className="w-fit mx-auto">
            <Link href={`p/${randomMovie.id}`} key={randomMovie.id}>
              <MovieCard movie={randomMovie} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
