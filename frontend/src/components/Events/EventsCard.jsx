import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const EventsCard = ({event}) => {
  return (
    <Card
      key={event.id}
      className="hover:shadow-lg transition-shadow duration-300 border-gray-200"
    >
      <CardHeader className="p-0">
        <img
          src={event.image}
          alt={event.name}
          className="h-40 w-full object-cover rounded-t-lg"
        />
      </CardHeader>

      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">{event.category}</Badge>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {event.date}
          </span>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
          {event.name}
        </CardTitle>

        <p className="text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
          <MapPin className="w-4 h-4" />
          {event.location}
        </div>
      </CardContent>

      <CardFooter className="px-5 pb-5">
        <Button variant="outline" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventsCard;
