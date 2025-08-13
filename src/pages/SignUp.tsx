import "../assets/styles/Auth.scss";
import google from "../assets/images/google.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthStore from "../store/AuthStore";
import UseMessageStore from "../store/MessageStore";
import Alert from "../components/Alert";


const SignUp = () => {
  const { signup} = UseAuthStore();
  const {message, setMessage} = UseMessageStore();
  const {checkAuth, isLoggedIn} = UseAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    password: "",
    email: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      return setMessage("error", "Passwords do not match");
    }
    await signup(formData);
    await checkAuth();
    if (isLoggedIn) {
      navigate("/");
    }
  };
  return (
    <>
      <Alert type={message.type} message={message.text} />
      <div className="container">
        <motion.div
          initial={{
            translateX: -1000,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
          }}
          exit={{
            translateX: -1000,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="form-wrapper"
        >
          <form
            className="form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <h1>Sign Up</h1>

            <div className="form-group">
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder=" "
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
              <label htmlFor="fullName">User name</label>
            </div>

            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-group">
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder=" "
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-group">
              <input
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                required
                placeholder=" "
                value={formData.repeatPassword}
                onChange={(e) => handleChange("repeatPassword", e.target.value)}
              />
              <label htmlFor="repeatPassword">Repeat password</label>
            </div>

            <button className="btn form-btn" type="submit">
              Sign Up
            </button>

            <span>
              <hr />
              or
              <hr />
            </span>
            <button className="btn google-btn" type="submit">
              Sign Up with google <img src={google} alt="google" />
            </button>
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </motion.div>

        <div className="image" />
      </div>
    </>
  );
};

export default SignUp;
