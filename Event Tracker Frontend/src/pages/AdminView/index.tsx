import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeLogo from "@/assets/Home.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomePage from "./HomePage";
import Events from "./Events";
import Profile from "../Profile";
import BackArrow from "@/assets/backarrow.png";
import TopBar from "@/includes/topbar";
import { useActiveComponent } from "@/context/ActiveComponent";
import Location from "@/assets/LocationAdmin.png";

interface AdminViewProps {
  initialView: "HomePage";
}
const AdminView: React.FC<AdminViewProps> = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [expandMore, setExpandMore] = useState(false);
  const toggleExpandSideBar = () => {
    setSideBarOpen(!sideBarOpen);
    setExpandMore(false);
  };
  const toggleExpandMore = () => {
    setExpandMore(!expandMore);
  };

  const { activeComponent, setAndStoreActiveComponent } = useActiveComponent();

  const clickedViewEvents = () => {
    if (activeComponent != "HomePage") {
      setAndStoreActiveComponent("HomePage");
    } else {
        setAndStoreActiveComponent("Events");
    }
  };

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(true);

  const handleConfirm = () => {};

  const handleCancel = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="relative flex w-[100%] max-w-[2000px]">
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
                onClick={clickedViewEvents}
              >
                {activeComponent === "HomePage" ? (
                  <>
                    <img src={Location} className="ml-1 h-[20px] w-[20px]" />
                    <span className="whitespace-nowrap">View Events</span>
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
                      activeComponent === "Events"
                        ? " border-r-4 border-maroon bg-zinc-300 bg-opacity-50"
                        : ""
                    }`}
                    onClick={() => setAndStoreActiveComponent("Events")}
                  >
                    Events
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
          {activeComponent && activeComponent === "Events" && (
            <div className="customized_scrollbar h-full">
              <Events />
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

export default AdminView;
