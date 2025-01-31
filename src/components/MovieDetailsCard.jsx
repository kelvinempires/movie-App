/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { options } from "../services/omdbApi";

const MovieDetailsCard = ({
  title,
  name,
  // poster_path,
  // overview,
  movie,
  // release_date,
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

  const [cast, setCast] = useState([]);
  const [hover, setHover] = useState({ index: null, show: false });

  useEffect(() => {
    const fetchCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movie?.id}/credits`;
      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast.slice(0, 5));
        console.log(response.data.cast.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCast();
  }, [movie?.id, setCast]);
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
          <div className="flex flex-row gap-10">
            <div >
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
            {/* Cast members */}
            <div className="flex flex-wrap gap-1 relative">
              <span className="text-white font-semibold font-oswald flex flex-wrap ">
                Casts:
              </span>
              <span>
                {cast?.map((actor, index) => (
                  <div key={actor.id} className="inline space-x-6 ">
                    <span
                      className="cursor-pointer hover:underline inline-flex mr-1 flex-nowrap"
                      onMouseEnter={() => setHover({ index, show: true })}
                      onMouseLeave={() =>
                        setHover({ index: null, show: false })
                      }
                    >
                      {actor.name}
                      {index !== cast.length - 1 ? ", " : ""}
                      {hover.index === index && hover.show && (
                        <span className="backdrop-blur-sm bg-white/30 text-white flex flex-col items-center justify-center rounded-2xl min-w-24 min-h-24 w-fit font-semibold absolute top-[-6.5rem]">
                          <img
                            className="h-16 w-16 object-cover rounded-full animate-bounce"
                            src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`}
                          />
                          <p className=""> {actor.character}</p>
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </span>
            </div>
            {/* <div>
              <h2 className="text-white">Cast:</h2>
              <div className="flex flex-col">
                {cast?.map((actor, index) => (
                  <>
                    <span
                      onMouseEnter={() => setHover({ index, show: true })}
                      onMouseLeave={() => setHover({ index, show: false })}
                      key={actor.id}
                      className="text-zinc-400 text-sm mr-2 relative after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-[#0092dd] via-[rgb(132,193,37)] to-[#d9241b] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full hover:after:left-0 cursor-pointer"
                    >
                      {actor.name}
                      {index !== cast.length - 1 && ","}
                    </span>
                  </>
                ))}
              </div>
            </div> */}
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
              className="mb-10 bg-zinc-300 border text-black text-sm flex items-center gap-2 px-10 py-2 rounded-lg mt-4 hover:bg-zinc-400 hover:text-white hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:scale-105"
            >
              Watch Now
            </Link>
            {/* <button className="border text-zinc-400 flex items-center gap-2 px-14 py-2 rounded-lg mt-4 hover:bg-zinc-400 hover:text-black hover:shadow-lg hover:transition-all hover:duration-300 hover:ease-in-out hover:transform hover:scale-105">
              Trailer
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
