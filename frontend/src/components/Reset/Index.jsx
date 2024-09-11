import React from "react";
import facebook from "/icons/facebook.svg";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { formOptions, useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reset_password_find_account } from "@/apis/api";

const ResetIndex = () => {
  const {isError,error,mutate} = useMutation({
    mutationFn: reset_password_find_account,
    onMutate: (variables) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
      return {};
    },
    onError: (error, variables, context) => {
      // An error happened!
      // Use the context to roll back
    },
    onSuccess: (data, variables, context) => {
      // The mutation was successful!
      // Use the context to do something
    },
  })
  const formOpts = formOptions({
    defaultValues: {
      email: "",
    },
  });
  const { Field, Subscribe, reset, handleSubmit } = useForm({
    ...formOpts,
    onSubmit: (values) => {
      mutate(values?.value?.email)
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
          <div className="px-4 pt-4 pb-2  border-b">
            <h2 className="text-2xl   font-semibold text-[#162643]">Find Your Account</h2>
          </div>
          <form
            className="px-4 py-6 flex justify-center gap-2 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit();
            }}
          >
            {isError && <div className="bg-[#FFEBE8] p-3 border border-[#DD3C10]">
              <h2 className="text-[15px] font-bold text-black">No search results</h2>
              <p className="text-black text-sm font-normal">
                {error?.message}
                </p>
              </div>}
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
                    <Link to={"/login"}>
                      <Button className="bg-secondaryColorBg text-black px-6 font-semibold text-[17px] border">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="bg-blueColor hover:bg-blueColor px-6 font-semibold text-[17px]"
                      disabled={!canSubmit}
                    >
                      {isSubmitting ? "Loading..." : "Search"}
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
