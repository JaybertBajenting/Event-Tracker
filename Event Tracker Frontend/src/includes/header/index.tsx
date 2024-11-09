import React, { useState } from "react";
import evlogo from "@/assets/evlogo.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import SignIn from "@/modals/SignIn";
import { useModalState } from "@/context/Modal";

const Header: React.FC = () => {
  const { showModal, openModal } = useModalState();
  const [activeComponent, setActiveComponent] =
    useState<React.ReactNode | null>(null);

  const handleClickSignIn = (e: any) => {
    setActiveComponent(<SignIn initialView={e} />);
    openModal();
  };
  const flexBetween = "flex items-center justify-between";
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  return (
    <nav className="w-full px-[6rem] py-[0.5rem]">
      {showModal && activeComponent}
      <div className="mx-auto max-w-[2000px]">
        {/*small:max-w-[720px] medium:max-w-[960px] large:max-w-[1165px] */}
        {/* RIGHT SIDE */}
        {isAboveMediumScreens ? (
          <div className={`${flexBetween}`}>
            <img alt="logo" src={evlogo} className=" w-28" />
            <div
              className={`${flexBetween} whitespace-nowrap text-[18px] small:gap-[50px] large:gap-[100px]`}
            >
              <Link to="/">Home</Link>
              <Link to="/AboutUs">About Us</Link>
              <Link to="/DiscoverEvents">Discover Events</Link>
            </div>
            <div className={`${flexBetween} gap-[50px] whitespace-nowrap`}>
              <button
                className="box-border rounded-md border border-maroon bg-none px-[25px] py-[10px] text-maroon "
                onClick={() => handleClickSignIn("SignUp")}
              >
                Sign-Up
              </button>
              <button
                className="box-border rounded-md bg-maroon px-[37px] py-[11px] text-white"
                onClick={() => handleClickSignIn("Login")}
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className={`${flexBetween}`}>
            <img alt="logo" src={evlogo} className=" w-28" />
            <button
              className="rounded-full bg-secondary-500 p-2"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          </div>
        )}
      </div>
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-maroon drop-shadow-xl">
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="text-gray-400 h-6 w-6" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link to="/">Home</Link>
            <Link to="/AboutUs">About Us</Link>
            <Link to="/DiscoverEvents">Discover Events</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
