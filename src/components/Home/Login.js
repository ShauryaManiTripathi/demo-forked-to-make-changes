import React from "react";
import { useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  const { logIn, user } = location.state || {};

  return (
    <div>
      <main className="form-signin m-auto w-75 d-flex flex-column justify-content-center">
        {/* INDIAN EMBLEM */}
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

        <div className="d-flex justify-content-center">
          <form className="w-75 me-2 d-flex flex-column">
            <h1 className="h3 mb-3 fw-normal">
              {logIn ? "Please Log In" : "Please Sign In"}
            </h1>
            <div className="form-floating mb-1">
              <input
                type="name"
                className="form-control"
                id="floatingInput"
                placeholder="Name"
                required
              />
              <label for="floatingInput">Name</label>
            </div>

            {/* WHILE USER LOG/SIGN IN ONLY  */}
            {user === "patient" && (
              <div className="form-floating mb-1">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Benificary Id"
                  required
                />
                <label for="floatingInput">Benificary Id</label>
              </div>
            )}

            {/* WHILE HOSPITAL LOG/SIGN IN ONLY  */}
            {user === "hospital" && (
              <div className="form-floating mb-1">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Benificary Id"
                  required
                />
                <label for="floatingInput">Hospital Id</label>
              </div>
            )}

            {/* WHILE AUTHORITY LOG/SIGN IN ONLY*/}
            {user === "authority" && (
              <div className="form-floating mb-1">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Benificary Id"
                  required
                />
                <label for="floatingInput">Authority Id</label>
              </div>
            )}

            {/* WHILE USER/AUTHORITY SIGN IN ONLY  */}
            {!logIn && (user === "patient" || user === "authority") && (
              <div className="w-100 me-2 d-flex flex-column">
                <div className="form-floating mb-1">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingAadhar"
                    placeholder="Enter your aadhar number"
                    maxlength="12"
                    required
                  />
                  <label for="floatingInput">Aadhar Number</label>
                </div>
                <div className="form-floating mb-1">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
            )}
            <div className="form-floating mb-1">
              <input
                type="tel"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                maxlength="10"
                required
              />
              <label for="floatingInput">Phone Number</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
              />
              <label for="floatingPassword">Password</label>
            </div>
          </form>

          {/* WHILE USER LOG IN ONLY  */}
          {!logIn && user === "patient" && (
            <form className="w-75 ms-2 d-flex flex-column">
              <h1 className="h3 mb-3 fw-normal">Account Details</h1>
              <div className="form-floating mb-1">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Account Number"
                  required
                />
                <label for="floatingPassword">Account Number</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Name"
                  required
                />
                <label for="floatingPassword">Holder Name</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Branch"
                  required
                />
                <label for="floatingPassword">Bank Branch</label>
              </div>
              <div className="form-floating mb-1">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="IFSC Code"
                  required
                />
                <label for="floatingPassword">IFSC Code</label>
              </div>
            </form>
          )}
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          {logIn ? "Log In" : "Sign In"}
        </button>
      </main>
    </div>
  );
}

export default Login;
