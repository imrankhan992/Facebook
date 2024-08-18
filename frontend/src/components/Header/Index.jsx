import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import facebookLogo from "/icons/icon.png";

import { Input } from "@/components/ui/input";

import ToggleBar from "./ToggleBar";
import { HeaderTabs } from "./Tabs";

import MenuSection from "./MenuSection";

import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";

const Index = ({ children }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  console.log(showAllMenu);

  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <div className="sticky top-0 flex h-14 items-center  gap-4 border-b bg-background px-4 md:px-4  shadow-md">
        <div className="flex justify-between  w-full">
          <div className="hidden relative  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {!showSearchInput && (
              <Link href="#">
                {/* <Package2 className="h-6 w-6" /> */}
                <img
                  src={facebookLogo}
                  alt=""
                  className="h-10 w-10 absolute -translate-y-1/2"
                />
                {/* <span className="sr-only bg-red-500">Acme Inc</span> */}
              </Link>
            )}

            <ToggleBar />

            {!showSearchInput && (
              <div className="flex items-center gap-4 ml-9 md:gap-2 lg:gap-4">
                <form className="  sm:flex-initial">
                  <div className="relative">
                    <Search
                      className={`absolute left-2.5 top-3 h-4 w-4 text-muted-foreground focus:outline-none ${
                        showSearchInput ? "slide-search-icon" : ""
                      }`}
                    />
                    <Input
                      onClick={() => setShowSearchInput(true)}
                      type="search"
                      placeholder="Search Facebook"
                      className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[240px] rounded-full bg-secondaryColorBg"
                    />
                  </div>
                </form>
              </div>
            )}
            {showSearchInput && (
              <SearchMenu setShowSearchInput={setShowSearchInput} />
            )}
          </div>

          <div className="md:flex  -bottom-0 inset-0   hidden  items-end max-w-[50%] mx-auto absolute justify-center ">
            <HeaderTabs />
          </div>

          <div className="relative ">
            <MenuSection
              setShowAllMenu={setShowAllMenu}
              showAllMenu={showAllMenu}
            />
            {showAllMenu && (<AllMenu showAllMenu={showAllMenu} setShowAllMenu={setShowAllMenu} />)}
          </div>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};
export default Index;
