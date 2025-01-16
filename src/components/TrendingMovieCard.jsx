/* eslint-disable react/prop-types */
const TrendingMovieCard = ({ movie }) => {
  console.log(movie);
  return (
    <div className=" bg-red-600 w-[65rem] text-[#e2e2e2] rounded-xl p-5">
      <img
        src={movie.poster}
        className="w-full object-cover h-[35rem]"
        alt=""
      />
      {movie?.title}
    </div>
  );
};

export default TrendingMovieCard;
