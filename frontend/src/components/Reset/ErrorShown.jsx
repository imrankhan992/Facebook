import { Link } from "@tanstack/react-router";
import React from "react";
import { Button } from "../ui/button";

const ErrorShown = ({handleReload,navigate}) => {
  return (
    <div className="flex items-center justify-between mt-5 flex-col gap-3 min-h-[60vh]">
      <div className="relative  border-l-[50px] w-full border-[#FA3E3E] border-y-2 border-r-2 min-h-20 max-w-[70vw] p-4  rounded-md">
        <div className="absolute -left-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FA3E3E"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold">
          The link you used is invalid. Please try again.
        </h3>
        <div>
          <p>
            It seems like the link you tried to use is no longer valid. This
            could be because:
          </p>
          <ul className="list-disc ml-5">
            {" "}
            {/* Added list-disc and ml-5 for styling */}
            <li>
              The link has expired. Password reset links are time-sensitive.
            </li>
            <li>The link may have been copied incorrectly.</li>
            <li>The link has already been used to reset your password.</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-end min-w-[70vw]  gap-3">
       
          <Button onClick={()=>{navigate({to:"/login"})}} className="bg-secondaryColorBg text-black px-4 font-semibold text-[15px] border">
            Go to login
          </Button>
       
        <Button className="bg-blueColor hover:bg-blueColor px-4 font-semibold text-[15px]" onClick={handleReload}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ErrorShown;
