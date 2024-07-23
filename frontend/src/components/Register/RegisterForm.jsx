import React, { useMemo, useState } from "react";
import { Form, Formik } from "formik";
import RegisterInputs from "../inputs/registerInputs";
import { registrationValidationSchema } from "../../Schema";
import DateOfBirthSelect from "../Login/DateOfBIrthSelect";
import GenderSelect from "../Login/GenderSelect";
import { validateAgeAndGender } from "@/validations";
import registerHook from "@/hooks/registerHook";


const RegisterForm = ({ setShowRegisterPage }) => {
  const { registerUser, loading } = registerHook();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);
  //date error
  const [dateError, setDateError] = useState("");
  // gender error
  const [genderError, setGenderError] = useState("");
  // extract all info from the form user
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const years = useMemo(
    () =>
      Array.from(
        new Array(108),
        (_, index) => new Date().getFullYear() - index
      ),
    []
  );
  const months = useMemo(
    () => Array.from(new Array(12), (_, index) => index + 1),
    []
  );
  const days = useMemo(
    () =>
      Array.from(
        new Array(new Date(user.bYear, user.bMonth, 0).getDate()),
        (_, index) => index + 1
      ),
    [user.bYear, user.bMonth]
  );

  return (
    <div className="bgBlur ">
      <div className="register">
        <div className="register_header !text-start">
          <i
            className="exit_icon"
            onClick={() => setShowRegisterPage(false)}
          ></i>
          <span>SignUp</span>
          <span className="mb-3">It's quick and easy</span>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registrationValidationSchema}
          onSubmit={() => {
            const error = validateAgeAndGender(bYear, bMonth, bDay, gender);
            if (error) {
              if (error.includes("eligible") || error.includes("old")) {
                setDateError(error);
                setGenderError("");
              } else if (error.includes("choose a gender")) {
                setDateError("");
                setGenderError(error);
              }
            } else {
              setDateError("");
              setGenderError("");
              registerUser(
                first_name,
                last_name,
                email,
                password,
                bYear,
                bMonth,
                bDay,
                gender
              );
              // show toast
              
             
            }
          }}
        >
          {(formik) => (
            <Form className="register_form !mt-3">
              <div className="register_line">
              
                <RegisterInputs
                  type="text"
                  placeholder={"First name"}
                  name="first_name"
                  onChange={handleChange}
                />
                <RegisterInputs
                  type="text"
                  placeholder={"Surname"}
                  name="last_name"
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="register_line">
                <RegisterInputs
                  type="text"
                  placeholder={"Mobile number or email address"}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="register_line">
                <RegisterInputs
                  type="password"
                  placeholder={"New password"}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <div className="register_col">
                <div className="register_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  handleChange={handleChange}
                  months={months}
                  years={years}
                  days={days}
                  dateError={dateError}
                />
              </div>
              <div className="register_col">
                <div className="register_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleChange={handleChange}
                  genderError={genderError}
                />
              </div>
              <div className="register_infos !text-start ">
                People who use our service may have uploaded your contact
                information to Facebook.{" "}
                <span className="!mb-2">Learn more.</span>
                <br />
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Privacy Policy</span> and{" "}
                <span>Cookies Policy</span>. You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className="register_btn_wrapper">
                {!loading && (
                  <button className="blue_btn open_signUp" type="submit">
                    Sign Up
                  </button>
                )}

                {loading && (
                  <button className="blue_btn open_signUp" type="submit">
                    Loading...
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
