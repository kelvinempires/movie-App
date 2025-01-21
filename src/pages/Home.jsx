

import { useEffect, useState } from "react";
import TrendingMovieCard from "../components/TrendingMovieCard";
<<<<<<< HEAD
// import { trendingMoviesData } from "../data/data";
// import { fetchAllMovies, options } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { options } from "../services/omdbApi";
=======
import { trendingMoviesData } from "../data/data";
import { fetchAllMovies, options } from "../services/omdbApi";
import MovieCard from "../components/MovieCard";
import axios from "axios";
>>>>>>> 6a40dfc0789daf71ed49b8faf1ede875d61a091b

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    const trendingMoviesUrl =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      const moviesUrl = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;
   
=======
    const trendingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
    const moviesUrl = `https://api.themoviedb.org/3/trending/all/week?language=en-US`;

>>>>>>> 6a40dfc0789daf71ed49b8faf1ede875d61a091b
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(trendingMoviesUrl, options);
        console.log(response.data.results);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get(moviesUrl, options);
        console.log(response.data.results);
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllMovies();
<<<<<<< HEAD
    fetchTrendingMovies();
=======
    fetchTrendingMovies(); // Call the fetch function to get the data
>>>>>>> 6a40dfc0789daf71ed49b8faf1ede875d61a091b
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
    <div className="relative overflow-hidden  ml-56 mt-20">
      <div
        className="w-full overflow-x-hidden scroll-smooth mt-5 "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="flex justify-around w-fit gap-20 drop-shadow-xl px-10"
          onWheel={(e) => e.preventDefault()}
          onScroll={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          {trendingMovies?.map((movie) => (
            <TrendingMovieCard
              key={movie.id}
              movie={movie}
              handleScroll={handleScroll}
            />
          ))}
        </div>
      </div>

      <div className="px-8 mt-8">
        <h2>Trending</h2>
        <div className="grid grid-cols-5 place-items-center my-8 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
