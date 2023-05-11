import "./app.css";
import Login from "./components/login/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/register/register";
import Home from "./components/home/home";
import DataState from "./store/dataState";

function App() {
  return (
    <>
      
        <Router>
          <DataState>
          <div className="main">
            <Routes>
              <Route exact path="/" element={<Login/>} />

              <Route exact path="/register" element={<Register/>} />

              <Route exact path="/home" element={<Home/>} />
            </Routes>
          </div>
          </DataState>
        </Router>
      
    </>
  );
}

export default App;
