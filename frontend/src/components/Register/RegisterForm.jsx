import React, { useState } from "react";
import { Form, Formik } from "formik";
import RegisterInputs from "../inputs/registerInputs";
import { registrationValidationSchema } from "../../Schema";
import DateOfBirthSelect from "../Login/DateOfBIrthSelect";
import GenderSelect from "../Login/GenderSelect";


const RegisterForm = () => {
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
  // generate years
  const years = Array.from(
    new Array(108),
    (value, index) => new Date().getFullYear() - index
  );
  // generate months
  const months = Array.from(new Array(12), (values, index) => index + 1);
  // generate days based on the month and year
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  // generate days
  const days = Array.from(new Array(getDays()), (values, index) => index + 1);

  return (
    <div className="bgBlur ">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>SignUp</span>
          <span>It's quick and easy</span>
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
            let currentDate = new Date();
            let pickDate = new Date(bYear, bMonth - 1, bDay); // bMonth is 0-indexed in JavaScript Date

            // Calculate age in years
            let age = currentDate.getFullYear() - pickDate.getFullYear();
            let monthDifference = currentDate.getMonth() - pickDate.getMonth();
            let dayDifference = currentDate.getDate() - pickDate.getDate();

            // Adjust age if the current date has not yet reached the birthday this year
            if (
              monthDifference < 0 ||
              (monthDifference === 0 && dayDifference < 0)
            ) {
              age--;
            }

            if (age < 14) {
              setDateError(
                "It looks like you're not eligible to join Facebook"
              );
            } else if (age > 70) {
              setDateError("You're too old to join Facebook");
            } else if (gender === "") {
              setGenderError(
                "please choose a gender but later you can change who can see it"
              );
            }else{
              setDateError("")
              setGenderError("")
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
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
               <DateOfBirthSelect bDay={bDay} bMonth={bMonth} bYear={bYear}  handleChange={handleChange} months={months} years={years} days={days} dateError={dateError}/>
              </div>
              <div className="register_col">
                <div className="register_line_header">
                  Gender <i className="info_icon"></i>
                </div>
               <GenderSelect handleChange={handleChange} genderError={genderError}/>
              </div>
              <div className="register_infos">
                People who use our service may have uploaded your contact
                information to Facebook. <span>Learn more.</span>
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Privacy Policy</span> and{" "}
                <span>Cookies Policy</span>. You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className="register_btn_wrapper">
                <button className="blue_btn open_signUp">Sign Up</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
