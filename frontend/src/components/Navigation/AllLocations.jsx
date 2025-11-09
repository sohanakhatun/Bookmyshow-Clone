import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useUserCity } from "../../hooks/useLocation";
import { useState } from "react";
import { useEffect } from "react";
import { useMovieContext } from "../../Context/MovieContext";
const AllLocations = () => {
  const { currentUserCity, setCurrentUserCity } = useUserCity();
  const [allLocations, setAllLocations] = useState([]);
  const { setCurrentLocationMovies } = useMovieContext();

  useEffect(() => {
    fetch("http://localhost:5000/locations")
      .then((res) => res.json())
      .then((data) => {
        let otherLocations = data.filter(
          (location) => location.city !== currentUserCity
        );
        setAllLocations(otherLocations);
      });
  }, [currentUserCity]);

  function changeCurrentLocation(newLocation) {
    setCurrentUserCity(newLocation);
    localStorage.setItem("currentCity", newLocation);
    setCurrentLocationMovies(newLocation);
  }
  return (
    <>
      {currentUserCity && (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{currentUserCity}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Location</DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap justify-center items-center gap-3">
                {allLocations.map((location) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      changeCurrentLocation(location.city);
                    }}
                    key={location.city}
                    className="flex cursor-pointer justify-center items-center flex-col"
                  >
                    <img
                      src={location.logo}
                      width="50"
                      height="50"
                      alt={location.city}
                    />
                    {location.city}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default AllLocations;
