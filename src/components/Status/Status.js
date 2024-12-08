import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Status() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div>
      {/* SITE LOGO */}
      <div className="d-flex flex-wrap align-items-center justify-content-around py-1 border-bottom">
        <div className="white-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)", transform: "0", msfilter: "0" }}
          >
            <circle cx="12" cy="6" r="2"></circle>
            <path d="M14 9h-4a1 1 0 0 0-.8.4l-3 4 1.6 1.2L9 13v7h2v-4h2v4h2v-7l1.2 1.6 1.6-1.2-3-4A1 1 0 0 0 14 9z"></path>
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)", transform: "0", msfilter: "0" }}
          >
            <path d="M12.005 21.992v-3.877c4.104 0 7.288-4.068 5.714-8.388a5.81 5.81 0 0 0-3.457-3.446c-4.319-1.563-8.389 1.61-8.389 5.714H2.008c0-6.541 6.325-11.642 13.184-9.499 2.991.94 5.383 3.321 6.313 6.313 2.141 6.858-2.96 13.183-9.5 13.183z"></path>
            <path d="M12.017 18.139H8.152v-3.866h3.865zm-3.865 2.959H5.193v-2.959h2.959zm-2.959-2.959H2.711v-2.483h2.482v2.483z"></path>
          </svg>
        </div>
      </div>

      {/* HEADER */}
      <header className="d-flex flex-wrap align-items-center justify-content-center py-3 mb-4 border-bottom">
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
        </ul>
      </header>

      {/* FOOTER */}
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-black">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-black">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-black">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-black">
              Help
            </a>
          </li>
        </ul>
        <p className="text-center text-black">© 2024 Company, Inc</p>
      </footer>
    </div>
  );
}

export default Status;
