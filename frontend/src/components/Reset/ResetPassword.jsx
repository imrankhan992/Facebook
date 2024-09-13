import {
  reset_password_check_token,
  reset_password_find_account,
  update_password,
} from "@/apis/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";
import {
  Link,
  useLocation,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import facebook from "/icons/facebook.svg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ErrorShown from "./ErrorShown";
import InfoDialog from "./InfoDialog";
import checkPasswordStrength from "@/helpers/passwordStrengthChecker";
import zxcvbn from "zxcvbn";
import { encryptData } from "@/helpers/encryptionData";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [showPasswordScore, setShowPasswordScore] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const handleReload = () => {
    window.location.reload();
  };
  const navigate = useNavigate({ from: "/recover/password" });
  const [showPassword, setShowPassword] = useState(false);
  const sec_Id = useSearch({
    from: "/recover/password",
    select: (search) => search.sec_Id,
  });

  const {
    isLoading: tokenLoading,
    isError: tokenIsError,
    error: tokenError,
  } = useQuery({
    queryKey: ["reset_password", sec_Id],
    queryFn: () => reset_password_check_token(sec_Id),
    enabled: !!sec_Id,
  });

  const { isError, error, mutate, data } = useMutation({
    mutationFn: update_password,
    onSuccess: (data) => {
      if (data?.success) {
        const encryptedData = encryptData(data?.user);
        Cookies.set("user", encryptedData, {
          expires: 7,
        });
        dispatch({ type: "LOGIN", payload: data?.user });
        navigate({
          to: "/",
        });
      }
    },
  });
  const formOpts = formOptions({
    defaultValues: {
      password: "",
    },
  });
  const { Field, Subscribe, reset, handleSubmit } = useForm({
    ...formOpts,
    onSubmit: (values) => {
      mutate({ password: values?.value?.password, sec_Id: sec_Id });
    },
  });

  // Regex for validating the email format
  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrengthLabel = (score) => {
    switch (score) {
      case 0:
        return "Too Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  if (tokenIsError || !sec_Id)
    return (
      <div>
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white px-5 py-1 w-full border-shadow">
          <img src={facebook} alt="" width={140} height={140} />
        </div>
        <ErrorShown handleReload={handleReload} navigate={navigate} />
      </div>
    );
  if (tokenLoading)
    return (
      <div className="overflow-hidden max-w-[1300px] mx-auto">
        {" "}
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white px-5 py-1 w-full border-shadow overflow-hidden">
          <img src={facebook} alt="" width={140} height={140} />
        </div>
        <BarLoader width={1300} color="#075CE5" />
      </div>
    );

  return (
    <div className="bg-secondaryColorBg min-h-screen w-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white px-5 py-1 w-full border-shadow">
        <img src={facebook} alt="" width={140} height={140} />
        <Link to="/login">
          <Button className="bg-blueColor hover:bg-blueColor">Login</Button>
        </Link>
      </div>

      {/* Reset Section */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white border-shadow w-[90vw]  md:w-[40vw] md:max-w-[500px] rounded-md ">
          <div className="px-4 pt-4 pb-2  border-b">
            <h2 className="text-2xl   font-semibold text-[#162643]">
              Choose a new password
            </h2>
          </div>
          <form
            className="px-4 py-6 flex justify-center gap-2 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            {isError && (
               <div className=" mt-2">
               <div className="relative  border-l-[30px] w-full border-[#FA3E3E] border-y-[1.5px] border-r-[1.5px] min-h-12  p-2  rounded-md ">
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
            <p className="text-black mb-5 text-lg tracking-tight leading-6">
              Create a new password that is at least 6 characters long. A strong
              password has a combination of letters, digits and punctuation
              marks.
            </p>
            <Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (value === "") {
                    setShowPasswordScore(false);
                  } else {
                    setShowPasswordScore(true);
                  }
                  const passwordStrength = zxcvbn(value);
                  setScore(passwordStrength.score); // Score is between 0 and 4
                  setFeedback(passwordStrength.feedback.suggestions.join(" "));
                },
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return (
                    value.includes("error") &&
                    'No "error" allowed in email address'
                  );
                },
              }}
              children={(field) => (
                <>
                  <div className="flex gap-2">
                    <div className="relative w-full">
                      <Input
                        type={`${showPassword ? "text" : "password"}`}
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full border border-gray-300 py-6 text-lg rounded-md focus:placeholder:opacity-50 transition-opacity duration-1000"
                        placeholder="New Password "
                      />
                      {/* Flexbox to vertically center "hide" */}
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="select-none absolute right-0 p-3 rounded-md cursor-pointer top-0 h-full flex items-center font-bold text-blueColor hover:bg-secondaryColorBg"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </div>
                    </div>
                    <div className=" bg-secondaryColorBg rounded-lg font-bold text-lg">
                      <InfoDialog />
                    </div>
                  </div>
                  {showPasswordScore && (
                    <>
                      {" "}
                      <p>
                        Password Strength:{" "}
                        <strong
                          className={`password-message ${
                            getPasswordStrengthLabel(score).includes(
                              "Strong"
                            ) && "text-green-600"
                          } ${
                            getPasswordStrengthLabel(score).includes("Weak") &&
                            "text-yellow-500"
                          }
                          ${
                            getPasswordStrengthLabel(score).includes("Good") &&
                            "text-blueColor"
                          }
                          `}
                        >
                          {getPasswordStrengthLabel(score)}
                        </strong>
                      </p>
                      <p className="text-sm text-blueColor">{feedback}</p>{" "}
                    </>
                  )}

                  {field.state.meta.errors ? (
                    <p className="text-red-600">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </>
              )}
            />
            <div className="flex items-center justify-end gap-3">
              <Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <>
                    <Link to={"/login"}>
                      <Button className="bg-secondaryColorBg text-black px-6 font-semibold text-[17px] border">
                        Skip
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="bg-blueColor hover:bg-blueColor px-6 font-semibold text-[17px]"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Loading..." : "Continue"}
                    </Button>
                  </>
                )}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
