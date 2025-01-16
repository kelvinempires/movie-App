import { useEffect, useState } from "react";
import { fetchAllMovies } from "../services/omdbApi";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { trendingMoviesData } from "../data/data";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    setTrendingMovies(trendingMoviesData);
    //dependencies array is empty, so this effect will only run once after the initial render
  }, []);

  return (
    <div className=" overflow-hidden">
      <div className="w-full overflow-x-scroll mx-5 ">
        <div className="flex  w-fit gap-32 ">
          {trendingMovies?.map((movie) => (
            <TrendingMovieCard key={movie.title} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
