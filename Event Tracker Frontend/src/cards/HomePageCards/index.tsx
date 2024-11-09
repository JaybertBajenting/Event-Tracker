import React from "react";

import eventLocation from "@/assets/eventLocation.png";
import eventTime from "@/assets/eventTime.png";
import { motion } from "framer-motion";

interface HomePageCardProps {
  thumbnail: Uint8Array;
  title: string;
  eventStartDate: Date;
  eventEndDate: Date;
  location: string;
  buttonText: string;
  onCardClick?: () => void;
  onClick: () => void;
  buttonColor?: string;
}
const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const HomePageCards: React.FC<HomePageCardProps> = ({
  thumbnail,
  title,
  eventStartDate,
  eventEndDate,
  location,
  buttonText,
  onCardClick,
  onClick,
  buttonColor = "maroon",
}) => {
  const startDate = new Date(eventStartDate);
  const endDate = new Date(eventEndDate);

  const formatEventDate = (): string => {
    if (
      startDate.getFullYear() !== endDate.getFullYear() ||
      startDate.getMonth() + 1 !== endDate.getMonth() + 1 ||
      startDate.getDate() !== endDate.getDate()
    ) {
      return `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate
        .getDate()
        .toString()
        .padStart(2, "0")} - ${endDate.getFullYear()}-${(endDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")} @ ${
        startDate.getHours() % 12 || 12
      }:${startDate.getMinutes().toString().padStart(2, "0")} ${
        startDate.getHours() < 12 ? "AM" : "PM"
      } - ${endDate.getHours() % 12 || 12}:${endDate
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${endDate.getHours() < 12 ? "AM" : "PM"}`;
    } else {
      return `${startDate.getFullYear()}-${(startDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${startDate
        .getDate()
        .toString()
        .padStart(2, "0")} @ ${startDate.getHours() % 12 || 12}:${startDate
        .getMinutes()
        .toString()
        .padStart(2, "0")} ${startDate.getHours() < 12 ? "AM" : "PM"} - ${
        endDate.getHours() % 12 || 12
      }:${endDate.getMinutes().toString().padStart(2, "0")} ${
        endDate.getHours() < 12 ? "AM" : "PM"
      }`;
    }
  };
  const monthAbbreviations = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return (
    <motion.div
      variants={childVariant}
      className=" items-center whitespace-nowrap rounded-[20px] border-4 border-white bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] xs:mb-1 xs:flex xs:flex-col small:w-[500px]"
      onClick={onCardClick}
    >
      <div className="relative h-full w-full">
        <div className="absolute m-3 flex h-16 w-16 flex-col items-center rounded-[5px] bg-white p-1 font-semibold text-neutral-700 shadow">
          <p className="flex-1 text-[25px]">{startDate.getDate()}</p>
          <p className="text-[15px]">
            {monthAbbreviations[startDate.getMonth()]}
          </p>
        </div>
        <div className="flex w-full justify-center">
          <img
            className="flex h-[230px] w-[fill] rounded-[15px]"
            src={`data:image;base64,${thumbnail}`}
            alt="Thumbnail"
          />
        </div>
      </div>
      <div className="flex w-full flex-col py-5 px-4">
        <p className="self-start text-xl font-semibold medium:pb-10">{title}</p>
        <p className="flex items-center text-gray">
          <img src={eventTime} className="medium:mr-[5px] medium:py-2" />
          {formatEventDate()}
        </p>
        <p className="flex items-center justify-start text-gray">
          <img src={eventLocation} className="medium:mr-[5px] medium:py-2" />
          {location}
        </p>
        <button
          className={`mr-[20px] h-[41.65px] w-[135.85px] self-end rounded-md bg-${buttonColor} text-white`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default HomePageCards;
