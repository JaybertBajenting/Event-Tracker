import { motion } from "framer-motion";
import Header from "@/includes/header";
import SearchBar from "@/searchbars/SearchBar";
import BG2 from "@/assets/BG2.png";
import ThirdDivImg from "@/assets/ThirdDivImg.png";
import useMediaQuery from "@/hooks/useMediaQuery";

const ThirdDiv = () => {
  return (
    <div className="w-full py-20">
      <div className="mx-auto max-w-[2000px] bg-[url('@/assets/BG2.png')] bg-cover small:px-[100px]">
        <div className=" grid gap-[2.5rem] medium:grid-flow-col">
          <motion.div
            className="my-auto max-h-[80%]"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h1 className="my-auto font-bold leading-[1.1em] text-maroon xs:inline xs:text-[32px] medium:block medium:text-[55px]">
              Discover Exciting University
            </h1>{" "}
            <h1 className="font-bold leading-[1.1em] text-gold xs:inline xs:text-[32px] medium:block medium:text-[55px]">
              Events with our Event Tracker
            </h1>
            <p className="mt-4 xs:text-[18px] small:text-[30px]">
              Stay up-to-date with the latest events happening on campus. Our
              Event Tracker provides a comprehensive platform to explore and
              engage in a wide range of activities.
            </p>
          </motion.div>
          <div className="flex justify-center">
            <div>
              <img
                alt="home-logo"
                src={ThirdDivImg}
                className="small:min-w-[400px]"
              />
            </div> 
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdDiv;
