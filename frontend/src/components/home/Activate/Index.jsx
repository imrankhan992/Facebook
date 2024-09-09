import Index from "@/components/Header/Index";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import LeftLink from "../LeftLink";
import Stories from "../Stories/Index";
import CreatePost from "../Posts/CreatePost";
import ActivateEmail from "./ActivateEmail";
import { left } from "@/data/home";
import { ArrowDown1 } from "@/svg";
import { useQuery } from "@tanstack/react-query";
import { activateEmail } from "@/apis/api";

import { useParams } from "@tanstack/react-router";

const ActivateEmailHome = () => {
  const user = useSelector((state) => state?.user || null);

  const token = useParams({
    from: "/activate/$token",
    select: (params) => params.token,
  });
  const [showMore, setShowMore] = useState(false);
  const visibleLinks = showMore ? left : left.slice(0, 6);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const { isLoading, data, isError, error, isPaused, isFetching, status } =
    useQuery({
      queryKey: ["activate", user?._id],
      queryFn: () => activateEmail(token, user),
      enabled: !!user && !!token,
    });

  return (
    <Index>
      <div className="flex w-full ">
        <ActivateEmail
          isLoading={isLoading}
          data={data}
          isError={isError}
          error={error}
          isPaused={isPaused}
          isFetching={isFetching}
          status={status}
        />
        {/* Left Section */}
        <div className=" top-0 h-screen w-1/4 overflow-y-auto scroll-bar-thin bg-[#F0F2F5] p-4 hidden lg:block pt-20">
          <div className="flex flex-col gap-1 cursor-pointer">
            <div className="flex items-center justify-start gap-3 hover:bg-hover2 p-2 rounded-md">
              <img
                src="https://res.cloudinary.com/dbcopekhr/image/upload/v1724406930/5b305fca208d6162872c715f4c7643e1_bcpefg.jpg"
                className="bg-white rounded-full"
                width={30}
                alt=""
              />
              <span className="font-semibold text-[14.5px]">
                {user?.first_name + " " + user?.last_name}
              </span>
            </div>
            {visibleLinks.map((link, i) => (
              <LeftLink
                key={i}
                img={link.img}
                text={link.text}
                notification={link.notification}
              />
            ))}
            {/* See More/See Less Toggle */}
            <button
              onClick={toggleShowMore}
              className=" mt-2  flex items-center gap-3 hover:bg-hover2 p-2 rounded-md"
            >
              <div
                className={`bg-[#D8DADF] w-8 h-8 rounded-full items-center justify-center flex  ${
                  showMore ? "rotate-180" : ""
                }`}
              >
                <ArrowDown1 />
              </div>
              <span className="flex items-center text-black font-semibold text-[16px]">
                {" "}
                {showMore ? "See Less" : "See More"}
              </span>
            </button>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 overflow-y-auto px-4  pt-16 bg-[#F0F2F5]  scrollbar-hide h-screen">
          <Stories />
          <CreatePost />
        </div>

        {/* Right Section */}
        <div className=" top-0 h-screen w-1/4 bg-[#F0F2F5] p-4 hidden lg:block">
          <div className="pt-20">Right Sidebar Content</div>
        </div>
      </div>
    </Index>
  );
};

export default ActivateEmailHome;
