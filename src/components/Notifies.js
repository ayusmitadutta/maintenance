
import { toast } from 'react-toastify';

 
const notifysuccess = () => {
  console.log("notify called");
  toast.success('Successful!!', {
  position: "top-right",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });}

  const notifyloginfalse = () => {
    console.log("notify called login false");
    toast.error('Log in with correct credentials!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });}

    const servererror = () => {
     
      toast.error('server error, Try again Later!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });}

      const error = () => {
      
        toast.error("Error, Try again later!!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });}
    
        const errormsg = (msg) => {
      
          toast.error(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });}
   

// eslint-disable-next-line
export default {notifysuccess, notifyloginfalse, servererror, error, errormsg};
