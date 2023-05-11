import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifies from "../notifies";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const history = useNavigate();
  const handleregister = (event) => {
    event.preventDefault();

    const registeruser = {
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
    };

    axios
      .post("http://localhost:4004/user/userAuth/register", registeruser)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === "true") {
          return history("/");
        } else {
          Notifies.errormsg(response.data.message);
        }
      })
      .catch((error) => {
        Notifies.servererror();
      });

    setemail("");
    setpassword("");
    setname("");
  };

  return (
    <>
      <div className="topbar">
        <h4>Record Maintainance</h4>
      </div>
      <div className="register">
        <div className="container">
          <form onSubmit={handleregister}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                required
                id="name"
                onChange={(event) => setname(event.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                aria-describedby="emailHelp"
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
                id="password"
                required
                onChange={(event) => setpassword(event.target.value)}
                value={password}
              />
            </div>
            <div className="text-center">
              <button id="btn" type="submit" className="btn btn-secondary">
                Signup
              </button>
            </div>
            <p className="para">
              Already have an account
              <Link to="/" className="btn btn-secondary ">
                Log In
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
