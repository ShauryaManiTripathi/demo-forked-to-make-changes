import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatsGraphs } from "../StatsGraphs";

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [logIn, setLogIn] = useState(true);

  const isLogIn = () => {
    setShowDropdown((prev) => !prev);
    setLogIn(true);
  };
  const isSignIn = () => {
    setShowDropdown((prev) => !prev);
    setLogIn(false);
  };

  const navigate = useNavigate();

  return (
    <div>
      {/* SITE LOGO */}
      <div className="d-flex flex-wrap align-items-center justify-content-around py-1 border-bottom">
        <div className="white-box">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/752px-Emblem_of_India.svg.png"
            alt="Digital India"
            className="mb-4"
            style={{
              display: "block", // Make it a block element
              marginLeft: "auto", // Center the image horizontally
              marginRight: "auto", // Center the image horizontally
              width: "150px", // Set the width (change it as needed)
              height: "auto", // Maintain the aspect ratio based on the width
            }}
          />
        </div>
        <div className="box d-flex flex-column">
          <h3 className="mt-2 mb-2 display-6 fw-bold text-black">
            HEALTH TECH
          </h3>
          <h3 className="mb-4 display-6 fw-bold text-black">
            Get your REIMBURSMENTS eaisly
          </h3>
        </div>
        <div className="white-box">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png"
            alt="Digital India"
            className="mb-4"
            style={{
              display: "block", // Make it a block element
              marginLeft: "auto", // Center the image horizontally
              marginRight: "auto", // Center the image horizontally
              width: "220px", // Set the width (change it as needed)
              height: "auto", // Maintain the aspect ratio based on the width
            }}
          />
        </div>
      </div>

      {/* HEADER */}
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="#"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          ></a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="#" className="nav-link px-5 link-secondary">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-5">
              About
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-5">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-5">
              Help
            </a>
          </li>
          <li>
            <a href="/ocr-scan" className="nav-link px-5">
              OCR
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end mx-2">
          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={isLogIn}
          >
            Login
          </button>
          <button type="button" className="btn btn-primary" onClick={isSignIn}>
            Sign-up
          </button>
          {showDropdown && (
            <div className="dropdown-menu show position-absolute">
              <a
                className="dropdown-item"
                onClick={() =>
                  navigate("./login", { state: { logIn, user: "patient" } })
                }
              >
                Benificiary
              </a>
              <a
                className="dropdown-item"
                onClick={() =>
                  navigate("./login", { state: { logIn, user: "hospital" } })
                }
              >
                Hospital
              </a>
              <a
                className="dropdown-item"
                onClick={() =>
                  navigate("./login", { state: { logIn, user: "authority" } })
                }
              >
                Authority
              </a>
            </div>
          )}
        </div>
      </header>

      {/* STATS GRAPHS */}
      <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">Statistics</h2>
        <StatsGraphs />
      </div>

      {/* MAIN SECTION */}
      <div className="container px-4 py-5" id="custom-cards">
        <div className="row row-cols-1 row-cols-lg-2 align-items-stretch g-4 py-2">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden bg-green-400 hover:bg-green-500 hover:cursor-pointer rounded-4 shadow-lg"
              style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}
            >
              <a
                onClick={() => navigate("./appointment")}
                className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1"
              >
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  APPOINTMENT
                </h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <small>California</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>5d</small>
                  </li>
                </ul>
              </a>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden bg-green-400  hover:bg-green-500 hover:cursor-pointer rounded-4 shadow-lg"
              style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}
            >
              <a
                onClick={() =>
                  navigate("./dispensary", { state: { user: "patient" } })
                }
                className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1"
              >
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  DISPENSARY
                </h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <small>California</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>5d</small>
                  </li>
                </ul>
              </a>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden bg-green-400  hover:bg-green-500 hover:cursor-pointer rounded-4 shadow-lg"
              style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}
            >
              <a
                className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1"
                onClick={() =>
                  navigate("./authority", { state: { user: "patient" } })
                }
              >
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  REIMBURSMENTS
                </h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <small>California</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>5d</small>
                  </li>
                </ul>
              </a>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden bg-green-400  hover:bg-green-500 hover:cursor-pointer rounded-4 shadow-lg"
              style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}
            >
              <a
                onClick={() => navigate("./profile")}
                className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1"
              >
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                  PROFILE
                </h3>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="me-auto">
                    <img
                      src="https://github.com/twbs.png"
                      alt="Bootstrap"
                      width="32"
                      height="32"
                      className="rounded-circle border border-white"
                    />
                  </li>
                  <li className="d-flex align-items-center me-3">
                    <small>California</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>5d</small>
                  </li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
