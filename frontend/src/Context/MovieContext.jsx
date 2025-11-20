import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useUserCity } from "../hooks/useLocation";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { toast } from "sonner";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [originalMovieArray, setOriginalMovieArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { currentUserCity } = useUserCity();
  const { user, setUser } = useAuth();

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

  const toggleLike = async (movie, liked) => {
    try {
      const token = localStorage.getItem("token");
      const userId = user?.id;
      let likedMoviePayload = user.likedMovies || [];

      if (liked) {
        likedMoviePayload = [...likedMoviePayload, movie];
      } else {
        likedMoviePayload = likedMoviePayload.filter(
          (mov) => mov.id !== movie.id
        );
      }

      const res = await axios.patch(
        `http://localhost:5000/users/${userId}`,
        { ...user, likedMovies: likedMoviePayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);

      liked
        ? toast.success("Added to liked movies")
        : toast.success("Removed from liked movies");
      movie.isLikedByUser = liked;
    } catch (err) {
      movie.isLikedByUser = !liked;
      console.error("Error updating user:", err);
      toast.err("Something went wrong!");
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        toggleLike,
        setCurrentLocationMovies,
        originalMovieArray,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
