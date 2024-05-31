import React, { useState } from "react";
import { Form, Formik } from "formik";
import RegisterInputs from "../inputs/registerInputs";
const userInfos = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  bYear: "",
  bMonth: "",
  bDay: "",
  gender: "",
};
const RegisterForm = () => {
  const [user, setUser] = useState(userInfos);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  return (
    <div className="blur ">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>SignUp</span>
          <span>It's quick and easy</span>
        </div>
        <Formik>
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
                  <select name="bDay">
                    <option>15</option>
                  </select>
                  <select name="bMonth">
                    <option>15</option>
                  </select>
                  <select name="bYear">
                    <option>15</option>
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
