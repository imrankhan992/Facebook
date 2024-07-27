import React from "react";
import { Link } from "react-router-dom";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import facebookLogo from "/icons/icon.png";

import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BsGrid3X3GapFill } from "react-icons/bs";
import ToggleBar from "./ToggleBar";
import { HeaderTabs } from "./Tabs";
import ProfileAvatar from "./ProfileAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import MenuSection from "./MenuSection";

const Index = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="sticky top-0 flex h-14 items-center  gap-4 border-b bg-background px-4 md:px-4  shadow-md">
        <div className="flex justify-between  w-full">
          <div className="hidden   flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="#">
              {/* <Package2 className="h-6 w-6" /> */}
              <img
                src={facebookLogo}
                alt=""
                className="h-10 w-10 absolute -translate-y-1/2"
              />
              {/* <span className="sr-only bg-red-500">Acme Inc</span> */}
            </Link>

            <ToggleBar />

            <div className="flex items-center gap-4 ml-9 md:gap-2 lg:gap-4">
              <form className="  sm:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground focus:outline-none" />
                  <Input
                    type="search"
                    placeholder="Search Facebook"
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[240px] rounded-full bg-secondaryColorBg"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="flex  -bottom-0 inset-0    items-end max-w-[50%] mx-auto absolute justify-center ">
            <HeaderTabs />
          </div>

          <MenuSection/>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Index;
