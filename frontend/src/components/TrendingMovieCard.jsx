import {
  FaPlay,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TrendingMovieCard = ({ movie, handleScroll }) => {
  const genres = movie.genres || []; // Add a fallback for genres

  return (
    <div className="relative w-full md:w-[70rem] text-[#e2e2e2] p-4 md:p-0">
      <button className="absolute top-4 left-5 px-4 py-1 rounded-2xl bg-slate-200/20">
        Top Rated 🔥
      </button>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        className="w-full object-cover rounded-3xl h-[20rem] md:h-[30rem]"
        alt=""
      />

      <div className="absolute bottom-0 w-full p-4 flex flex-col md:flex-row items-start md:items-end justify-between">
        <div>
          <div className="flex gap-2 items-center">
            {genres.map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-slate-200/20 px-2 py-1 rounded-2xl"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-col items-start gap-3">
            <h2 className="text-xl md:text-3xl font-bold mt-2">
              {movie.title}
            </h2>
            <p className="text-sm w-full md:w-[50%]">{movie.overview}</p>
          </div>

          <div className="mt-4 flex gap-4 items-center *:rounded-2xl *:py-1 *:px-3">
            <Link
              to={
                movie?.seasons
                  ? `/watch-tv/${movie?.id}`
                  : `/watch-movie/${movie?.id}`
              }
              className="bg-white text-black flex items-center gap-2"
            >
              <FaPlay />
              Watch
            </Link>
            <button className="bg-gray-500/20 flex items-center gap-2 border border-white">
              <FaYoutube />
              Trailer
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0 *:bg-slate-300/40 *:rounded-full *:p-5 *:justify-between">
          <button onClick={() => handleScroll("left")}>
            <FaChevronLeft />
          </button>
          <button onClick={() => handleScroll("right")}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

TrendingMovieCard.propTypes = {
  movie: PropTypes.shape({
    backdrop_path: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    title: PropTypes.string,
    overview: PropTypes.string,
    seasons: PropTypes.array,
    id: PropTypes.number,
  }).isRequired,
  handleScroll: PropTypes.func.isRequired,
};

export default TrendingMovieCard;
