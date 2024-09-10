import React from "react";
import facebook from "/icons/facebook.svg";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";

const ResetIndex = () => {
  const formOpts = formOptions({
    defaultValues: {
      email: "",
    },
  });
  const { Field, Subscribe, reset, handleSubmit } = useForm({
    ...formOpts,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // Regex for validating the email format
  const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
          <div className="px-4 py-2 border-b">
            <h2 className="text-2xl  mb-3 font-semibold">Find Your Account</h2>
          </div>
          <form
            className="px-4 py-6 flex justify-center gap-2 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            <p className="text-black mb-5 text-lg tracking-tight leading-6">
              Please enter your email address or mobile number to search for
              your account.
            </p>
            <Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return "Email is required!";
                  if (!validateEmailFormat(value))
                    return "Please enter a valid email address.";
                  return undefined;
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
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border border-gray-300 py-6 text-lg rounded-md focus:placeholder:opacity-50 transition-opacity duration-1000"
                    placeholder="Enter address or mobile number "
                  />
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
                   <Link to={"/login"}
                  
                   >
                   <Button
                      
                      className="bg-secondaryColorBg text-black"
                    >
                      Cancel
                    </Button>
                   </Link>
                    <Button
                      type="submit"
                      className="bg-blueColor hover:bg-blueColor"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Loading..." : "Submit"}
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

export default ResetIndex;
