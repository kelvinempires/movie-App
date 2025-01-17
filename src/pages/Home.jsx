import { useEffect, useState } from "react";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { trendingMoviesData } from "../data/data";
import { fetchAllMovies } from "../services/omdbApi";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchAllMovies();
      console.log(movies);
      setMovies(movies.Search);
      console.log(movies.Search);
    };

    fetchMovies();

    setTrendingMovies(trendingMoviesData);
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

  return (
    <div className="relative overflow-hidden">
      <div
        className="w-full overflow-x-hidden scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="flex justify-around w-fit gap-20 px-10"
          onWheel={(e) => e.preventDefault()}
          onScroll={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {trendingMovies?.map((movie) => (
            <TrendingMovieCard
              key={movie.title}
              movie={movie}
              handleScroll={handleScroll}
            />
          ))}
        </div>
      </div>
      

      <div className="px-8 mt-8">
        <h2>Trending</h2>
        <div className="grid grid-cols-4 mt-8 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="flex gap-4">
              <img src={movie.Poster} className="h-80" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
