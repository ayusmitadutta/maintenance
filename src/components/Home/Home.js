import { React, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import datacontext from "../../store/dataContext";

import "./home.css";
import AddRecord from "./addRecord";
import RecordTable from "./recordTable";
import Notifies from "../notifies";
import { Modal } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const adddatacontext = useContext(datacontext);
  const { getuserallrecord } = adddatacontext;
  const history = useNavigate();
  const [show, setShow] = useState(false);
  const [search, setsearch] = useState("");
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("valid token");

      Notifies.notifysuccess();
      getuserallrecord();
    } else {
      history("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logout successfully");
    localStorage.removeItem("token");
    history("/");
  };

  return (
    <>
      <div className="bg">
        <div className="topbar">
          <h4>Record Maintainance</h4>

          <button
            className="btn btn-outline-light"
            type="submit"
            onClick={(event) => handleLogout(event)}
          >
            Logout
          </button>
        </div>
        <br />
        <br />

        <div className="home">
          <div className="top">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleShow}
            >
              + Add Record
            </button>
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="Search by Equipment....."
              onChange={(event) => setsearch(event.target.value)}
            />
          </div>

          <RecordTable searchvalue={search} />

          {/* {addshow === false ? 
          
       <RecordTable  />
           : <AddRecord  />}  */}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddRecord handleclose={handleClose} />
            </Modal.Body>
          </Modal>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
