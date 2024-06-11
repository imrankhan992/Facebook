import React, { useState } from "react";
import { Form, Formik } from "formik";
import RegisterInputs from "../inputs/registerInputs";
import { registrationValidationSchema } from "../../Schema";

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
  // extract all info from the form user
  const { first_name, last_name, email, password, bYear, bMonth, bDay } = user;
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
    <div className="blur ">
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
          }}
          validationSchema={registrationValidationSchema}
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
                <div className="register_grid">
                  <select name="bDay" onChange={handleChange} value={bDay}>
                    {days?.map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name="bMonth" value={bMonth} onChange={handleChange}>
                    {months?.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="bYear" value={bYear} onChange={handleChange}>
                    {years?.map((year, index) => (
                      <option key={index} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="register_col">
                <div className="register_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="register_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={"male"}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value={"female"}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value={"custom"}
                      onChange={handleChange}
                    />
                  </label>
                </div>
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
