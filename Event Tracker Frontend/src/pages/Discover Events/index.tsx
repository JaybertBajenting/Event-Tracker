import HomePageCards from "@/cards/HomePageCards";
import { useEffect, useMemo, useState } from "react";
import { API_ENDPOINTS } from "@/Api";
import axios from "axios";
import Header from "@/includes/header";
import { useLocation } from "react-router-dom";

interface EventDetails {
  id: number;
  eventName: string;
  eventDescription: string;
  eventStarts: Date;
  eventEnds: Date;
  location: string;
  eventPicture: Uint8Array;
}
const DiscoverEvents = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [events, setEvents] = useState<EventDetails[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.GET_ALL_EVENTS);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);
  const filteredEvents = useMemo(
    () =>
      [...(events || [])].filter(
        (event) =>
          event.eventEnds &&
          new Date(event.eventEnds) >= new Date() &&
          (!query ||
            event.eventName.toLowerCase().includes(query.toLowerCase()))
      ),
    [events, query]
  );
  const sortedEvents = useMemo(
    () =>
      filteredEvents.sort((a, b) => {
        const today = new Date();
        const startDateA = a.eventStarts ? new Date(a.eventStarts) : today;
        const startDateB = b.eventStarts ? new Date(b.eventStarts) : today;
        return (
          Math.abs(today.getTime() - startDateA.getTime()) -
          Math.abs(today.getTime() - startDateB.getTime())
        );
      }),
    [filteredEvents]
  );
  
  return (
    <div className="flex h-[100%] flex-1 flex-col">
      <Header />
      <div className="flex flex-1 flex-wrap justify-center gap-3 pt-10">
        {sortedEvents.length === 0 ? (
          <p>No matching events found. 😢</p>
        ) : (
          sortedEvents.map((event) => (
            <HomePageCards
              key={event.id}
              thumbnail={event?.eventPicture}
              title={event?.eventName}
              eventStartDate={event?.eventStarts}
              eventEndDate={event?.eventEnds}
              location={event?.location}
              buttonText="Join Event"
              onClick={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DiscoverEvents;
