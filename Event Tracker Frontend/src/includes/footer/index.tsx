import React, { useState } from "react";
import evlogo from "@/assets/evlogo.png";
import SignIn from "@/modals/SignIn";
import { useModalState } from "@/context/Modal";
import { motion } from "framer-motion";

const Footer = () => {
  const { showModal, openModal } = useModalState();
  const [activeComponent, setActiveComponent] =
    useState<React.ReactNode | null>(null);
  const handleClickSignIn = (e: any) => {
    setActiveComponent(<SignIn initialView={e} />);
    openModal();
  };
  return (
    <div className="w-full max-w-[2000px] mx-auto">
    {showModal && activeComponent}
      <div className="flex flex-col items-center justify-center bg-fill xs:min-h-[260px] xs:bg-maroon small:bg-[url('@/assets/BG3.png')] medium:min-h-[600px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: -50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h1 className="text-center font-bold text-white medium:-mt-[100px] medium:text-[60px]">
            Discover Exciting University Events
          </h1>
          <p className="text-center text-white xs:text-[8px] medium:mt-[15px] medium:text-[25px]">
            Stay up-to-date with the latest events happening on campus
          </p>
        </motion.div>
        <div className="mt-10 flex gap-5">
          <button className="box-border w-[165px] rounded-md border border-gold py-[15px] text-[25px] font-semibold text-white" onClick={() => handleClickSignIn("SignUp")}>
            Join
          </button>
          <button className="box-border w-[165px] rounded-md bg-gold py-[15px] text-[25px] font-semibold text-white" onClick={() => {window.location.href = '/DiscoverEvents';}}>
            Explore
          </button>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center md:justify-center medium:my-3 large:px-[350px] medium:px-[200px] xs:px-[50px] small:px-[100px]">
        <div className="xs:mt-6 md:mt-0">
          <img
            src={evlogo}
            alt="Logo"
            className="xs:max-w-[50px] medium:max-w-[150px] "
          />
        </div>
        <div className="mt-6 flex w-full justify-between whitespace-nowrap border-b border-zinc-300 text-[10px] medium:mt-0 medium:gap-[100px]  medium:py-10 medium:text-lg">
          <a href="Calendar" className="text-[#3C3C3C]">
            Event Calendar
          </a>
          <a href="ContactUs" className="text-[#3C3C3C]">
            Contact Us
          </a>
          <a href="PrivacyPolicy" className="text-[#3C3C3C]">
            Privacy Policy
          </a>
          <a href="TermsAndCondition" className="text-[#3C3C3C]">
            Terms and Conditions
          </a>
        </div>
        <div className="mt-6 text-gray xs:text-xs medium:text-lg">
          2023 Event Tracker. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
