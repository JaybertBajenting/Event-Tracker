import homelogo from "@/assets/logo-no-text.png";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import searchicon from "@/assets/searchicon.png";
import { useNavigate } from "react-router-dom";
const FirstDiv = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/DiscoverEvents?query=${searchQuery}`);
  };
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[2000px]">
        <div
          className={` mx-auto max-w-[80%] xs:my-[100px] small:my-[150px]  ${
            isAboveMediumScreens ? "flex-row" : "flex-col"
          } flex medium:items-center medium:justify-between `}
        >
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="text-[48px] leading-[1em] small:text-[96px]">
              <h1 className="font-bold text-gold ">EVENT</h1>
              <h1 className="font-bold text-maroon">TRACKER</h1>
              <p className="text-[25px] leading-none text-gray small:whitespace-nowrap">
                A portal to learn more about events in the university
              </p>
            </div>
          </motion.div>
          <div>
            <img
              alt="home-logo"
              src={homelogo}
              className="small:min-w-[400px]"
            />
            <div className="mx-auto w-10/12	rounded-full  shadow">
              <div className="relative flex items-center">
                <input
                  id="search-bar"
                  type="text"
                  placeholder="Search for Event"
                  className="h-[50px] w-full rounded-full border border-gray indent-5 outline-none"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <img
                  src={searchicon}
                  alt="Search Icon"
                  className="absolute right-7 inline cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstDiv;
