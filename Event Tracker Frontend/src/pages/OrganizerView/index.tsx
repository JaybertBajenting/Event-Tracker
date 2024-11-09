import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeLogo from "@/assets/Home.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomePage from "./HomePage";
import YourEvents from "./YourEvents";
import Profile from "../Profile";
import AddIcon from "@mui/icons-material/Add";
import BackArrow from "@/assets/backarrow.png";
import TopBar from "@/includes/topbar";
import { useActiveComponent } from "@/context/ActiveComponent";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Calendar from "@/assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "@/context/Auth";
import { API_ENDPOINTS } from "@/Api";
import axios from "axios";

interface OrganizerViewProps {
  initialView: "HomePage";
}

interface EventDetails {
  eventName: string;
  eventDescription: string;
  eventStarts: Date | null;
  eventEnds: Date | null;
  location: string;
  eventPicture: File | null;
  organizerId: number | undefined;
  [key: string]: any;
}

const OrganizerView: React.FC<OrganizerViewProps> = () => {
  const { user, setErrorMessage } = useAuth();
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [expandMore, setExpandMore] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    eventName: "",
    eventDescription: "",
    eventStarts: null,
    eventEnds: null,
    location: "",
    eventPicture: null,
    organizerId: user?.id,
  });
  const toggleExpandSideBar = () => {
    setSideBarOpen(!sideBarOpen);
    setExpandMore(false);
  };
  const toggleExpandMore = () => {
    setExpandMore(!expandMore);
  };

  const { activeComponent, setAndStoreActiveComponent } = useActiveComponent();

  const clickedCreateEvent = () => {
    if (activeComponent != "HomePage") {
      setAndStoreActiveComponent("HomePage");
    } else {
      setCreateEvent(true);
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
    setEventDetails((prevDetails) => ({
      ...(prevDetails || {}),
      [field]: value,
    }));
  };

  const createEventShareClicked = async () => {
    try {
      if (user) {
        const fieldLabels: {
          eventName: string;
          eventDescription: string;
          eventStarts: string;
          eventEnds: string;
          location: string;
          eventPicture: string;
          [key: string]: string;
        } = {
          eventName: "Event Name",
          eventDescription: "Event Description",
          eventStarts: "Event Start",
          eventEnds: "Event End",
          location: "Location",
          eventPicture: "Event Picture",
        };

        const requiredFields = Object.keys(fieldLabels);

        // Check if any required fields are null
        const missingFields = requiredFields.filter(
          (field) => !eventDetails[field]
        );

        if (missingFields.length > 0) {
          const missingFieldsMessage = `Please fill in the following fields: ${missingFields
            .map((field) => fieldLabels[field])
            .join(", ")}`;
          setErrorMessage(missingFieldsMessage);
          return;
        }

        const eventData = {
          ...eventDetails,
          organizerId: user.id,
          eventStarts: selectedStartDate,
          eventEnds: selectedEndDate,
          eventPicture: null,
        };

        const response = await axios.post(
          API_ENDPOINTS.CREATE_EVENT,
          eventData
        );

        if (response.status === 200) {
          uploadPicture(response.data.id, selectedFile);
          setCreateEvent(false);
          setSelectedStartDate(null),
            setSelectedEndDate(null),
            setEventPicture(undefined),
            setEventDetails({
              eventName: "",
              eventDescription: "",
              eventStarts: null,
              eventEnds: null,
              location: "",
              eventPicture: null,
              organizerId: user?.id,
            });
        } else {
          alert("Failed to upload event to the server.");
        }
      }
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
        await axios.post(API_ENDPOINTS.UPLOAD_EVENT_PICTURE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="relative flex w-[100%] max-w-[2000px]">
      {createEvent == true && (
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
                  setCreateEvent(false);
                  setSelectedStartDate(null);
                  setSelectedEndDate(null);
                  setEventPicture(undefined);
                  setEventDetails({
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
                    Create
                  </span>{" "}
                  <span className="font-['Inter'] text-3xl font-semibold text-maroon text-opacity-90">
                    Event
                  </span>
                </p>
                <div
                  className={`relative flex h-[500px] w-[500px] items-center justify-center ${
                    eventPicture ? "border-none" : "dashed-border"
                  }  `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleImageClick}
                >
                  <img
                    src={eventPicture}
                    className={`max-h-[500px] min-h-[250px] min-w-[400px] max-w-[500px] cursor-pointer ${
                      eventPicture ? "opacity-1" : "opacity-0"
                    }`}
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
                      <p className="text-gray-600 mt-10">or drop a file</p>
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
                      value={eventDetails?.eventName}
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
                      value={eventDetails?.eventDescription}
                      onChange={(e) =>
                        updateEventDetails("eventDescription", e.target.value)
                      }
                    />
                    <br />
                    <p className="text-gray">Enter Event Location</p>
                    <TextField
                      hiddenLabel
                      variant="standard"
                      value={eventDetails?.location}
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
                <div className="flex justify-end p-4">
                  <button
                    className="box-border rounded-[5px] bg-maroon px-[37px] py-[11px] text-white"
                    onClick={createEventShareClicked}
                  >
                    Share Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <div className="flex">
        <div
          style={{ width: sideBarOpen ? "300px" : "65px" }}
          className="h-[100vh] max-h-[2000px] overflow-hidden border-r-2	border-[#6363634D] text-black transition-all duration-[0.5s]"
        >
          <div className="flex flex-col py-4 pl-4">
            <div className="flex items-center gap-5">
              <MenuIcon
                onClick={toggleExpandSideBar}
                sx={{ fontSize: 30 }}
                className="cursor-pointer"
              />
              <h1
                style={{
                  whiteSpace: "nowrap",
                }}
                className="font-bold "
              >
                <span className="text-[20px] text-gold">Event</span>{" "}
                <span className="text-[20px] text-maroon">Tracker</span>
              </h1>
            </div>
            <div className="mx-[-10px] flex py-10 pr-4">
              <div
                className="flex cursor-pointer items-center gap-5 overflow-hidden rounded-[15px] border-[0.5px] p-[10px]"
                onClick={clickedCreateEvent}
              >
                {activeComponent === "HomePage" ? (
                  <>
                    <AddIcon sx={{ fontSize: 30 }} className="text-maroon" />
                    <span className="whitespace-nowrap">Create Event</span>
                  </>
                ) : (
                  <>
                    <img className="mx-1" src={BackArrow} />
                    <span className="whitespace-nowrap">Back</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <div
                className={`group ml-[-4px] flex cursor-pointer gap-5 py-2 pl-1 ${
                  activeComponent === "HomePage"
                    ? " border-r-4 border-maroon bg-zinc-300 bg-opacity-50"
                    : ""
                }`}
                onClick={() => setAndStoreActiveComponent("HomePage")}
              >
                <img src={HomeLogo} className="w-7 group-hover:brightness-75" />
                <p className=" transition-all duration-[0.5s]">Home</p>
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <div
                  className="flex cursor-pointer items-center gap-5 py-2"
                  onClick={toggleExpandMore}
                >
                  {expandMore ? (
                    <ExpandLessIcon
                      sx={{ fontSize: 30 }}
                      className="text-gray"
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{ fontSize: 30 }}
                      className="text-gray"
                    />
                  )}
                  <p>More</p>
                </div>
                {expandMore && (
                  <div
                    className={`ml-12 cursor-pointer whitespace-nowrap py-2 pl-2 ${
                      activeComponent === "Your Events"
                        ? " border-r-4 border-maroon bg-zinc-300 bg-opacity-50"
                        : ""
                    }`}
                    onClick={() => setAndStoreActiveComponent("Your Events")}
                  >
                    Your Events
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] flex-col">
        <TopBar />
        <div className="h-[100px] flex-grow  ">
          {activeComponent && activeComponent === "HomePage" && (
            <div className="customized_scrollbar h-full">
              <HomePage />
            </div>
          )}
          {activeComponent && activeComponent === "Your Events" && (
            <div className="customized_scrollbar h-full">
              <YourEvents />
            </div>
          )}
          {activeComponent && activeComponent === "Profile" && (
            <div className="customized_scrollbar h-full bg-zinc-600 bg-opacity-5">
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerView;
