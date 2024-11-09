import { useAuth } from "@/context/Auth";
import HomePageCards from "@/cards/HomePageCards";
import { useEffect, useMemo, useState } from "react";
import { API_ENDPOINTS } from "@/Api";
import axios from "axios";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { EventHandling } from "./EventHandling";
interface EventDetails {
  id: number;
  eventName: string;
  eventDescription: string;
  eventStarts: Date;
  eventEnds: Date;
  location: string;
  eventPicture: Uint8Array;
}

interface CurrentEventDetails {
  id: number | null;
  eventName: string;
  eventDescription: string;
  eventStarts: Date | null;
  eventEnds: Date | null;
  location: string;
  eventPicture: Uint8Array | null;
  [key: string]: any;
}

const HomePage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventDetails[] | null>(null);
  const [currentEvent, setCurrentEvent] = useState<CurrentEventDetails>({
    id: null,
    eventName: "",
    eventDescription: "",
    eventStarts: null,
    eventEnds: null,
    location: "",
    eventPicture: null,
  });
  const [eventClicked, setEventClicked] = useState(false);
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

  const currentEventClicked = async (id: number) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.GET_EVENTBYID}?id=${id}`
      );
      setCurrentEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} \u00A0${
      date.getHours() % 12 || 12
    }:${date.getMinutes().toString().padStart(2, "0")} ${
      date.getHours() < 12 ? "AM" : "PM"
    }`;
  };
  const sortedEvents = useMemo(
    () =>
      [...(events || [])]
        .filter(
          (event) => event.eventEnds && new Date(event.eventEnds) >= new Date()
        )
        .sort((a, b) => {
          const today = new Date();
          const startDateA = a.eventStarts ? new Date(a.eventStarts) : today;
          const startDateB = b.eventStarts ? new Date(b.eventStarts) : today;

          return (
            Math.abs(today.getTime() - startDateA.getTime()) -
            Math.abs(today.getTime() - startDateB.getTime())
          );
        })
        .slice(0, 3),
    [events]
  );

  const { isEventJoined, joinOrWithdrawEvent } = EventHandling();

  return (
    <div className="flex h-[100%] flex-1 flex-col">
      <div className="my-[4rem] ml-[4rem]">
        <h1 className="text-[50px] font-bold"> Welcome, {user?.firstName}! </h1>
        <p className="text-xl text-zinc-600">
          {" "}
          Event Tracker, a portal to learn more about events in the university.
        </p>
      </div>
      <div className="flex-1 bg-zinc-600 bg-opacity-5 ">
        <h1 className="mt-[1rem] ml-[4rem] text-[40px] font-semibold text-neutral-700">
          {" "}
          Upcoming events!{" "}
        </h1>
        <p className="ml-[4rem] text-xl text-zinc-600">
          Here are the latest Events happening in the campus!
        </p>
        <div className="flex flex-1 flex-wrap justify-center gap-3 pt-10">
          {sortedEvents?.map((event) => (
            <HomePageCards
              key={event.id}
              thumbnail={event?.eventPicture}
              title={event?.eventName}
              eventStartDate={event?.eventStarts}
              eventEndDate={event?.eventEnds}
              location={event?.location}
              buttonText={
                isEventJoined(event.id) ? "Unjoin Event" : "Join Event"
              }
              buttonColor={isEventJoined(event.id) ? "lime-500" : "maroon"}
              onClick={() => joinOrWithdrawEvent(event.id)}
              onCardClick={() => {
                setEventClicked(true);
                currentEventClicked(event.id);
              }}
            />
          ))}
        </div>
        {eventClicked && (
          <div className="absolute top-0 left-0 z-50 flex h-[100%] max-h-[2000px] w-[100%] items-center justify-center backdrop-blur-[5px]">
            <motion.div
              className="customized_scrollbar relative flex max-h-[90%] min-w-[60%] max-w-[80%] flex-col rounded-[20px] bg-white shadow"
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.3 }}
              variants={{
                hidden: { opacity: 0, scale: 0 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <div className="flex flex-1 justify-end p-1">
                <CloseIcon
                  className="fixed"
                  onClick={() => {
                    setEventClicked(false);
                  }}
                  sx={{ color: "maroon", fontSize: "30px", cursor: "pointer" }}
                />
              </div>
              <div className="flex flex-wrap ">
                <div className="flex flex-1 flex-col items-center gap-10 py-[50px]">
                  <p>
                    <span className="font-['Inter'] text-3xl font-semibold text-gold">
                      Event
                    </span>{" "}
                    <span className="font-['Inter'] text-3xl font-semibold text-maroon text-opacity-90">
                      Details
                    </span>
                  </p>
                  <div
                    className={`relative flex h-[500px] w-[500px] items-center justify-center `}
                  >
                    <img
                      src={`data:image;base64,${currentEvent.eventPicture}`}
                      className={`max-h-[500px] min-h-[250px] min-w-[400px] max-w-[500px] cursor-pointer`}
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col gap-10 px-16 pt-16 text-gray">
                    <div className="flex flex-1 flex-col">
                      <p className="font-semibold">Event Name</p>
                      <p>{currentEvent.eventName}</p>

                      <br />
                      <p className="font-semibold">Event Description</p>
                      <p>{currentEvent.eventDescription}</p>
                      <br />
                      <p className="font-semibold">Event Location</p>
                      <p>{currentEvent?.location}</p>
                    </div>
                    <div className="flex flex-1 flex-wrap gap-10">
                      <div className="flex flex-1  flex-col items-center">
                        <p className="whitespace-nowrap font-semibold">
                          Event Starts
                        </p>
                        <div className="flex w-full justify-center ">
                          {currentEvent.eventStarts && (
                            <p className="whitespace-nowrap">
                              {formatDate(new Date(currentEvent.eventStarts))}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <p className="whitespace-nowrap font-semibold">
                          Event Ends
                        </p>

                        {currentEvent.eventEnds && (
                          <p className="whitespace-nowrap">
                            {formatDate(new Date(currentEvent.eventEnds))}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end p-4">
                    <button
                      className={`box-border rounded-[5px] bg-maroon px-[37px] py-[11px] text-white ${
                        currentEvent.id !== null &&
                        (isEventJoined(currentEvent.id)
                          ? "bg-lime-500"
                          : "bg-maroon")
                      }`}
                      onClick={() =>
                        currentEvent.id !== null &&
                        joinOrWithdrawEvent(currentEvent.id)
                      }
                    >
                      {currentEvent.id !== null &&
                        (isEventJoined(currentEvent.id)
                          ? "Unjoin Event"
                          : "Join Event")}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
