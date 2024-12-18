import React, { useState } from "react";

function NewApplication() {
  const [formData, setFormData] = useState({
    billNumber: 0,
    billImage: "",
    prescriptionId: "",
    medicine: [],
  });

  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      quantity: 0,
      amount: "",
    },
  ]);

  const [inputFields, setInputFields] = useState(["abc"]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMedicine = (e, index) => {
    const { name, value } = e.target;
    setMedicines((prevData) => {
      const updatedMedicines = [...prevData];
      updatedMedicines[index] = { ...updatedMedicines[index], [name]: value };
      return updatedMedicines;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({ ...prevData, medicine: medicines }));
    // form submit logic
  };

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-around py-1 border-bottom">
        <div className="white-box">
          <img
            src="https://nandadeepeyehospital.org/wp-content/uploads/2024/08/CGHS-scheme.png"
            alt="Digital India"
            className="mb-4"
            style={{
              display: "block", // Make it a block element
              marginLeft: "auto", // Center the image horizontally
              marginRight: "auto", // Center the image horizontally
              width: "200px", // Set the width (change it as needed)
              height: "auto", // Maintain the aspect ratio based on the width
            }}
          />
        </div>
        <div className="box d-flex flex-column">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/752px-Emblem_of_India.svg.png"
            alt="National Emblem of India"
            className="mb-4"
            style={{
              display: "block", // Make it a block element
              marginLeft: "auto", // Center the image horizontally
              marginRight: "auto", // Center the image horizontally
              width: "80px", // Set the width (change it as needed)
              height: "auto", // Maintain the aspect ratio based on the width
            }}
          />
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
          <form
            className="w-75 me-2 d-flex flex-column"
            onSubmit={handleSubmit}
          >
            <h1 className="h3 mb-3 fw-normal">New Application</h1>
            <div className="d-flex justify-content-center align-items-center">
              {/* PRESCRIPTION ID */}
              <div className="form-floating mb-1 w-50 me-2">
                <input
                  onChange={handleFormChange}
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Prescription Id"
                  name="prescriptionId"
                  value={formData.prescriptionId}
                  required
                />
                <label htmlFor="floatingInput">Prescription Id</label>
              </div>
              {/* PRESCRIPTION IMAGE */}
              <div className="form-floating mb-1 w-50 ms-2">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFormChange}
                  id="floatingInput"
                  name="billImage"
                  value={formData.billImage}
                  required
                />
                <label htmlFor="floatingInput">Prescription Image</label>
              </div>
            </div>
            <h1 className="h3 mb-3 fw-normal">Bill Details</h1>
            <div className="d-flex justify-content-center align-items-center">
              {/* BILL NUMBER */}
              <div className="form-floating mb-1 w-50 me-2">
                <input
                  type="text"
                  onChange={handleFormChange}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Bill Number"
                  name="billNumber"
                  value={formData.billNumber}
                  required
                />
                <label htmlFor="floatingInput">Bill Number</label>
              </div>

              {/* DATE */}
              <div className="form-floating mb-1 w-50 ms-2">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Date"
                  required
                />
                <label htmlFor="floatingInput">Date</label>
              </div>
            </div>

            {/* INPUT FIELDS */}
            <div>
              {inputFields.map((d, index) => (
                <div key={index} className="row g-4">
                  <div className="col-sm-7 mb-2">
                    <input
                      type="text"
                      onChange={(e) => handleMedicine(e, index)}
                      className="form-control"
                      name="medicineName"
                      value={medicines[index]?.medicineName || ""}
                      placeholder="Medicine Name"
                      aria-label="Medicine Name"
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="number"
                      onChange={(e) => handleMedicine(e, index)}
                      className="form-control"
                      name="quantity"
                      value={medicines[index]?.quantity || 0}
                      placeholder="Quantity"
                      aria-label="Quantity"
                    />
                  </div>
                  <div className="col-sm">
                    <input
                      type="text"
                      onChange={(e) => handleMedicine(e, index)}
                      className="form-control"
                      name="amount"
                      value={medicines[index]?.amount || ""}
                      placeholder="Price"
                      aria-label="Price"
                    />
                  </div>
                </div>
              ))}

              <div className="my-2 d-flex justify-center">
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg"
                  onClick={() => {
                    setMedicines((prevData) => [
                      ...prevData,
                      {
                        medicineName: "",
                        quantity: 0,
                        amount: "",
                      },
                    ]);
                    setInputFields((prevData) => [...prevData, "abc"]);
                  }}
                >
                  Add Medicine +
                </button>
              </div>
            </div>

            {/* NET AMOUNT */}
            <div className="row g-4">
              <h3 className="col-sm-3">Net Amount</h3>
              <div className="col-sm-9 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Net Amount"
                  aria-label="Net Amount"
                />
              </div>
            </div>

            <button className="btn btn-primary w-full py-2 mt-4" type="submit">
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default NewApplication;
