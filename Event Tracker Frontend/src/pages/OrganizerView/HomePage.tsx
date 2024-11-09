import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Calendar from "@/assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/context/Auth";
import { API_ENDPOINTS } from "@/Api";
import axios from "axios";
import HomePageCards from "@/cards/HomePageCards";

interface UpdateEventDetails {
  id: number | null;
  eventName: string;
  eventDescription: string;
  eventStarts: Date | null;
  eventEnds: Date | null;
  location: string;
  eventPicture: File | null;
  organizerId: number | undefined;
  [key: string]: any;
}

interface EventDetails {
  id: number;
  eventName: string;
  eventDescription: string;
  eventStarts: Date;
  eventEnds: Date;
  location: string;
  eventPicture: Uint8Array;
  organizerId: number;
}
const HomePage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventDetails[] | null>(null);
  const [currentEvent, setCurrentEvent] = useState<UpdateEventDetails>({
    id: null,
    eventName: "",
    eventDescription: "",
    eventStarts: null,
    eventEnds: null,
    location: "",
    eventPicture: null,
    organizerId: user?.id,
  });
  const [updateEvent, setUpdateEvent] = useState(false);

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

  const sortedEvents = useMemo(
    () =>
      [...(events || [])]
        .filter((event) => event.organizerId === user?.id)
        .filter((event) => event.eventEnds && new Date(event.eventEnds) >= new Date())
        .sort((a, b) => {
          const today = new Date();
          const startDateA = a.eventStarts ? new Date(a.eventStarts) : today;
          const startDateB = b.eventStarts ? new Date(b.eventStarts) : today;

          return Math.abs(today.getTime() - startDateA.getTime()) - Math.abs(today.getTime() - startDateB.getTime());
        })
        .slice(0, 3),
    [events, user?.id]
  );
  const currentEventClicked = async (id: number) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.GET_EVENTBYID}?id=${id}`
      );
      setCurrentEvent(response.data);
      setCurrentEventImage(`data:image;base64,${response.data.eventPicture}`);
      setSelectedEndDate(new Date(response.data.eventEnds));
      setSelectedStartDate(new Date(response.data.eventStarts));
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [eventPicture, setEventPicture] = useState<string | undefined>(
    undefined
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files[0]);
      updateEventDetails("eventPicture", e.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target instanceof FileReader) {
          const dataURL = event.target.result as string;
          setEventPicture(dataURL);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const updateEventDetails = (field: string, value: any) => {
    setCurrentEvent((prevDetails) => ({
      ...(prevDetails || {}),
      [field]: value,
    }));
  };

  const updateEventButtonClicked = async (id: number | null) => {
    try {
      if (user) {
        const eventData = {
          ...currentEvent,
          organizerId: user.id,
          eventStarts: selectedStartDate,
          eventEnds: selectedEndDate,
          eventPicture: null,
        };

        const response = await axios.put(
          `${API_ENDPOINTS.UPDATE_EVENT}?id=${id}`,
          eventData
        );
        if (response.status === 200) {
          setEvents((prevEvents) => {
            if (prevEvents) {
              return prevEvents.map((event) => {
                if (event.id === response.data.id) {
                  return {
                    ...event,
                    eventName: response.data.eventName,
                    eventDescription: response.data.eventDescription,
                    eventStarts: response.data.eventStarts,
                    eventEnds: response.data.eventEnds,
                    location: response.data.location,
                    eventPicture: response.data.eventPicture,
                  };
                }
                return event;
              });
            }
            return null;
          });
          uploadPicture(response.data.id, selectedFile);
          setUpdateEvent(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEventButtonClicked = async (id: number | null) => {
    try {
      await axios.delete(`${API_ENDPOINTS.DELETE_EVENTBYID}${id}`);
      setEvents((prevEvents) => {
        if (prevEvents) {
          return prevEvents.filter((event) => event.id !== id);
        }
        return prevEvents;
      });
      setUpdateEvent(false);
    } catch (error) {
      console.error(error);
    }
  };


  const uploadPicture = async (id: number, eventPicture: File | null) => {
    if (eventPicture) {
      try {
        const formData = new FormData();
        formData.append("id", String(id));
        formData.append("file", eventPicture);
        const response = await axios.post(
          API_ENDPOINTS.UPLOAD_EVENT_PICTURE,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status == 200) {
          setEventPicture(undefined);
          setSelectedFile(null);
          const response = await axios.get(
            `${API_ENDPOINTS.GET_EVENTBYID}?id=${id}`
          );
          if (response.status == 200) {
            setEvents((prevEvents) => {
              if (prevEvents) {
                return prevEvents.map((event) => {
                  if (event.id === response.data.id) {
                    return {
                      ...event,
                      eventPicture: response.data.eventPicture,
                    };
                  }
                  return event;
                });
              }
              return null;
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const [currentEventImage, setCurrentEventImage] = useState("");
  return (
    <div className="flex h-[100%] flex-1 flex-col">
      <div className="my-[2rem] ml-[4rem]">
        <h1 className="text-[50px] font-bold"> Welcome, {user?.firstName}! </h1>
        <p className="text-xl text-zinc-600">
          {" "}
          Event Tracker, a portal to learn more about events in the university.
        </p>
      </div>
      <div className="flex-1 bg-zinc-600 bg-opacity-5 ">
        <h1 className="mt-[1rem] ml-[4rem] text-[40px] font-semibold text-neutral-700">
          {" "}
          Your Upcoming events!{" "}
        </h1>
        <p className="ml-[4rem] text-xl text-zinc-600">
          Here are your latest Events happening in the campus!
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
              buttonText="Manage Event"
              onClick={() => {
                setUpdateEvent(true);
                currentEventClicked(event.id);
              }}
            />
          ))}
        </div>
        {updateEvent && (
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
                    setUpdateEvent(false);
                    setSelectedStartDate(null);
                    setSelectedEndDate(null);
                    setEventPicture(undefined);
                    setCurrentEvent({
                      id: null,
                      eventName: "",
                      eventDescription: "",
                      eventStarts: null,
                      eventEnds: null,
                      location: "",
                      eventPicture: null,
                      organizerId: user?.id,
                    });
                  }}
                  sx={{ color: "maroon", fontSize: "30px", cursor: "pointer" }}
                />
              </div>
              <div className="flex flex-wrap ">
                <div className="flex flex-1 flex-col items-center gap-10 py-[50px]">
                  <p>
                    <span className="font-['Inter'] text-3xl font-semibold text-gold">
                      Update
                    </span>{" "}
                    <span className="font-['Inter'] text-3xl font-semibold text-maroon text-opacity-90">
                      Event
                    </span>
                  </p>
                  <div
                    className={`relative flex h-[500px] w-[500px] items-center justify-center `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleImageClick}
                  >
                    <img
                      src={eventPicture ? eventPicture : currentEventImage}
                      className={`max-h-[500px] min-h-[250px] min-w-[400px] max-w-[500px] cursor-pointer`}
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    {!eventPicture && (
                      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                        <button className="box-border rounded-3xl bg-maroon px-[37px] py-[11px] text-white">
                          Upload Image
                        </button>
                        <p className="text-white">or drop a file</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-1 flex-col gap-10 px-16 pt-16">
                    <div className="flex flex-1 flex-col">
                      <p className="text-gray">Enter Event Name</p>
                      <TextField
                        hiddenLabel
                        variant="standard"
                        value={currentEvent?.eventName}
                        onChange={(e) => {
                          updateEventDetails("eventName", e.target.value);
                        }}
                      />

                      <br />
                      <p className="text-gray">Enter Event Description</p>
                      <TextField
                        hiddenLabel
                        multiline
                        minRows={4}
                        placeholder="Add a description..."
                        value={currentEvent?.eventDescription}
                        onChange={(e) =>
                          updateEventDetails("eventDescription", e.target.value)
                        }
                      />
                      <br />
                      <p className="text-gray">Enter Event Location</p>
                      <TextField
                        hiddenLabel
                        variant="standard"
                        value={currentEvent?.location}
                        onChange={(e) =>
                          updateEventDetails("location", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-1 gap-10 ">
                      <div className="flex flex-1  flex-col items-center">
                        <p>Event Starts</p>
                        <div className="flex w-full justify-center ">
                          <img src={Calendar} />
                          <DatePicker
                            selected={selectedStartDate}
                            onChange={(date) => {
                              setSelectedStartDate(date),
                                updateEventDetails("eventStarts", date);
                            }}
                            showTimeSelect
                            dateFormat="Pp"
                            className="border-gray-300 w-[200px] rounded border p-2"
                          />
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col items-center">
                        <p>Event Ends</p>
                        <div className="flex w-full justify-center ">
                          <img src={Calendar} />
                          <DatePicker
                            selected={selectedEndDate}
                            onChange={(date) => {
                              setSelectedEndDate(date),
                                updateEventDetails("eventEnds", date);
                            }}
                            showTimeSelect
                            dateFormat="Pp"
                            className="border-gray-300 w-[200px] rounded border p-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end p-4 gap-1"> 
                  <button
                    className="box-border rounded-[5px] bg-maroon px-[37px] py-[11px] text-white"
                    onClick={() => deleteEventButtonClicked(currentEvent.id)}
                  >
                    Delete Event
                  </button>
                    <button
                      className="box-border rounded-[5px] bg-maroon px-[37px] py-[11px] text-white"
                      onClick={() => updateEventButtonClicked(currentEvent.id)}
                    >
                      Update Event
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
