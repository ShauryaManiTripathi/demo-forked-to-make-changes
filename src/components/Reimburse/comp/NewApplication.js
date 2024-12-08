import React from "react";

function NewApplication() {
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

        <div className="d-flex flex-column justify-content-center align-items-center">
          <form className="w-75 me-2 d-flex flex-column">
            <h1 className="h3 mb-3 fw-normal">New Applicaton</h1>
            <div className="d-flex justify-content-center align-items-center">
              {/* PRESCRIPTION ID  */}
              <div className="form-floating mb-1 w-50 me-2">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Name"
                  required
                />
                <label for="floatingInput">Prescription Id</label>
              </div>
              {/* PRESCRIPTION IMAGE  */}
              <div className="form-floating mb-1 w-50 ms-2">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Benificary Id"
                  required
                />
                <label for="floatingInput">Prescription Image</label>
              </div>
            </div>
            <h1 className="h3 mb-3 fw-normal">Bill Details</h1>
            <div className="d-flex justify-content-center align-items-center">
              {/* BILL NUMBER  */}
              <div className="form-floating mb-1 w-50 me-2">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Name"
                  required
                />
                <label for="floatingInput">Bill Number</label>
              </div>

              {/* DATE  */}
              <div className="form-floating mb-1 w-50 ms-2">
                <input
                  type="name"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Benificary Id"
                  required
                />
                <label for="floatingInput">Date</label>
              </div>
            </div>

            {/* INPUT */}
            <div>
              <div className="row g-4">
                <div className="col-sm-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Medicine Name"
                    aria-label="Medicine Name"
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    aria-label="Quantity"
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    aria-label="Price"
                  />
                </div>
              </div>
              <div className="row g-4">
                <div className="col-sm-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Medicine Name"
                    aria-label="Medicine Name"
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    aria-label="Quantity"
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    aria-label="Price"
                  />
                </div>
              </div>
              <div className="row g-4">
                <div className="col-sm-7 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Medicine Name"
                    aria-label="Medicine Name"
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quantity"
                    aria-label="Quantity"
                  />
                </div>
                <div className="col-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    aria-label="Price"
                  />
                </div>
              </div>
            </div>
            <div className="row g-4">
              <h3 className="col-sm-3">Net Amount</h3>
              <div className="col-sm-9 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Medicine Name"
                  aria-label="Medicine Name"
                />
              </div>
            </div>
          </form>

          <button className="btn btn-primary w-75 py-2 mt-4" type="submit">
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}

export default NewApplication;
