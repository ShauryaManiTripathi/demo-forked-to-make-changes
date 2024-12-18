import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [reimbursementBills, setReimbursementBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/get-user-details",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        setUser(() => ({
          name: response.data.userDetails.name,
          email: response.data.userDetails.email,
          phoneNumber: response.data.userDetails.phoneNumber,
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const prescriptionResponse = await axios.get(
          "http://localhost:8080/prescription",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (
          prescriptionResponse.data &&
          Array.isArray(prescriptionResponse.data.prescriptions)
        ) {
          setPrescriptions(prescriptionResponse.data.prescriptions);
        }
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    const fetchReimbursementBills = async () => {
      try {
        const reimbursementResponse = await axios.get(
          "http://localhost:8080/reimburse-bill",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if (
          reimbursementResponse.data &&
          Array.isArray(reimbursementResponse.data.reimburseBills)
        ) {
          setReimbursementBills(reimbursementResponse.data.reimburseBills);
        }
      } catch (error) {
        console.error("Error fetching reimbursement bills:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUserData(),
        fetchPrescriptions(),
        fetchReimbursementBills(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Patient Profile
      </h1>

      {/* Patient Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Patient Information
        </h2>
        <p className="text-lg">Name: {user.name}</p>
        <p className="text-lg">Email: {user.email}</p>
        <p className="text-lg">Ph No.: {user.phoneNumber}</p>
      </div>

      {/* Prescriptions Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Past Prescriptions
        </h2>
        {prescriptions.length > 0 ? (
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Prescription ID:{" "}
                  <span className="text-green-600">{prescription.id}</span>
                </h3>
                <img
                  src={prescription.prescriptionImage}
                  alt="Prescription"
                  className="w-full h-full object-contain rounded-lg mb-4 bg-gray-100"
                />
                <p className="text-lg">
                  Beneficiary ID:{" "}
                  <span className="text-gray-800">
                    {prescription.beneficiaryId}
                  </span>
                </p>
                <p className="text-lg">
                  Created At:{" "}
                  <span className="text-gray-800">
                    {new Date(prescription.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No past prescriptions available.</p>
        )}
      </div>

      {/* Reimbursement Bills Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Reimbursement Bills
        </h2>
        {reimbursementBills.length > 0 ? (
          <div className="space-y-4">
            {reimbursementBills.map((bill) => (
              <div
                key={bill.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Bill Number:{" "}
                  <span className="text-green-600">{bill.billNumber}</span>
                </h3>
                <img
                  src={bill.billImage}
                  alt="Bill"
                  className="w-full h-full object-contain rounded-lg mb-4 bg-gray-100"
                />
                <p className="text-lg">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      bill.status.toLowerCase() === "approved"
                        ? "text-green-600"
                        : bill.status.toLowerCase() === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reimbursement bills available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
