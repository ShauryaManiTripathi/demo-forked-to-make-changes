import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Home/Login";
import Appointment from "./components/Appointment/Appointment";
import Dispensary from "./components/Dispensary/Dispensary";
import MainReimburse from "./components/Reimburse/MainReimburse";
import NewApplication from "./components/Reimburse/comp/NewApplication";
import PastApplicaion from "./components/Reimburse/comp/PastApplication";
import Status from "./components/Status/Status";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/dispensary" element={<Dispensary />} />
        <Route path="/mainReimburse" element={<MainReimburse />} />
        <Route
          path="/mainReimburse/pastApplication"
          element={<PastApplicaion />}
        />
        <Route
          path="/mainReimburse/newApplication"
          element={<NewApplication />}
        />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
  );
}
