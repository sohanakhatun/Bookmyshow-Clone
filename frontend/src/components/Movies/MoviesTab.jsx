import { FilmIcon } from "lucide-react";
import { Button } from "../ui/button";
import MovieCard from "./MovieCard";
const EventsTab = ({ list }) => {
  return (
    <>
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-gray-50 border border-dashed border-gray-300 mx-4 my-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <FilmIcon className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No movies booked yet
          </h2>
          <p className="text-gray-600 max-w-sm">
            Your booked movies will appear here
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default EventsTab;
