import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import Notifies from "../notifies";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginuser = {
      email: `${email}`,
      password: `${password}`,
    };
    console.log(loginuser);

    axios
      .post("http://localhost:4004/user/userAuth/login", loginuser)
      .then((response) => {
        console.log("response msg" + response.data.success);
        if (response.data.success === "true") {
          console.log("login successful");
          console.log("token" + response.data.authtoken);
          localStorage.setItem("token", response.data.authtoken);

          return history("/home");
        } else {
          Notifies.errormsg(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        Notifies.servererror();
      });

    setemail("");
    setpassword("");
  };
  return (
    <>
      <div className="topbar">
        <h4>Record Maintainance</h4>
      </div>
      <div className="login">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                required
                onChange={(event) => setemail(event.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                onChange={(event) => setpassword(event.target.value)}
                value={password}
              />
            </div>
            <div className="text-center">
              <button id="btn" type="submit" className="btn btn-secondary">
                LogIn
              </button>
              <p className="para">
                Don't have an account
                <Link to="/register" className="btn btn-secondary ">
                  SignUp
                </Link>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
