import { useState } from "react";
import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Register/RegisterForm";
import "./style.css";

const Login = () => {
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  return (
    <div className="login">
      <div className="">
        <LoginForm
          showRegisterPage={showRegisterPage}
          setShowRegisterPage={setShowRegisterPage}
        />
        {showRegisterPage && (
          <RegisterForm setShowRegisterPage={setShowRegisterPage} />
        )}
      </div>
    </div>
  );
};

export default Login;
