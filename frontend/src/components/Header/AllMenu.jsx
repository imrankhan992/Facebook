import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import AllMenuIItem from "./AllMenuIItem";
import useClickOutside from "@/helpers/clickOutSide";
import { create } from "@/data/allMenu";

const AllMenu = ({ showAllMenu, setShowAllMenu }) => {
  const menuRef = useRef(null);

  // Call useClickOutside hook to detect clicks outside of the menuRef
  useClickOutside(menuRef, () => {
    // Only close if the menu is open
    if (showAllMenu) {
      setShowAllMenu(false);
    }
  });

  return (
    <div
      ref={menuRef}
      className={`
        bg-secondaryColor2 animate-slide-up-fade-in
        fixed top-14 left-1/2 transform -translate-x-1/2
        w-full max-w-[90vw] md:max-w-[600px] lg:max-w-[800px]
        px-3 rounded-xl shadow-md z-50
        lg:top-11 lg:transform-none lg:-left-[27.5rem]
        lg:min-w-[600px] lg:px-3 lg:rounded-xl lg:shadow-md lg:absolute
      `}
    >
      <h3 className="py-2 text-start font-bold text-2xl">Menu</h3>
      <div className="lg:grid grid-cols-3 gap-4">
        {/* Menu */}
        <div className="lg:col-span-2 overflow-auto scrollbar-hide flex flex-col items-center gap-4 md:gap-2 lg:gap-4 h-full mb-2 bg-white px-2 py-4 rounded-lg border-shadow max-h-[80vh]">
          <form className="sm:flex-initial w-full">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground focus:outline-none" />
              <Input
                type="search"
                placeholder="Search menu"
                className="pl-8 w-full rounded-full bg-secondaryColorBg"
              />
            </div>
          </form>
          <AllMenuIItem />
        </div>
        {/* Create */}
        <div className="lg:block col-span-1 overflow-auto flex-col scrollbar-hide flex md:gap-2 lg:gap-4 h-full mb-2 bg-white px-2 rounded-lg border-shadow max-h-[80vh]">
          <p className="text-start font-bold text-xl p-2">Create</p>
          <div className="flex cursor-pointer flex-col items-start text-start justify-center border-b pb-4 border-b-black">
            {create.slice(0, 4).map((item, index) => (
              <div
                key={index}
                className="flex gap-5 items-center hover:bg-secondaryColorBg p-2 w-full rounded-lg"
              >
                <div className="bg-[#D8DADF] w-10 h-10 items-center justify-center flex rounded-full">
                  <i className={item.icon}></i>
                </div>
                <p className="text-[14px] font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start text-start justify-center border-b pb-4">
            {create.slice(4, 9).map((item, index) => (
              <div
                key={index}
                className="flex gap-5 items-center cursor-pointer p-2 w-full hover:bg-secondaryColorBg rounded-lg"
              >
                <div className="bg-[#D8DADF] w-10 h-10 items-center justify-center flex rounded-full">
                  <i className={item.icon}></i>
                </div>
                <p className="text-[14px] font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
