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

  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.querySelector(".overflow-x-hidden");
      container.scrollBy({
        left: container.clientWidth,
        behavior: "smooth",
      });
    }, 5000); // Autoscroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (direction) => {
    const container = document.querySelector(".overflow-x-hidden");
    const scrollAmount = container.clientWidth;

    if (direction === "left") {
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
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
    <div className="relative overflow-hidden">
      <div
        className="overflow-x-scroll scroll-smooth mt-24 px-14"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Trending Movies"
        role="region"
      >
        <div
          className="flex justify-around w-fit gap-20 drop-shadow-xl"
          onWheel={(e) => {
            e.preventDefault();
            handleScroll(e.deltaY > 0 ? "right" : "left");
          }}
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
        <style>
          {`
            @media (max-width: 768px) {
              .grid {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                grid-auto-rows: auto;
              }
            }
            .loading-placeholder {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 20px;
            }
            .movie-card-placeholder {
              width: 100px;
              height: 150px;
              background: #e0e0e0;
              border-radius: 8px;
            }
            .shimmer {
              animation: shimmer 1.5s infinite;
              background: linear-gradient(
                90deg,
                #f0f0f0 25%,
                #e0e0e0 50%,
                #f0f0f0 75%
              );
              background-size: 200% 100%;
            }
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            .error-state {
              text-align: center;
              margin-top: 50px;
            }
            .error-state button {
              background: #007bff;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
            }
          `}
          
        </style>
      </div>
    </div>
  );
};

export default Home;
