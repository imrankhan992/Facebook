import React, { useState } from "react";
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
    <div className="flex flex-col w-full h-full relative">
      {/* Header Section */}
      <div className="flex h-32 lg:h-14 fixed top-0 left-0 right-0 z-50 lg:gap-4 border-b bg-background px-3 lg:px-4 shadow-md">
        <div className="flex  flex-wrap justify-between items-center w-full">
          <div className="flex items-center gap-5 lg:gap-6">
            {!showSearchInput && (
              <Link to="#">
                <img
                  src={facebookLogo}
                  alt=""
                  className="h-10 w-10"
                />
              </Link>
            )}

            {!showSearchInput && (
              <div className="flex items-center gap-4">
                <form>
                  <div className="relative hidden lg:block">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      onClick={() => setShowSearchInput(true)}
                      type="search"
                      placeholder="Search Facebook"
                      className="pl-8 rounded-full bg-secondaryColorBg"
                    />
                  </div>
                </form>
              </div>
            )}

            {!showSearchInput && (
              <div
                className="lg:hidden block"
                onClick={() => setShowSearchInput(true)}
              >
                <Search className="bg-secondaryColorBg h-10 w-10 rounded-full p-2.5 text-muted-foreground" />
              </div>
            )}

            {showSearchInput && (
              <SearchMenu setShowSearchInput={setShowSearchInput} />
            )}
          </div>

          <HeaderTabs />

         <div className="relative">
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

      {/* Main Content Area */}
      <div className="flex flex-1 ">{children}</div>
    </div>
  );
};

export default Index;
