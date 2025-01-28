/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MovieDetailsCard = ({
  title,
  name,
  poster_path,
  overview,
  movie,
  release_date,
  vote_average,
}) => {
  const getStars = (vote) => {
    const stars = [];
    const full = Math.floor(vote / 2);
    const half = vote % 2 >= 1 ? 1 : 0;
    const empty = 5 - full - half;
    for (let i = 0; i < full; i++) stars.push("★");
    if (half) stars.push("☆");
    for (let j = 0; j < empty; j++) stars.push("✩");
    return stars.join("");
  };

  console.log(movie);
  return (
    <div className="relative top-10 w-full lg:w-11/12 p-12 z-10">
      <div className="md:flex md:space-x-6">
        <img
          className="rounded-lg shadow-lg w-auto md:w-48"
          src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={title || name}
        />
        <div className="mt-4 md:mt-0 text-zinc-400 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold">{title || name}</h1>
          <div className="flex gap-2 items-center mt-4">
            <span className="text-gray-300">Release Date: </span>
            <span className="text-sm">{movie?.release_date}</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-semibold mt-4 text-white">
            Overview
          </h2>
          <p className="text-lg leading-relaxed flex-wrap">{movie?.overview}</p>
          <div className="flex flex-row">
            <div className="mr-10">
              <h1 className="text-white">Genres:</h1>
              <div className="flex flex-wrap">
                {movie?.genres.map((genre) => (
                  <span key={genre.id} className="text-zinc-400 text-sm mr-2">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div>
                <h2 className="text-white">Country:</h2>
                <div className="flex flex-wrap">
                  {movie?.production_countries.map((country) => (
                    <span
                      key={country.iso_3166_1}
                      className="text-zinc-400 text-sm mr-2"
                    >
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-yellow-500 mr-2">
              {getStars(vote_average)}
            </span>
            <span className="text-gray-300 ml-1">{vote_average}</span>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              to={
                movie?.seasons
                  ? `/watch-tv/${movie?.id}`
                  : `/watch-movie/${movie?.id}`
              }
              className="bg-zinc-300 border text-black text-sm flex items-center gap-2 px-10 py-2 rounded-lg mt-4 hover:bg-zinc-400 hover:text-white hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:scale-105"
            >
              Watch Now
            </Link>
            <button className="border text-zinc-400 flex items-center gap-2 px-14 py-2 rounded-lg mt-4 hover:bg-zinc-400 hover:text-black hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:scale-105">
              Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
