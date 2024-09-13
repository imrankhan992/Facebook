import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { Input } from "../ui/input";
import facebook from "/icons/facebook.svg";
import { useMutation } from "@tanstack/react-query";
import { reset_password_verify_code } from "@/apis/api";

const SendCode = () => {
  const { isPending, isPaused, isError, error, mutate } = useMutation({
    mutationFn: reset_password_verify_code,
  });
  const searchParams = useSearch({
    from: "/recover/code",
    select: (search) => search,
  });
  const [resetCode, setResetCode] = useState("");
  return (
    <div className="bg-secondaryColorBg min-h-screen w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white px-5 py-1 w-full border-shadow">
        <img src={facebook} alt="" width={140} height={140} />
      </div>
      {/* Reset Section */}
      <div className="flex flex-1 justify-center items-center ">
        <div className="bg-white border-shadow w-[90vw]   md:max-w-[500px] rounded-md ">
          <div className="px-4 py-4 border-b flex items-center justify-start">
            <h2 className="text-xl  font-bold text-[#162643]">
              Enter security code
            </h2>
          </div>
          {isError && (
            <div className="px-4 mt-2">
              <div className="relative  border-l-[30px] w-full border-[#FA3E3E] border-y-2 border-r-2 min-h-12  p-2  rounded-md ">
                <div className="absolute -left-7">
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

                <p className="text-black text-sm font-normal">
                  {error?.message}
                </p>
              </div>
            </div>
          )}
          <div>
            <h3 className="px-4 text-[17.5px] pt-3 leading-5 font-normal">
              Please check your emails for a message with your code. Your code
              is 6 numbers long
            </h3>
          </div>
          {/* info */}
          <div className="flex items-center justify-between px-4 gap-4 py-3.5">
            <div className="flex items-center justify-center  flex-col  gap-2 w-full">
              <Input
                onChange={(e) => setResetCode(e.target.value)}
                type="text"
                name="code"
                className="w-full border border-gray-300 py-6 text-lg rounded-md focus:placeholder:opacity-50 transition-opacity duration-1000"
                placeholder="Enter code "
              />
            </div>
            <div className="text-lg flex items-start justify-start w-full">
              <p className="text-[16px]">
                We sent your code to: <br />{" "}
                <span className="text-sm pt-6">{searchParams["em[0]"]}</span>
              </p>
            </div>
          </div>

          {/* footer buttons */}
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div>
              <Link
                to={"/login"}
                className=" font-normal text-[14px] text-blueColor hover:underline"
              >
                Didn't get a code?
              </Link>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Link to={"/login"}>
                <Button className="bg-secondaryColorBg text-black px-4 font-semibold text-[15px] border">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-blueColor hover:bg-blueColor px-4 font-semibold text-[15px]"
                onClick={() => {
                  mutate({ resetCode, cuid: searchParams?.cuid });
                }}
                disabled={isPending || isPaused}
              >
                {isPending ? "Loading..." : " Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendCode;
