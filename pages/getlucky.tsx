import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import MovieCard from "../components/MovieCard";
import { MovieProps } from "../utils/globalTypes";
import { Montaga } from "@next/font/google";

export default function GetLucky() {
  const [randomMovie, setRandomMovie] = useState<MovieProps>();
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
        {/* {error && <p>{error}</p>} */}
        {error ? (
          <p>{errors[Math.floor(Math.random() * errors.length)]}</p>
        ) : (
          <>
            {randomMovie ? (
              <div>
                <h2>{randomMovie.title}</h2>
                <p>{randomMovie.overview}</p>
                {/* Affichez d'autres détails du film si nécessaire */}
              </div>
            ) : (
              <p>Chargement en cours...</p>
            )}
          </>
        )}
      </div>
      {/* <div>
        {error ? (
          <p>{error}</p>
        ) : randomMovie ? (
          <MovieCard movie={randomMovie} />
        ) : (
          <p>Chargement</p>
        )}
      </div>
      {randomMovie !== undefined && (
        <div className="w-fit  mx-auto">
          <p className="text-white">sdfsdf</p>
          {error ? (
            <p className="text-white">{error}</p>
          ) : (
            <MovieCard movie={randomMovie} />
          )}
        </div>
      )} */}
    </div>
  );
}
