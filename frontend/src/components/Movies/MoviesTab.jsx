import { Button } from "../ui/button";
import MovieCard from "./MovieCard";
const EventsTab = ({ list  }) => {
  return (
    <>
      {list.length === 0 ? (
        <div className="flex flex-col gap-2 justify-center items-center h-[50vh]">
          <p className="text-gray-600 text-center">
            You haven’t created any movies yet.
          </p>
          <Button>Add New Movie</Button>
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
