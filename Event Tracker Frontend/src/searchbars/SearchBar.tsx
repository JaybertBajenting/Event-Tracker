import { useState } from "react";
import searchicon from "@/assets/searchicon.png";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    alert("Searching for: " + searchQuery);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
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
  );
};

export default SearchBar;
