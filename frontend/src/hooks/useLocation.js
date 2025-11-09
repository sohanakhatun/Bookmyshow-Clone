import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

export function useUserCity() {
  const [currentUserCity, setCurrentUserCity] = useState(() => {
    const savedCity = localStorage.getItem("currentCity");
    return savedCity !== "null" && savedCity !== null ? savedCity : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    async function getCity() {
      setLoading(true);
      try {
        const res = await fetch(`https://ipinfo.io/json?token=e84bafc467f161`);
        const data = await res.json();
        setCurrentUserCity(data.city);
        localStorage.setItem("currentCity", data.city);
      } catch (err) {
        setError("Failed to get city name.");
      } finally {
        setLoading(false);
      }
    }

    if (!currentUserCity) getCity();
  }, [user]);

  return { currentUserCity, loading, error, setCurrentUserCity };
}
