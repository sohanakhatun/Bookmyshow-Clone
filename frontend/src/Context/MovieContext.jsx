import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserCity } from "../hooks/useLocation";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [originalMovieArray, setOriginalMovieArray] = useState([]);
  const { currentUserCity } = useUserCity();

  const changeMovies = () => {
    useEffect(() => {
      fetch("http://localhost:5000/movies")
        .then((res) => res.json())
        .then((data) => {
          if (currentUserCity) {
            let currentLocationMovies = data.filter((movie) => {
              return movie.availableInLocations.includes(currentUserCity);
            });
            setMovies(currentLocationMovies);
          } else {
            setMovies(data);
          }

          setOriginalMovieArray(data);
        });
    }, [currentUserCity]);
  };

  const setCurrentLocationMovies = (currentCity) => {
    if (currentCity) {
      let currentLocationMovies = originalMovieArray.filter((movie) => {
        return movie.availableInLocations.includes(currentCity);
      });
      setMovies(currentLocationMovies);
    } else {
      setMovies(data);
    }
  };

  changeMovies();
  return (
    <MovieContext.Provider
      value={{ movies, setMovies, changeMovies, setCurrentLocationMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
