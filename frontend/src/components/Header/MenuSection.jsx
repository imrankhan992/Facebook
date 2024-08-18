import React, { useState, useMemo, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import ProfileAvatar from "./ProfileAvatar";

const MenuSection = ({ setShowAllMenu, showAllMenu }) => {
  console.log("MenuSection rendered");
  console.log("showAllMenu:", showAllMenu);

  const Data = useMemo(
    () => [
      {
        icon: <BsGrid3X3GapFill className="w-6 h-6" />,
        tooltip: "Menu",
      },
      {
        icon: <FaFacebookMessenger className="w-6 h-6" />,
        tooltip: "Messenger",
      },
      {
        icon: <IoMdNotifications className="w-6 h-6" />,
        tooltip: "Notifications",
      },
      {
        icon: <ProfileAvatar />,
        tooltip: "Profile",
      },
    ],
    []
  );

  const handleMenuToggle = useCallback(() => {
   
    setShowAllMenu((prevState) => !prevState);
  }, [setShowAllMenu]);

  const handleClick = useCallback(
    (tooltip) => {
      console.log("handleClick called with tooltip:", tooltip);
      if (tooltip === "Menu") {
        handleMenuToggle();
      }
    },
    [handleMenuToggle]
  );

  return (
    <div className="flex items-center justify-center gap-1.5">
      {Data.map((item, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => handleClick(item.tooltip)}
                className={`w-10 h-10 relative flex items-center bg-secondaryColorBg justify-center rounded-full ${
                  item.tooltip === "Notifications" ? "p-2" : "p-2.5"
                }`}
              >
                {item.icon}

                {item.tooltip === "Notifications" && (
                  <p className="absolute text-white font-bold rounded-full w-5 p-1 flex items-center justify-center h-5 -top-1.5 -right-1.5 bg-[#e41e3f] text-[11px] -leading-3">
                    9
                  </p>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-black opacity-70">
              <p className="text-white">{item.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      
    </div>
  );
};

export default MenuSection;