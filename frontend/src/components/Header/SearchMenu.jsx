import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import useClickOutSide from "@/helpers/clickOutSide";

const SearchMenu = ({ setShowSearchInput }) => {
  const element = useRef(null);
  const inputRef = useRef(null);

  useClickOutSide(element, () => {
    setShowSearchInput(false);
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="flex items-center gap-4 md:gap-2 lg:gap-4 relative"
      ref={element}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-left text-gray-500 z-20 cursor-pointer "
        onClick={() => setShowSearchInput(false)}
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      <form className="sm:flex-initial z-20">
        <div className="relative">
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search Facebook"
            className="pl-4 sm:w-[300px] md:w-[200px] lg:w-[240px] rounded-full bg-secondaryColorBg focus:outline-none focus:ring-0"
          />
        </div>
      </form>
      {/* Apply the animation class here */}
      <div className="bg-white shadow-lg rounded-r-xl rounded-bl-xl  min-h-[15vh] absolute inset-0 -left-4 z-10 flex justify-center items-center pt-10 animate-slide-up-fade-in">
        <p>No recent searches</p>
      </div>
    </div>
  );
};

export default SearchMenu;
