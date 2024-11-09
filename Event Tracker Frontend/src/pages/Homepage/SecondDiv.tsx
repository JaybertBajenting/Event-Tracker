import HomePageCards from "@/cards/HomePageCards";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ArtImage1 from "@/assets/ArtImage1.jpg";
import ArtImage2 from "@/assets/ArtImage2.jpg";
import ArtImage3 from "@/assets/ArtImage3.jpg";
import useMediaQuery from "@/hooks/useMediaQuery";
import { API_ENDPOINTS } from "@/Api";
import axios from "axios";
import { Link } from "react-router-dom";

interface EventDetails {
  id: number;
  eventName: string;
  eventDescription: string;
  eventStarts: Date;
  eventEnds: Date;
  location: string;
  eventPicture: Uint8Array;
}
const SecondDiv = () => {
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
  const [events, setEvents] = useState<EventDetails[] | null>(null);
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

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };
  
  return (
    <div className="mb-10 w-full">
      <div className="mx-auto max-w-[2000px] small:px-[100px]">
        <div>
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 1 }}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <p className="small:text-[25px]">Articles</p>
            <h1 className="font-bold small:text-[60px] ">
              Discover the Latest Events
            </h1>
            <p className="small:text-[25px]">
              Stay updated with our informative blog posts.
            </p>
          </motion.div>
          <div className="flex flex-col md:gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.1 }}
              variants={container}
              className="mt-5 flex flex-col items-center justify-between gap-8 large:flex-row"
            >
              {sortedEvents?.map((event) => (
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
              ))}
            </motion.div>
            <div className="flex justify-center xs:mb-8 xs:mt-8">
            <Link to="/DiscoverEvents">
          <button className="h-[62px] w-[190px] rounded-[10px] bg-gold px-8 text-[20px] font-medium hover:bg-light-green">
            LOAD MORE
          </button>
        </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondDiv;
