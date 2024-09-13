import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

import { decryptData } from "@/helpers/decryptData";
import { useMutation } from "@tanstack/react-query";
import { reset_password_send_code } from "@/apis/api";

const FindAccount = () => {
  const [data, setData] = useState({});
  const urlParams = new URLSearchParams(window.location.search);
  const encryptedData = urlParams.get("data");
  useEffect(() => {
    if (!encryptedData) window.location.href = "/login";

    if (encryptedData) {
      const userData = decryptData(encryptedData);
      setData(userData);
      if (!userData || !encryptedData || !data) window.location.href = "/login";
    }
  }, [!data, !urlParams]);

  const {mutate,isPending,isError,error,isPaused} = useMutation({
    mutationFn: reset_password_send_code,
    
  });
  return (
    encryptedData && (
      <div className="bg-secondaryColorBg min-h-screen w-full flex flex-col">
        {/* Reset Section */}
        <div className="flex flex-1 justify-center items-center">
          <div className="bg-white border-shadow w-[90vw]   md:max-w-[550px] rounded-md ">
            <div className="px-4 pt-4 pb-2 border-b flex items-center justify-start">
              <h2 className="text-xl  font-bold text-[#162643]">
                We'll send you a code to your email address
              </h2>
            </div>
            {/* info */}
            <div className="flex items-start justify-between px-4 py-4">
              <div className="text-lg flex items-start justify-start">
                <p>
                  We can send a login code to: <br />{" "}
                  <span className="text-sm">{data?.email}</span>
                </p>
              </div>
              <div className="flex items-center justify-center  flex-col pr-16 gap-2">
                <img
                  src={data?.picture}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex flex-col justify-center items-center leading-snug">
                  <h3 className="text-[15px] font-medium text-[#333333] ">
                    {data?.first_name + " " + data?.last_name}
                  </h3>
                  <p className="text-[13px] text-gray-400">Facebook user</p>
                  <p className="hover:underline text-blueColor text-[12px] cursor-pointer">
                    Not you?
                  </p>
                </div>
              </div>
            </div>

            {/* footer buttons */}
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div>
                <Link
                  to={"/login"}
                  className=" font-bold text-[14px] text-blueColor hover:underline"
                >
                  Log in with password
                </Link>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Link to={"/login"}>
                  <Button className="bg-secondaryColorBg text-black px-4 font-semibold text-[15px] border">
                    Try another way
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-blueColor hover:bg-blueColor px-4 font-semibold text-[15px]"
                  onClick={() => mutate(data?.email)}
                  disabled={isPending}
                >
                 {isPending ? "Sending..." : " Continue"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FindAccount;
