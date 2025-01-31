import { useEffect, useState } from "react";
import TrendingMovieCard from "../components/TrendingMovieCard";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { options } from "../services/omdbApi";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingResponse, moviesResponse] = await Promise.all([
          axios.get(
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
            options
          ),
          axios.get(
            "https://api.themoviedb.org/3/trending/all/week?language=en-US",
            options
          ),
        ]);

        setTrendingMovies(trendingResponse.data.results);
        setMovies(moviesResponse.data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleScroll = (direction) => {
    const element = document.getElementById("scrollable-element");
    const scrollAmount = direction === "left" ? -200 : 200;

    element.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="loading-placeholder">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="movie-card-placeholder shimmer"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="text relative overflow-hidden">
      <div
        className="overflow-x-scroll scroll-smooth mt-8 md:mt-24 px-4 md:px-14"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Trending Movies"
        role="region"
      >
        <div
          id="scrollable-element"
          className="flex justify-around gap-4 md:gap-20 drop-shadow-xl w-max"
        >
          {trendingMovies.map((movie) => (
            <TrendingMovieCard
              key={movie.id}
              movie={movie}
              handleScroll={handleScroll}
            />
          ))}
        </div>
      </div>

      <div className="px-4 md:px-8 mt-8">
        <h2 className="text-lg md:text-2xl font-bold">Trending</h2>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center my-8 gap-4"
          aria-label="All Movies"
          aria-live="polite"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
