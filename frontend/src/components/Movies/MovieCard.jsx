import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

import { Star, Clock, Languages, Heart } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

const MovieCard = ({ movie }) => {
  const poster =
    movie.posterUrl || "https://via.placeholder.com/500x750?text=No+Image";
  const langs = (movie.language || []).join(" • ");
  const genres = (movie.genre || []).join(" • ");

  const { user, setUser } = useAuth();
  const likeMovie = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = user?.id;

      const res = await axios.patch(
        `http://localhost:5000/users/${userId}`,
        { ...user, likedMovies: [...user.likedMovies, movie] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      toast.success("Added to liked movies");
    } catch (err) {
      console.error("❌ Error updating user:", err);
      toast.err("Something went wrong!");
    }
  };
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow rounded-2xl pt-0 gap-3">
      <div className="relative aspect-2/3 w-full bg-zinc-100">
        <img
          src={poster}
          alt={movie.title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) =>
            (e.currentTarget.src =
              "https://via.placeholder.com/500x750?text=No+Image")
          }
        />
        <div className="absolute top-3 left-0 px-3 flex items-center justify-between w-full  gap-2">
          <div>
            <Badge className="bg-black/80 text-white backdrop-blur-sm">
              <Star className="mr-1 h-3.5 w-3.5" /> {movie.rating ?? "NR"}
            </Badge>
            <Badge variant="secondary" className="backdrop-blur-sm">
              <Clock className="mr-1 h-3.5 w-3.5" /> {movie.duration}
            </Badge>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              likeMovie();
            }}
            variant="outline"
          >
            <Heart />
          </Button>
        </div>
      </div>

      <CardHeader>
        <h3 className="text-lg font-semibold leading-tight line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{genres}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Languages className="h-4 w-4" />
          <span className="line-clamp-1">{langs}</span>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {movie.description}
          </p>
          {Array.isArray(movie.cast) && movie.cast.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Cast: </span>
              <span className="line-clamp-1">{movie.cast.join(", ")}</span>
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">From </span>
          <span className="font-semibold">
            ₹
            {Math.min(
              ...(movie.showtimes || []).map((s) => s.ticketPrice || 0),
              0
            ) || 0}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
