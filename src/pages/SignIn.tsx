import "../assets/styles/Auth.scss";
import google from "../assets/images/google.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseAuthStore from "../store/AuthStore";
import UseMessageStore from "../store/MessageStore";
import Alert from "../components/Alert";

const SignIn = () => {
  const { signin } = UseAuthStore();
  const { message } = UseMessageStore();
  const { checkAuth, isLoggedIn } = UseAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signin(formData);
    await checkAuth();
    if (isLoggedIn ) {
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
            <h1>Sign In</h1>
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

            <div className="remember">
              <input type="checkbox" />
              Remember me
            </div>

            <button className="btn form-btn" type="submit">
              Sign In
            </button>

            <span>
              <hr />
              or
              <hr />
            </span>
            <button className="btn google-btn">
              Sign In with google <img src={google} alt="google" />
            </button>
            <p>
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </motion.div>

        <div className="image" />
      </div>
    </>
  );
};

export default SignIn;
