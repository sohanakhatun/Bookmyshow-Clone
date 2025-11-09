import { Link } from "react-router-dom";
import { useMovieContext } from "../../Context/MovieContext";
import MovieCard from "./MovieCard";
import { MapPinOff } from "lucide-react";

const MovieList = () => {
  const { movies , error} = useMovieContext();
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-gray-50 border border-dashed border-gray-300 mx-4 my-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <MapPinOff className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No movies available
        </h2>
        <p className="text-gray-600 max-w-sm">
          Please allow{" "}
          <span className="font-medium text-red-500">location permissions</span>
          <span> to view the movies available in your area.</span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {movies.map((movie) => (
        <Link to={`/movies/${movie.id}`}>
          <MovieCard key={movie.id} movie={movie} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
