import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInput from './../inputs/loginInputs/index';
import { validationSchema } from './../../Schema/index';


// Define validation schema
const loginInfos = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="facebook logo" />
        <span>
          Facebook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="email"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/forget" className="forgot_password">
            Forgotten password?
          </Link>
          <div className="sign_splitter"></div>
          <button className="blue_btn open_signUp">Create Account</button>
        </div>
        <Link to="/create_page" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
