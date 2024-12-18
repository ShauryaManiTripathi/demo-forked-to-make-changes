import React from "react";

function PastApplication() {
  return (
    <div className="pastApplication">
      <h1>Past Application</h1>
      <ol>
        {/* form a card which will seperately show all the previous application */}
        <li>
          <ul>
            <li>Bill Details</li>
            <ul>
              <li>Date</li>
              <li>Bill No.</li>
              <ol>
                {/* form a card for this information */}
                <li>
                  <ul>
                    <li>Medicine 1</li>
                    <li>Quantity</li>
                    <li>Amount</li>
                  </ul>
                </li>
              </ol>
            </ul>
          </ul>
        </li>
      </ol>
    </div>
  );
}

export default PastApplication;
