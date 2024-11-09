import { useAuth } from "@/context/Auth";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HomeLogo from "@/assets/Home.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomePage from "./HomePage";
import AttendedEvents from "./AttendedEvents";
import Profile from "../Profile";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BackArrow from "@/assets/backarrow.png";
import TopBar from "@/includes/topbar";
import { useActiveComponent } from "@/context/ActiveComponent";
import BrowseEvents from "./BrowseEvents";
interface UserViewProps {
  initialView: "HomePage";
}
const UserView: React.FC<UserViewProps> = () => {
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

  const { user, updateUser } = useAuth();

  const [updateFormData, setUpdateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setUpdateFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        idNumber: user.idNumber || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const handleupdateFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateUser = () => {
    const { firstName, lastName, email, idNumber, password } = updateFormData;

    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      idNumber.trim() &&
      password.trim()
    ) {
      const formDataToUpdate = {
        firstName,
        lastName,
        email,
        idNumber,
        password,
      };
      updateUser(formDataToUpdate);
    } else {
      alert("Some fields are blank!");
    }
  };

  
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const clickedBrowseEvents = () => {
    if(activeComponent == "HomePage"){
      setAndStoreActiveComponent("Browse Events");
    } else {
      setAndStoreActiveComponent("HomePage");
    }
  };
  return (
    <div className="relative flex w-[100%] max-w-[2000px]">
      {(!user?.firstName || !user?.lastName) && (
        <div className="absolute top-0 left-0 z-50 flex  h-[100%] max-h-[2000px] w-[100%]  flex-col items-center justify-center backdrop-blur-[5px]">
          <div className="relative flex h-[75%]  w-[70%]">
            <div className="customized_scrollbar flex flex-1 flex-col gap-10 overflow-auto rounded-[10px] bg-white p-[40px] shadow">
              <div className="mb-10 text-[27px] font-medium text-neutral-700">
                Complete Your Profile <span className="text-red-500">*</span>
              </div>
              <div className="flex w-[100%] flex-1 flex-col">
                <div className="grid flex-1 grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-neutral-700 text-opacity-70 ">
                      First Name <span className="text-red-500">*</span>
                    </p>
                    <input
                      name="firstName"
                      value={updateFormData.firstName}
                      onChange={handleupdateFormChange}
                      className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-neutral-700 text-opacity-70 ">
                      Last Name <span className="text-red-500">*</span>
                    </p>
                    <input
                      name="lastName"
                      value={updateFormData.lastName}
                      onChange={handleupdateFormChange}
                      className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-neutral-700 text-opacity-70 ">
                      Username/Email address
                      <span className="text-red-500">*</span>
                    </p>
                    <input
                      name="email"
                      value={updateFormData.email}
                      onChange={handleupdateFormChange}
                      className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3 text-neutral-700"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl text-neutral-700 text-opacity-70 ">
                      Password <span className="text-red-500">*</span>
                    </p>
                    <div
                      style={{ position: "relative" }}
                      className="max-w-[500px]"
                    >
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={updateFormData.password}
                        onChange={handleupdateFormChange}
                        className="h-[62.87px] w-full rounded-md border border-zinc-600 border-opacity-70 indent-3"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          zIndex: "1",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xl  text-neutral-700 text-opacity-70 ">
                      Id Number <span className="text-red-500">*</span>
                    </p>
                    <input
                      name="idNumber"
                      value={updateFormData.idNumber}
                      onChange={handleupdateFormChange}
                      className="h-[62.87px] max-w-[500px] rounded-md border border-zinc-600 border-opacity-70 indent-3"
                    />
                  </div>
                </div>
                <div className=" self-end ">
                  <button
                    onClick={handleUpdateUser}
                    className="box-border rounded-md bg-maroon px-[37px] py-[11px] text-white"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
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
                onClick={clickedBrowseEvents}
              >
                {activeComponent === "HomePage" ? (
                  <>
                    <FilterListIcon
                      sx={{ fontSize: 30 }}
                      className="text-maroon"
                    />
                    <span className="whitespace-nowrap">Browse Events</span>
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
                className={`flex cursor-pointer gap-5 py-2 pl-1 ml-[-4px] group ${
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
                      activeComponent === "Attended Events"
                        ? " border-r-4 border-maroon bg-zinc-300 bg-opacity-50"
                        : ""
                    }`}
                    onClick={() => setAndStoreActiveComponent("Attended Events")}
                  >
                    Attended Events
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[100%] flex-col">
        <TopBar/>
        <div className="h-[100px] flex-grow  ">
          {activeComponent && activeComponent === "HomePage" && (
            <div className="customized_scrollbar h-full">
              <HomePage />
            </div>
          )}
          {activeComponent && activeComponent === "Attended Events" && (
            <div className="customized_scrollbar h-full">
              <AttendedEvents />
            </div>
          )}
          {activeComponent && activeComponent === "Profile" && (
            <div className="customized_scrollbar h-full bg-zinc-600 bg-opacity-5">
              <Profile />
            </div>
          )}
          {activeComponent && activeComponent === "Browse Events" && (
            <div className="customized_scrollbar h-full bg-zinc-600 bg-opacity-5">
              <BrowseEvents />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default UserView;
