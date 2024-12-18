import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  const { logIn, user } = location.state || {};

  const [beneficiaryDetails, setBeneficiaryDetails] = useState({
    name: "",
    aadharNumber: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        beneficiaryDetails
      );
      const token = response.data.token;
      localStorage.setItem("token", `Bearer ${token}`);
      alert("Login successful");
      window.location.href = "/";
    } catch (error) {
      console.error("An error occurred while logging in", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBeneficiaryDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <main className="form-signin m-auto w-75 d-flex flex-column justify-content-center">
        {/* INDIAN EMBLEM */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/752px-Emblem_of_India.svg.png"
          alt="National Emblem of India"
          className="mb-4"
          style={{
            display: "block",
            margin: "0 auto",
            width: "200px",
            height: "auto",
          }}
        />

        <div className="white-box text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M12.005 21.992v-3.877c4.104 0 7.288-4.068 5.714-8.388a5.81 5.81 0 0 0-3.457-3.446c-4.319-1.563-8.389 1.61-8.389 5.714H2.008c0-6.541 6.325-11.642 13.184-9.499 2.991.94 5.383 3.321 6.313 6.313 2.141 6.858-2.96 13.183-9.5 13.183z"></path>
            <path d="M12.017 18.139H8.152v-3.866h3.865zm-3.865 2.959H5.193v-2.959h2.959zm-2.959-2.959H2.711v-2.483h2.482v2.483z"></path>
          </svg>
        </div>

        <form className="w-100" onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal text-center">
            {logIn ? "Please Log In" : "Please Sign In"}
          </h1>

          {/* Name Input */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={beneficiaryDetails.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          {/* Conditional Hospital/Authority ID */}
          {(user === "hospital" || user === "authority") && (
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={`${user} ID`}
                required
              />
              <label htmlFor="id">{`${
                user.charAt(0).toUpperCase() + user.slice(1)
              } ID`}</label>
            </div>
          )}

          {/* Aadhar and Email for Sign Up */}
          {!logIn && (user === "patient" || user === "authority") && (
            <>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Aadhar Number"
                  maxLength="12"
                  required
                />
                <label htmlFor="aadhar">Aadhar Number</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  required
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </>
          )}

          {/* Aadhar Number Input */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Aadhar Number"
              name="aadharNumber"
              value={beneficiaryDetails.aadharNumber}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="aadharNumber">Aadhar Number</label>
          </div>

          {/* Password Input */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={beneficiaryDetails.password}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-check text-start mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            {logIn ? "Log In" : "Sign In"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
