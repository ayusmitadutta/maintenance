import { React, useState, useContext } from "react";
import datacontext from "../../store/dataContext";
import "./addRecord.css";

const UpdateRecord = (props) => {
  const { updaterecordvalue, handleclose } = props;
  console.log(updaterecordvalue);

  const adddatacontext = useContext(datacontext);
  const { updaterecord } = adddatacontext;
  const [updatenewrecord, setupdatenewrecord] = useState({
    equipment: updaterecordvalue.equipment,
    mtype: updaterecordvalue.mtype,
    cost: updaterecordvalue.cost,
    endtime: updaterecordvalue.endtime
  });

  const updateuserrecord = (event) => {
    event.preventDefault();

    console.log("updating.......");
    console.log(updatenewrecord.endtime);
    updaterecord(
      updatenewrecord.equipment,
      updatenewrecord.mtype,
      updatenewrecord.cost,
      updatenewrecord.endtime
    );
    console.log("updated............");
    handleclose();

  };

  const onChange = (e) => {
    setupdatenewrecord({ ...updatenewrecord, [e.target.name]: e.target.value });
    console.log(updatenewrecord);
  };
  return (
    <div className="updateclass">
      <form id="updateform" onSubmit={(event) => updateuserrecord(event)}>
        <div className="mb-3">
          <label htmlFor="equipment" className="form-label">
            Equipment
          </label>
          <input
            type="text"
            readOnly
            className="form-control"
            name="equipment"
            value={updatenewrecord.equipment}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mtype" className="form-label">
            Maintainance Type
          </label>
          <input
            type="text"
            className="form-control"
            name="mtype"
            value={updatenewrecord.mtype}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">
            Cost
          </label>
          <input
            type="text"
            className="form-control"
            name="cost"
            value={updatenewrecord.cost}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            End Time 
          </label>
        
           <input
            type="time"
            className="form-control"
            name="endtime"
            onChange={onChange}
            value={updatenewrecord.endtime}
          />

         
        </div>

        <button id="btn" type="submit" className="btn btn-secondary">
          Update Record
        </button>
      </form>
    </div>
  );
};

export default UpdateRecord;
