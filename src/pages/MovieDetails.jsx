<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
=======
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
>>>>>>> 6a40dfc0789daf71ed49b8faf1ede875d61a091b
import { options } from "../services/omdbApi";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
      try {
        const response = await axios.get(url, options);
<<<<<<< HEAD
        console.log(response.data);
        setMovie(response.data);
=======
        setMovie(response.data);
        console.log(response.data);
>>>>>>> 6a40dfc0789daf71ed49b8faf1ede875d61a091b
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetails();
  }, [id]);

<<<<<<< HEAD
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

  return (
    <div className="flex flex-col items-center mt-28">
      <div className="w-full lg:w-3/4 xl:w-2/3">
        <img
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          alt={title || name}
        />
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
          <img
            className="w-32 md:w-48 object-cover rounded-lg shadow-lg"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title || name}
          />
          <div className="mt-4 md:mt-0">
            <h1 className="text-3xl font-bold">{title || name}</h1>
            <p className="text-sm text-gray-500 mt-2">
              Release Date: {release_date}
            </p>
            <p className="mt-4 text-lg text-gray-700">{overview}</p>
            <div className="mt-4 flex items-center">
              <span className="text-yellow-500 mr-2">★</span>
              <span className="text-gray-700">{vote_average}</span>
            </div>
          </div>
        </div>
      </div>
=======
  return (
    <div className="flex flex-col h-full items-center mt-10">
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt=""
      />
      <h1 className="text-2xl font-semibold" >{movie?.title}</h1>
>>>>>>> 6a40dfc0789daf71ed49b8faf1ede875d61a091b
    </div>
  );
};

export default MovieDetails;
