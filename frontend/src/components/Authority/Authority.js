import React, { useEffect, useState } from "react";
import axios from "axios";

const Authority = () => {
  const [pendingBills, setPendingBills] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch pending reimbursement bills
  useEffect(() => {
    const fetchPendingBills = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/reimburse-bill?status=Pending", // API endpoint to fetch pending bills
          {
            headers: {
              Authorization: localStorage.getItem("token"), // Add your token logic
            },
          }
        );
        if (
          response.data &&
          response.data.message === "reimburse bills fetched successfully"
        ) {
          setPendingBills(response.data.reimburseBills);
        }
      } catch (error) {
        console.error("Error fetching pending bills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBills();
  }, []);

  // Update the status of a reimbursement bill
  const updateBillStatus = async (billId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/update/reimburse-bill/${billId}`, // Replace with your API endpoint
        { status: newStatus }, // Pass the new status in the request body
        {
          headers: {
            Authorization: localStorage.getItem("token"), // Add your token logic
          },
        }
      );

      if (
        response.data &&
        response.data.message === "Status updated successfully"
      ) {
        // Update UI: Remove the bill from the list after updating the status
        setPendingBills((prevBills) =>
          prevBills.filter((bill) => bill.id !== billId)
        );
        alert(`Bill has been marked as ${newStatus}`);
      }
    } catch (error) {
      console.error(`Error updating bill status to ${newStatus}:`, error);
      alert("Failed to update bill status. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        Authority Dashboard
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Pending Reimbursement Bills
        </h2>

        {pendingBills.length > 0 ? (
          <div className="space-y-6">
            {pendingBills.map((bill) => (
              <div
                key={bill.id}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill Number:{" "}
                  <span className="text-green-600">{bill.billNumber}</span>
                </h3>
                <img
                  src={bill.billImage}
                  alt="Bill"
                  className="w-full h-48 object-contain rounded-lg my-4 bg-gray-100"
                />
                <p className="text-md text-gray-700">
                  Beneficiary ID: {bill.beneficiaryId}
                </p>
                <p className="text-md text-gray-700">
                  Prescription ID: {bill.prescriptionId}
                </p>
                <p className="text-md text-gray-700">
                  Status: <span className="text-yellow-600">{bill.status}</span>
                </p>
                <div className="flex gap-4 mt-4">
                  {/* Approve Button */}
                  <button
                    onClick={() => updateBillStatus(bill.id, "Approved")}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>

                  {/* Reject Button */}
                  <button
                    onClick={() => updateBillStatus(bill.id, "Rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No pending reimbursement bills available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Authority;
