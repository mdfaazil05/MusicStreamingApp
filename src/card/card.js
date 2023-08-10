import React from "react";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Home from "../HomePage/Home";
import Login from "../Login/Login";

const Locations = () => {
  return (
    <BrowserRouter>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        {/* Add more routes here */}
      </Routes>
    </Router>
    </BrowserRouter>
  );
};

export default Locations;


