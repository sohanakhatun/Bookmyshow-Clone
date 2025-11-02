import React from "react";
import EventsCard from "./EventsCard";
import { Button } from "../ui/button";
const EventsTab = ({ list , activeTab }) => {
  return (
    <>
      {list.length === 0 ? (
        <div className="flex flex-col gap-2 justify-center items-center h-[50vh]">
          <p className="text-gray-600 text-center">
            You haven’t created any {activeTab} events yet.
          </p>
          <Button>Add New Event</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((event) => (
            <EventsCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  );
};

export default EventsTab;
