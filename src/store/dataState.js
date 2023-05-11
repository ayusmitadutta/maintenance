import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import datacontext from "./dataContext";
import axios from "axios";
import Notifies from "../components/notifies";

const DataState = (props) => {
  const authapi = "http://localhost:4004/user/userAuth";
  const apiUserdata = "http://localhost:4004/user/userMaintainLog";
  const history = useNavigate();
  const recorddata = [];
  const [norecordsadd, setnorecordsadd] = useState(false);
  const [alldata, setalldata] = useState(recorddata);

  const token = localStorage.getItem("token");

  const headers = {
    "authorization-token": token,
  };

  const login = (email, password) => {
    const loginuser = {
      email: email,
      password: password,
    };
    console.log(loginuser);

    axios
      .post(`${authapi}/login`, loginuser)
      .then((response) => {
        console.log("response msg" + response.data.success);
        if (response.data.success !== "false") {
          console.log("login successful");
          console.log("token" + response.data.authtoken);
          localStorage.setItem("token", response.data.authtoken);

          return history("/home");
        }
      })
      .catch((error) => {
        console.log("login failed");
        Notifies.notifyloginfalse();
      });
  };

  const getuserallrecord = async () => {
    axios
      .get(`${apiUserdata}/getuserLog`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        console.log("response" + response.data.success);
        if (response.data.success === "true") {
          console.log("length" + response.data.data.length);
          if (response.data.data.length === 0) {
            console.log("no logs found");
            setnorecordsadd(true);
          } else {
            setalldata(response.data.data);
          }
        }
      })
      .catch((error) => {
        Notifies.error();
      });
  };

  const addrecord = (addlog) => {
    console.log("Adding record");

    // const addlog = {
    //   equipment: equipment,
    //   maintainance_type: maintainance_type,
    //   cost: cost,
    //   attachment: attachment,
    //   date: date,
    //   timefunc_again: time,
    // };

    axios
      .post(`${apiUserdata}/addLog`, addlog, {
        headers: headers,
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success === "true") {
          console.log("response " + response.data);

          Notifies.notifysuccess();
          getuserallrecord();
        } else {
          Notifies.errormsg(response.data.message);
        }
        // alert(response.data.success);
      })
      .catch((error) => {
        Notifies.error();
      });
  };

  const deleterecord = (equipment, maintainance_type) => {
    const deletelog = {
      equipment: equipment,
      maintainance_type: maintainance_type,
    };

    axios
      .post(`${apiUserdata}/deleteuserLog`, deletelog, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.success);
        console.log(response.data.data);
        if (response.data.success === "true") {
          console.log("delete successfully");

          getuserallrecord();
        }
      })
      .catch((error) => {
        Notifies.error();
      });
  };

  const updaterecord = (equipment, maintainance_type, cost, endtime) => {
    console.log("Updating record");

    const updatelog = {
      equipment: equipment,
      maintainance_type: maintainance_type,
      cost: cost,
      timefunc_again: endtime,
    };

    console.log(updatelog);

    axios
      .post(`${apiUserdata}/updateUserLog`, updatelog, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success === "true") {
          Notifies.notifysuccess();
        }
      })
      .catch((error) => {
        Notifies.error();
      });
  };

  return (
    <datacontext.Provider
      value={{
        norecordsadd,
        alldata,
        login,
        addrecord,

        getuserallrecord,

        deleterecord,
        updaterecord,
      }}
    >
      {props.children}
    </datacontext.Provider>
  );
};

export default DataState;
