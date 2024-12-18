import axios from "axios";
import React, { useState } from "react";

// Example of a state model based on the expected response
function Dispensary() {
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    aadharNumber: "",
    email: "",
  });

  const [prescriptions, setPrescriptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/get-prescription/name/${patientInfo.name}/aadhar/${patientInfo.aadharNumber}/email/${patientInfo.email}`
      );

      console.log(response.data); // Log the full response to inspect its structure

      if (response.data && Array.isArray(response.data.prescriptions)) {
        setPrescriptions(response.data.prescriptions);
        alert("Prescription data received successfully");
      } else {
        alert("Invalid data format received");
        setPrescriptions([]); // Reset prescriptions to avoid undefined state
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      setPrescriptions([]); // Ensure prescriptions state remains an array
      alert("Error fetching prescriptions");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Patient Details
      </h1>

      {/* Patient Details Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={patientInfo.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Aadhar Number:
          </label>
          <input
            type="text"
            name="aadharNumber"
            value={patientInfo.aadharNumber}
            onChange={handleInputChange}
            maxLength="12"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={patientInfo.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Submit
        </button>
      </form>

      {/* Prescription Cards */}
      {/* Prescription Cards */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Past Prescriptions
        </h2>
        {prescriptions.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Prescription Date:{" "}
                  <span className="text-green-600">
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </span>
                </h3>
                <img
                  src={prescription.prescriptionImage}
                  alt="Prescription"
                  className="w-full h-full object-contain rounded-lg mb-4 bg-gray-100"
                />
                <h4 className="font-medium text-gray-700 mb-2 text-lg">
                  Medicines Issued:
                </h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {prescription.medicinesIssued.map((medicine) => (
                    <li key={medicine.id} className="text-md">
                      <span className="font-semibold text-gray-800">
                        {medicine.medicineName}
                      </span>{" "}
                      ({medicine.quantity} x {medicine.period})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No past prescriptions available.</p>
        )}
      </div>
    </div>
  );
}

export default Dispensary;
