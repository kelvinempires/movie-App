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
        className="overflow-x-scroll scroll-smooth mt-24 px-14"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Trending Movies"
        role="region"
      >
        <div
          className="flex justify-around w-fit gap-20 drop-shadow-xl"
        >
          {trendingMovies.map((movie) => (
            <TrendingMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      <div className="px-8 mt-8">
        <h2>Trending</h2>
        <div
          className="grid grid-cols-5 place-items-center my-8 gap-4"
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
