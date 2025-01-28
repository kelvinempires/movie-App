/* eslint-disable react/prop-types */

import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Movie2Card = ({ movie, loading }) => {
  console.log(movie);
  return (
    <>
      {loading ? (
        <Skeleton containerClassName="animate-pulse h-64 bg-slate-800 rounded-lg" />
      ) : (
        <Link
          // to={`/movie/${movie.id}`}
          to={
            movie?.media_type === "movie"
              ? `/movie/${movie.id}`
              : `/tv/${movie.id}`
          }
          className="flex flex-col w-36 items-center hover:cursor-pointer  rounded-lg"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-32 h-48 object-cover rounded-lg"
            alt=""
          />
          <div className="flex flex-col text-sm">
            <h2 className=" font-bold">{movie.title || movie.name}</h2>
            <span className="text-xs text-slate-200">
              {movie.vote_average} | {movie.release_date || "N/A"}
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default Movie2Card;
