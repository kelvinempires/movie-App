import { useState, useEffect, useCallback } from "react";
import {
  FaPlay,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { useSwipeable } from "react-swipeable";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TrendingSlider = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index) => {
      const newIndex = (index + movies.length) % movies.length;
      setCurrentSlide(newIndex);
    },
    [movies]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => goToSlide(currentSlide + 1),
    onSwipedRight: () => goToSlide(currentSlide - 1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (isPaused || movies.length === 0) return;
    const interval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused, goToSlide, movies.length]);

  if (movies.length === 0) {
    return (
      <div className="relative w-full min-h-[32rem] flex items-center justify-center bg-gray-900 text-white">
        <p>No trending movies available at the moment.</p>
      </div>
    );
  }

  const currentMovie = movies[currentSlide];
  const genres = currentMovie.genres || [];
  const releaseYear = currentMovie.release_date
    ? currentMovie.release_date.split("-")[0]
    : "";
  const language = currentMovie.original_language
    ? currentMovie.original_language.toUpperCase()
    : "";

  return (
    <div
      {...handlers}
      className="relative w-full min-h-[32rem] overflow-hidden shadow-2xl mt-15 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Trending movies carousel"
      aria-live="polite"
    >
      {movies.map((movie, index) => (
        <div
          key={`${movie.id}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          {index === currentSlide && (
            <>
              <div className="absolute top-4 left-5 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold flex items-center gap-1">
                  NOW TRENDING 
                </span>
                <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium">
                  {movie.vote_average.toFixed(1)} ★
                </span>
              </div>

              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : "/placeholder-backdrop.jpg"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
                loading={index === currentSlide ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-16 text-white z-20">
                <div className="mb-4">
                  <span className="text-yellow-400 text-sm font-semibold">
                    {releaseYear} • {language}
                  </span>
                  <h2 className="font-playfair text-3xl md:text-5xl font-bold mt-1">
                    {movie.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre.id}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-md md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3">
                  {movie.overview}
                </p>

                <div className="mt-5 flex gap-4 items-center">
                  <Link
                    to={
                      movie?.seasons
                        ? `/watch-tv/${movie?.id}`
                        : `/watch-movie/${movie?.id}`
                    }
                    className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-yellow-400/30"
                  >
                    <FaPlay />
                    Watch Now
                  </Link>
                  <button className="flex items-center gap-2 bg-gray-500/20 hover:bg-gray-500/30 border border-white text-white font-bold px-6 py-3 rounded-xl transition-all transform hover:scale-105">
                    <FaYoutube />
                    Trailer
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <button
        onClick={() => goToSlide(currentSlide - 1)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-30 hidden md:group-hover:block"
        aria-label="Previous movie"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => goToSlide(currentSlide + 1)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition z-30 hidden md:group-hover:block"
        aria-label="Next movie"
      >
        <FaChevronRight />
      </button>

      <div className="hidden sm:flex sm:absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {movies.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-6 scale-110"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

TrendingSlider.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string,
      vote_average: PropTypes.number.isRequired,
      release_date: PropTypes.string,
      original_language: PropTypes.string,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
      seasons: PropTypes.array,
    })
  ).isRequired,
};

export default TrendingSlider;
