import Header from "@/includes/header";
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { API_ENDPOINTS } from "@/Api";
import axios from "axios";
import CalendarIcon from "@/assets/calendar.svg";
import TodayCalendarIcon from "@/assets/calendar_today.svg"

function Day({
  day,
  events,
}: {
  day: dayjs.Dayjs;
  rowIdx?: number;
  events: EventDetails[];
}) {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full"
      : "text-end";
  }

  const dayEvents = events.filter(
    (event) =>
      dayjs(event.eventStarts).format("DD-MM-YY") === day.format("DD-MM-YY")
  );

  return (
    <div className={`border-zinc-300 flex flex-col border-[0.5px]`}>
      <header className=" flex min-h-[120px] flex-col p-1 ">
        <p
          className={`m-1 items-center justify-center flex h-7 w-7 text-center self-end text-sm ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
        {dayEvents.length > 0 && (
          <div className="mt-1 w-full  text-center ">
            {dayEvents.map((event) => (
              <p key={event.id} className="mb-1 rounded bg-maroon text-white">
                {event.eventName}
              </p>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
function Month({
  month,
  events,
}: {
  month: dayjs.Dayjs[][];
  events: EventDetails[];
}) {
  return (
    <div className="flex flex-1 flex-col ">
      <div className="grid grid-cols-7">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          (label, index) => (
            <div key={index} className="p-2 text-center text-sm">
              {label.toUpperCase()}
            </div>
          )
        )}
      </div>
      <div className="relative grid grid-cols-7 border-[0.5px] border-zinc-300 ">
        {month.map((row: dayjs.Dayjs[], i: number) => (
          <React.Fragment key={i}>
            {row.map((day: dayjs.Dayjs, idx: number) => (
              <Day day={day} key={idx} rowIdx={i} events={events} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });
  
    while (currentMonthCount < 31) {
      daysMatrix[5].push(dayjs(new Date(year, month, currentMonthCount)));
      currentMonthCount++;
    }
  
    return daysMatrix;
  }
  

interface EventDetails {
  id: number;
  eventName: string;
  eventDescription: string;
  eventStarts: Date;
  eventEnds: Date;
  location: string;
  eventPicture: Uint8Array;
}
const Calendar = () => {
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

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
    console.log("PREV: ", monthIndex);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
    console.log("AFTER: ", monthIndex);
  }

  function handleReset() {
    setMonthIndex(dayjs().month());
    console.log(monthIndex);
  }
  return (
    <div className="max-w-[2000px] mb-10">
      <Header />
      <div className="mx-[100px]">
        <h1 className="my-10 text-xl font-bold text-gold "> <img className="inline filter brightness-0  w-[58px] h-[58px]" src={CalendarIcon} />Calendar</h1>
        <div className="flex items-center ml-[8px]">
            <img src={TodayCalendarIcon} onClick={handleReset} className="cursor-pointer"/>
          <button onClick={handlePrevMonth}>
            <span className="text-gray-600 mx-1 cursor-pointer">
              <ChevronLeftOutlinedIcon />
            </span>
          </button>
          <button onClick={handleReset} >
            Today
          </button>
          <button onClick={handleNextMonth}>
            <span className="text-gray-600 mx-1 cursor-pointer">
              <ChevronRightOutlinedIcon />
            </span>
          </button>
          <h2 className="ml-4 text-xl font-bold text-maroon">
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          </h2>
        </div>
        <div>
          <Month month={currenMonth} events={events || []} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
