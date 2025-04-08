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
import ProfilePage from "./components/Profile/ProfilePage";
import Authority from "./components/Authority/Authority";
import Chatbot from "./components/Chatbot/ChatBot";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/mainReimburse" element={<MainReimburse />} />
        <Route
          path="/mainReimburse/pastApplication"
          element={<PastApplicaion />}
        />
        <Route
          path="/mainReimburse/newApplication"
          element={<NewApplication />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/status" element={<Status />} />
        <Route path="/authority" element={<Authority />} />
        <Route path="/dispensary" element={<Dispensary />} />
      </Routes>
      
      {/* Add the ChatbotWidget component here so it appears on all pages */}
      <Chatbot />
    </Router>
  );
}