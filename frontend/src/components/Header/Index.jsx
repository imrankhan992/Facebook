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
import UserMenu from "./UserMenu/Index";

const Index = ({ children }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="flex  w-full flex-col relative  ">
      <div className="  flex h-32 lg:h-14   lg:gap-4 border-b bg-background px-3 lg:px-4  !w-full shadow-md ">
        <div className="flex justify-between  items-start lg:items-center pt-6 lg:pt-0   !w-full ">
          <div className=" relative   text-lg font-medium flex flex-row items-center gap-5 md:text-sm lg:gap-6 ">
            {!showSearchInput && (
              <Link href="#">
                <img
                  src={facebookLogo}
                  alt=""
                  className="h-10 w-10 absolute -translate-y-1/2"
                />
              </Link>
            )}

            {/* <ToggleBar /> */}

            {!showSearchInput && (
              <div className="flex items-center gap-4 ml-9 md:gap-2 lg:gap-4">
                <form className="  sm:flex-initial">
                  <div className="relative lg:block hidden">
                    <Search
                      className={`absolute  left-2.5 top-3 h-4 w-4 text-muted-foreground focus:outline-none ${
                        showSearchInput ? "slide-search-icon" : ""
                      }`}
                    />
                    <Input
                      onClick={() => setShowSearchInput(true)}
                      type="search"
                      placeholder="Search Facebook"
                      className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[230px] rounded-full bg-secondaryColorBg"
                    />
                  </div>
                </form>
              </div>
            )}

            {!showSearchInput&& <div className="lg:hidden block "   onClick={() => setShowSearchInput(true)}>
              <Search
                className={` bg-secondaryColorBg h-10 w-10 rounded-full p-2.5 text-muted-foreground focus:outline-none ${
                  showSearchInput ? "slide-search-icon" : ""
                }`}
              />
            </div>}
            {showSearchInput && (
              <SearchMenu setShowSearchInput={setShowSearchInput} />
            )}
          </div>

          <div className="md:flex bottom-1 lg:-bottom-0 lg:inset-0  inset-x-2   items-end w-full lg:max-w-[50%] mx-auto absolute justify-center ">
            <HeaderTabs />
          </div>

          <div className="relative ">
            <MenuSection
              setShowAllMenu={setShowAllMenu}
              showAllMenu={showAllMenu}
              setShowUserMenu={setShowUserMenu}
              showUserMenu={showUserMenu}
            />
            {showAllMenu && (
              <AllMenu
                showAllMenu={showAllMenu}
                setShowAllMenu={setShowAllMenu}
              />
            )}
            {showUserMenu && (
              <UserMenu
                setShowUserMenu={setShowUserMenu}
                showUserMenu={showUserMenu}
              />
            )}
          </div>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};
export default Index;
