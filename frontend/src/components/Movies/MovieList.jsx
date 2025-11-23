import { Link } from "react-router-dom";
import { useMovieContext } from "../../Context/MovieContext";
import MovieCard from "./MovieCard";
import { MapPinOff } from "lucide-react";

const MovieList = () => {
  const { movies, error, movieSearchResults , query} = useMovieContext();

  if (error || movies.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-gray-50 border border-dashed border-gray-300 mx-4 my-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <MapPinOff className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No movies available
        </h2>
        <p className="text-gray-600 max-w-sm">
          Please change your{" "}
          <span className="font-medium text-red-500">location</span>
          <span> to view the movies available in your area.</span>
        </p>
      </div>
    );
  }

  const isSearching = query?.trim()?.length > 0;
  const noResults = isSearching && movieSearchResults.length === 0;

  if (noResults) {
    return (
      <div className="flex flex-col h-screen items-center justify-center text-center py-20">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          No matching movies
        </h2>
        <p className="text-gray-600">Try searching for something else.</p>
      </div>
    );
  }

  const listToRender =
    isSearching && movieSearchResults.length > 0 ? movieSearchResults : movies;

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {listToRender.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
