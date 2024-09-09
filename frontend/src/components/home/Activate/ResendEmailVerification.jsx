import React from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { resendVerificationEmail } from "@/apis/api";
import { useSelector } from "react-redux";

const ResendEmailVerification = () => {
  const user = useSelector((state) => state.user);
  
  const { mutate, failureReason,isPending, isPaused, isError, error, isSuccess ,data} =
    useMutation({
      mutationFn: () => resendVerificationEmail(user), 
    });

    console.log(failureReason);
  // Extract the error message safely
  const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";

  return (
    <div className="bg-white p-4 min-w-[80%] rounded-lg border-shadow mb-3">
        {/* please check your internet */}
        {isPaused && <p className="text-red-500">Please check your internet connection</p>}
      <p className="text-sm">
        Your account is not
        <span className="text-red-500 font-semibold"> verified</span>. Verify
        your account before it gets deleted after a month from creating it.
        <br />
        {!isPending && (
          <a
            className="text-sm text-[#0CA0F9] hover:underline cursor-pointer"
            onClick={() => {
              mutate();
            }}
          >
            Click here to resend verification email.
          </a>
        )}
        {isPending && <p>Loading...</p>}
        {isError && <p className="text-red-500">{errorMessage}</p>}
        {isSuccess && <p className="text-green-500">{data?.message}</p>}
      </p>
    </div>
  );
};

export default ResendEmailVerification;
