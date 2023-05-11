import { React, useState, useContext } from "react";
import "./addRecord.css";
import "react-datepicker/dist/react-datepicker.css";
import datacontext from "../../store/dataContext";

const AddRecord = (props) => {
  const {  handleclose } = props;
  const adddatacontext = useContext(datacontext);
  const { addrecord } = adddatacontext;
 
  const [equipment, setEquipment] = useState('');
  const [mtype, setMtype] = useState('');
  const [cost, setCost] = useState('');
  const [attachment, setAttachment] = useState('');
  const [date, setDate] = useState('');
  const [endtime, setEndTime] = useState('');
 

  

  const handleaddrecord = (event) => {
    event.preventDefault();

    console.log("attachment", attachment)

let  formdata = new FormData();
formdata.append('equipment', equipment);
formdata.append('maintainance_type', mtype);
formdata.append('cost', cost);
formdata.append('attachment_file', attachment);
formdata.append('date', date);
formdata.append('timefunc_again', endtime);

    addrecord(
     formdata
     
    );

    
    handleclose();
   
  };


 
 

  return (
    <div>
      <form id="addform" onSubmit={handleaddrecord}>
        <div className="mb-3">
          <label htmlFor="equipment" className="form-label">
            Equipment
          </label>
          <input
            type="text"
            className="form-control"
            name="equipment"
            onChange={(e) => setEquipment(e.target.value)}
            value={equipment}
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
            onChange={(e) => setMtype(e.target.value)}
            value={mtype}
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
            onChange={(e) => setCost(e.target.value)}
            value={cost}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">
            Attachment
          </label>
          <input
            type="file"
            className="form-control"
          
            onChange={(e) => setAttachment(e.target.files[0])}
          
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Select End Date 
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
         

         
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Select End Time 
          </label>
         
           <input
            type="time"
            className="form-control"
            name="endtime"
            onChange={(e) => setEndTime(e.target.value)}
            value={endtime}
          />

         
        </div>

        <button id="btn" type="submit" className="btn btn-secondary">
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddRecord;
