import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMovieContext } from "../../Context/MovieContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../../Context/AuthContext";

const MovieDetails = () => {
  const { id } = useParams();
  const { movies } = useMovieContext();
  const { user } = useAuth();
  const currentUserCity = localStorage.getItem("currentCity");
  const movie = movies.find((m) => m.id == id);
  const [cityShow, setCityShow] = useState([]);

  useEffect(() => {    
    setCityShow(() => {
      return movie?.showtimes.filter(
        (show) => show.location === currentUserCity
      );
    });
  }, [movie]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-80 text-gray-500">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center brightness-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

        <div className="absolute bottom-10 left-10 md:left-20 text-white space-y-3 max-w-3xl">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="flex flex-wrap items-center gap-3 text-sm opacity-90">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {movie.rating}
            </span>
            <Separator orientation="vertical" className="h-4 bg-white/40" />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {movie.duration}
            </span>
            <Separator orientation="vertical" className="h-4 bg-white/40" />
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {new Date(movie.releaseDate).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre.map((g) => (
              <Badge
                key={g}
                variant="secondary"
                className="bg-white/20 text-white"
              >
                {g}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.language.map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="border-white text-white"
              >
                {lang}
              </Badge>
            ))}
          </div>

          <p className="text-sm mt-3 opacity-80 max-w-xl leading-relaxed">
            {movie.description}
          </p>
        </div>
      </div>
      <section className="py-10 px-6 md:px-16">
        <h2 className="text-2xl font-semibold mb-6">Cast</h2>

        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {movie.cast.map((actor) => (
            <div
              key={actor.name}
              className="flex flex-col items-center min-w-[120px] text-center group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-200 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm md:text-base font-medium text-gray-800 group-hover:text-primary transition-colors duration-200">
                {actor.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />
      <section className="py-10 px-6 md:px-16">
        <h2 className="text-2xl font-semibold mb-6">Showtimes</h2>
        {cityShow ? (
          <div className="space-y-6">
            {cityShow.map((theater) => (
              <div
                key={theater.theater}
                className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-3">
                  {theater.theater} — {theater.location}
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {theater.timings.map((time) => (
                    <Badge
                      key={time}
                      variant="outline"
                      className="text-sm px-3 py-1 cursor-pointer hover:bg-gray-200"
                    >
                      {time}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap justify-between items-center text-sm text-gray-700">
                  <p>🎟️ ₹{theater.ticketPrice} per ticket</p>
                  <p>
                    Seats Available:{" "}
                    <span className="font-semibold">
                      {theater.availableSeats}/{theater.totalSeats}
                    </span>
                  </p>
                  <Button className="mt-2 md:mt-0">Book Tickets</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 items-center justify-center">
            {user ? (
              <>
                <p className="text-gray-500">
                  No showtimes available in your city.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-500">
                  Login to view Showtimes in your city.{" "}
                </p>
                <Link
                  to="/login"
                  className="text-black hover:text-black font-medium underline underline-offset-2"
                >
                  Login here
                </Link>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieDetails;
