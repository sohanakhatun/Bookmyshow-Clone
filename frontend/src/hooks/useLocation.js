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
    async function getCity(lat, lon) {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const data = await res.json();

        const cityName =
          data.city ||
          data.locality ||
          data.principalSubdivision ||
          "Unknown location";

        setCurrentUserCity(cityName);
        localStorage.setItem("currentCity", cityName);
      } catch (err) {
        setError("Failed to get city name.");
      } finally {
        setLoading(false);
      }
    }

    function requestLocation() {
      if (!navigator.geolocation) {
        setError("Geolocation not supported by browser.");
        return;
      }

      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          getCity(latitude, longitude);
        },
        (err) => {
          setLoading(false);
          if (err.code === err.PERMISSION_DENIED) {
            setError("Please allow location access.");
            localStorage.removeItem("currentCity");
          } else {
            setError("Unable to retrieve location.");
          }
        }
      );
    }

    requestLocation();
  }, [user]);

  return { currentUserCity, loading, error, setCurrentUserCity };
}
