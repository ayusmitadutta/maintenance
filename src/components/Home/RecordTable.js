import { React, useContext, useState, useEffect } from "react";
import "./recordTable.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import datacontext from "../../store/dataContext";
import { Modal } from "react-bootstrap";
import UpdateRecord from "./updateRecord";
import Notifies from "../notifies";

const RecordTable = (props) => {
  let idcounter = 1;
  const adddatacontext = useContext(datacontext);
  const { alldata, deleterecord, norecordsadd } = adddatacontext;
  const [show, setShow] = useState(false);

  const [updaterecordvalue, setupdaterecordvalue] = useState({
    equipment: "",
    mtype: "",
    cost: 0,
    endtime: "",
  });

  const handleShow = (equipment, maintainance_type, cost, endtime, date) => {
    setShow(true);
    console.log(date);
    setupdaterecordvalue({
      equipment: equipment,
      mtype: maintainance_type,
      cost: cost,
      endtime: endtime,
    });
  };
  const handleClose = () => setShow(false);

  useEffect(() => {
    handleClose();
  }, [norecordsadd]);

  const handledel = (event, equipment, maintainance_type) => {
    event.preventDefault();
    console.log("delete pressed");
    console.log("equip" + equipment);
    console.log("mtype" + maintainance_type);
    deleterecord(equipment, maintainance_type);
    Notifies.notifysuccess();
  };
  return (
    <>
      {norecordsadd === true ? (
        <div className="norecords"> 'No records to display!!' </div>
      ) : (
        <div className="tablecontainer">
          <table className="table">
            <thead className="tabletop">
              <tr>
                <th scope="col">S.No</th>

                <th scope="col">Equipment</th>
                <th scope="col">Type</th>
                <th scope="col">Attachment</th>
                <th scope="col">Cost</th>
                <th scope="col">End Date</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody id="tablebody">
              {alldata
                .filter((data) => {
                  if (props.searchvalue === "") {
                    return data;
                  } else if (
                    data.equipment
                      .toLowerCase()
                      .includes(props.searchvalue.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((data) => (
                  <tr id="tabledata" key={data.sno}>
                    <th scope="row">{idcounter++}</th>

                    <td>{data.equipment}</td>
                    <td>{data.maintainance_type}</td>
                    <td>{data.attachment !== null ? data.attachment : "-"}</td>
                    <td>{data.cost}</td>
                    <td>{data.date}</td>
                    <td>{data.time}</td>
                    <td>{data.timefunc_again}</td>
                    <td>
                      {" "}
                      <AiFillEdit
                        size={25}
                        onClick={() =>
                          handleShow(
                            data.equipment,
                            data.maintainance_type,
                            data.cost,
                            data.timefunc_again,
                            data.date
                          )
                        }
                      />
                      <span> </span>
                      <AiFillDelete
                        size={25}
                        onClick={(event) =>
                          handledel(
                            event,
                            data.equipment,
                            data.maintainance_type
                          )
                        }
                        style={{ color: "red" }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>{" "}
        </div>
      )}
      {/* : <UpdateRecord  />} */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateRecord
            updaterecordvalue={updaterecordvalue}
            handleclose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RecordTable;
