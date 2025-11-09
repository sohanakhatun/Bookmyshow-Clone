import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useUserCity } from "../hooks/useLocation";


const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [originalMovieArray, setOriginalMovieArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUserCity } = useUserCity();
  //  Fetch movies only once
  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/movies");
        const data = await res.json();
        setOriginalMovieArray(data);
        setMovies(data);
      } catch (err) {
        setError(err || "Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  //  Filter movies when city changes
  useEffect(() => {
    if (!currentUserCity || originalMovieArray.length === 0) return;

    const filtered = originalMovieArray.filter((movie) =>
      movie.availableInLocations.includes(currentUserCity)
    );
    setMovies(filtered);
  }, [currentUserCity, originalMovieArray]);

  const setCurrentLocationMovies = useCallback(
    (city) => {
      if (!city) return;
      const filtered = originalMovieArray.filter((movie) =>
        movie.availableInLocations.includes(city)
      );
      setMovies(filtered);
    },
    [originalMovieArray]
  );

  return (
    <MovieContext.Provider
      value={{ movies, loading, error, setCurrentLocationMovies , originalMovieArray }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
