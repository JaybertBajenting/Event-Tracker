import { useAuth } from "@/context/Auth";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@/searchbars/SearchBar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { useActiveComponent } from "@/context/ActiveComponent";

const TopBar = () => {
  const { activeComponent, setAndStoreActiveComponent } = useActiveComponent();
  const [clickedProfileImage, setClickedProfileImage] = useState(false);
  const handleProfileImageClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setClickedProfileImage(!clickedProfileImage);
  };

  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setClickedProfileImage(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setClickedProfileImage]);

  const { user, logout, deleteUser } = useAuth();

  return (
    <div className="flex h-[100px] w-[100%] items-center justify-end gap-12 pr-8 pt-8">
      <div className="w-[500px]	rounded-full shadow">
        <SearchBar />
      </div>
      <button>
        <NotificationsNoneIcon sx={{ fontSize: "40px", opacity: "50%" }} />
      </button>
      <div
        className="flex h-[50px] w-[50px] cursor-pointer items-center justify-center overflow-hidden rounded-[50%]"
        onClick={handleProfileImageClick}
      >
        <Avatar
          sx={{
            width: 50,
            height: 50,
            overflow: "hidden",
            position: "relative",
          }}
          src={`data:image;base64,${user?.profilePicture}`}
          alt={user?.firstName}
        >
        </Avatar>
      </div>
      {clickedProfileImage && (
        <div
          ref={profileDropdownRef}
          className="absolute top-28 z-[1] flex w-[275px] flex-col rounded-[10px] bg-white shadow"
        >
          <div className=" flex h-[50px] items-center justify-evenly border-b border-zinc-600 border-opacity-50">
            <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-[50%]">
              <Avatar
                onClick={() => {
                  setAndStoreActiveComponent("Profile");
                  setClickedProfileImage(false);
                }}
                sx={{
                  width: 50,
                  height: 50,
                  overflow: "hidden",
                  position: "relative",
                }}
                className="cursor-pointer border-4 border-white"
                src={`data:image;base64,${user?.profilePicture}`}
                alt={user?.firstName}
              ></Avatar>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[15px] font-semibold text-zinc-600">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-zinc-600 text-opacity-80">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col text-[15px] font-medium text-zinc-600 text-opacity-80">
            <p
              className="flex flex-1 py-2 cursor-pointer items-center pl-5 font-medium hover:bg-gold "
              onClick={() => {
                setAndStoreActiveComponent("Profile");
                setClickedProfileImage(false);
              }}
            >
              Profile
            </p>
            {user?.userRole !== "Admin" && (
              <p
                onClick={() => {
                  deleteUser();
                  setClickedProfileImage(false);
                }}
                className="flex flex-1 py-2  cursor-pointer items-center pl-5 font-medium hover:bg-gold"
              >
                Delete Account
              </p>
            )}
            <p
              className="flex  flex-1 py-2 cursor-pointer items-center rounded-b-[10px] pl-5 font-medium hover:bg-gold "
              onClick={logout}
            >
              Sign Out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
