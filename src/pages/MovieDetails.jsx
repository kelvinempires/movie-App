import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { options } from "../services/omdbApi";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      try {
        const response = await axios.get(url, options);
        setMovie(response.data);

        // Fetching recommendations
        const recUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`;
        const recResponse = await axios.get(recUrl, options);
        setRecommendations(recResponse.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const {
    backdrop_path,
    poster_path,
    title,
    name,
    overview,
    vote_average,
    release_date,
  } = movie;

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

  return (
    <div className="relative flex flex-col items-center w-full h-full">
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-fixed bg-opacity-50"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
      <div className="relative top-10 w-full lg:w-11/12 p-12 z-10">
        <div className="md:flex md:space-x-6">
          <img
            className="rounded-lg shadow-lg w-auto md:w-48"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title || name}
          />
          <div className="mt-4 md:mt-0 text-zinc-400 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold">{title || name}</h1>
            <p className="text-gray-300 mt-2">Release Date: {release_date}</p>
            <p className="mt-4 text-lg leading-relaxed flex-wrap">{overview}</p>
            <div className="mt-4 flex items-center">
              {" "}
              <span className="text-yellow-500 mr-2">
                {getStars(vote_average)}
              </span>{" "}
              <span className="text-gray-300 ml-1">{vote_average}</span>{" "}
            </div>
            <div className="flex gap-4 items-center">
              <button className="bg-zinc-300 border text-black text-sm flex items-center gap-2 px-10 py-2 rounded-lg mt-4">
                Watch Now
              </button>
              <button className="border text-zinc-400 flex items-center gap-2 px-14 py-2 rounded-lg mt-4">
                Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full lg:w-11/12 z-10">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4 text-white">
          Recommended for You
        </h2>
        <div className="flex overflow-x-scroll hide-scroll-bar pb-6 min-h-0">
          <button className="previous-button absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full"></button>
          <div className="flex flex-nowrap space-x-0">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex flex-col items-center  w-36 "
              >
                <img
                  className="w-32 h-48 object-cover rounded-lg"
                  src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                  alt={rec.title || rec.name}
                />
                {/* <h3 className="text-lg font-medium text-white text-center">
                  {rec.title || rec.name}
                </h3> */}
              </div>
            ))}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
