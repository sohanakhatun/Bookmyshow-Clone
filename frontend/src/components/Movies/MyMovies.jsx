import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import EventsTab from "./MoviesTab";

const MyMovies = () => {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");
  const cancelledEvents = events.filter((e) => e.status === "cancelled");

  useEffect(() => {
    if (user?.MyMovies) {
      setEvents(user.MyMovies);
    }
  }, [user]);

  return (
    <div className="w-full h-full">
      <div className="flex gap-3 border-b mb-6">
        {["upcoming", "past", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 capitalize font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === tab
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === "upcoming" && (
          <EventsTab list={upcomingEvents} activeTab={activeTab} />
        )}
        {activeTab === "past" && (
          <EventsTab list={pastEvents} activeTab={activeTab} />
        )}
        {activeTab === "cancelled" && (
          <EventsTab list={cancelledEvents} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default MyMovies;
