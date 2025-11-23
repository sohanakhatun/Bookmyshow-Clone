import React from "react";
import { useAuth } from "../../Context/AuthContext";
import MovieCard from "./MovieCard";
import { CameraIcon, FilmIcon, MoveIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function LikedMovies() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user?.likedMovies?.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
      {user?.likedMovies.length == 0 && (
        <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-gray-50 border border-dashed border-gray-300 mx-4 my-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <FilmIcon className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No movies liked yet
          </h2>
          <p className="text-gray-600 max-w-sm">
            Your Liked movies will appear here
          </p>
        </div>
      )}
    </div>
  );
}
