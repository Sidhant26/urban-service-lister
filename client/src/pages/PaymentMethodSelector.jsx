import React from "react";

function PaymentMethodSelector({ onSelect }) 
{
  const handleSelect = (method) => {
    onSelect(method);
  };

  return (
    <div className="mb-3">
      <span>Select Payment Method:</span>
      <div>
        <button
          type="button"
          className="btn btn-sm mx-2 btn-outline-primary"
          onClick={() => handleSelect("online")}
        >
          Online Payment
        </button>
        <button
          type="button"
          className="btn btn-sm mx-2 btn-outline-primary"
          onClick={() => handleSelect("cod")}
        >
          Cash on Delivery
        </button>
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
