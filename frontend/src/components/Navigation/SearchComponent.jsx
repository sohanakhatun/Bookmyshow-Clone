import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { CircleX, Search } from "lucide-react";
import { useMovieContext } from "../../Context/MovieContext";

const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { movies, setMovieSearchResults, query, setQuery } = useMovieContext();

  const debounceRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);
  };

  const debouncedInput = (value) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  useEffect(() => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setMovieSearchResults(results);
  }, [query]);

  return (
    <>
      <button
        className="md:hidden p-2 text-gray-700"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      >
        {isSearchOpen ? <CircleX size={22}/> : <Search size={22} />}
      </button>

      {isSearchOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-sm p-3 animate-in slide-in-from-top duration-200 z-40">
          <Input
            type="text"
            placeholder="Search..."
            defaultValue={query}
            onChange={(e) => debouncedInput(e.target.value)}
            className="w-full"
          />
        </div>
      )}

      <div className="hidden md:block w-full">
        <Input
          type="text"
          placeholder="Search..."
          defaultValue={query}
          onChange={(e) => debouncedInput(e.target.value)}
          className="w-full"
        />
      </div>
    </>
  );
};

export default SearchComponent;
