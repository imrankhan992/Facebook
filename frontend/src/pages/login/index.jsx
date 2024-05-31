import LoginForm from "../../components/Login/LoginForm";
import RegisterForm from "../../components/Register/RegisterForm";
import "./style.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm/>
      </div>
    </div>
  );
};

export default Login;
