import React from "react";
import Layout from "../../components/Layout";
import { DirectorProps, MovieProps } from "../../utils/globalTypes";
import { movieById } from "../../utils/tmdbFetcher";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { moviePost } from "../../utils/fetcher";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const {
//     data: movie,
//     error: movieError,
//     isLoading: movieIsLoading,
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//   } = useQuery(["movie"], () => movieById.getOne(150));
//   return {
//     props: { movie },
//   };
// };

const Movie: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const idToNumber = parseInt(id as string);

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useQuery<MovieProps>(["movie"], () => movieById.getOne(idToNumber));

  if (movieIsLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = () => {
    moviePost.post(idToNumber, false, false);
  };

  const director: DirectorProps[] = movie.credits.crew.filter(
    ({ job }) => job === "Director"
  );

  return (
    <Layout>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex w-full justify-around mb-4">
          <button onClick={handleSubmit}>Add to my movie list</button>
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          width={200}
          height={300}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p>by {director[0].name}</p>
        <p>{movie.release_date}</p>
        <div className="flex w-full justify-between">
          {movie.genres.map((genre) => (
            <p key={genre.id}>{genre.name}</p>
          ))}
        </div>
        <p className="text-center">{movie.overview}</p>
        <p>{movie.vote_average} / 10</p>

        {/* <ReactMarkdown children={props.title} /> */}
      </div>
    </Layout>
  );
};

export default Movie;
