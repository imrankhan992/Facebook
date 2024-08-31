import { decryptData, encryptData } from "@/helpers/encryptionData";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";

const ActivateEmail = ({
  isLoading,
  data,
  isError,
  error,
  isPaused,
  isFetching,
  status,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !isFetching &&
      !isLoading &&
      !isError &&
      !isPaused &&
      data &&
      status === "success"
    ) {
      const userData = Cookies.get("user");

      const decryptUserData = decryptData(userData);
      const user = { ...decryptUserData, verified: true };

      const encryptUserData = encryptData(user);
      Cookies.set("user", encryptUserData);
      dispatch({
        type: "VERIFY",
        payload: true,
      });

     
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }, [isFetching, isLoading, isError, isPaused, data, status, dispatch]);

  if (isError && !data && !isPaused) {
  
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }

  return (
    <div className="absolute bgBlur z-[9990] inset-0 bg-transparent flex items-center justify-center">
      <div className="bg-white w-[90%] md:w-[40vw] flex flex-col justify-center activate-Email-Shadow">
        <div className="w-full p-2 border-y">
          {isError && !data && !isPaused && (
            <p className="text-red-700 font-semibold">
              Email Verification Failed
            </p>
          )}
          {data && !isError && !isPaused && (
            <p className="text-green-700 font-semibold">
              Email Verification Successful
            </p>
          )}
          {isFetching && (
            <p className="text-blue-700 font-semibold">
              Please wait, verifying Email...
            </p>
          )}
        </div>
        <div className="h-32 flex flex-col gap-3 items-center justify-center p-2">
          {isError && <p>{error?.message}.</p>}
          {!isError && !isPaused && data && (
            <p>Email verification successful.</p>
          )}
          {isLoading && <PropagateLoader color="#0866FF" />}
        </div>
      </div>
    </div>
  );
};

export default ActivateEmail;
