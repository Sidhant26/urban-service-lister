import React, { useState } from "react";

function AddressForm({ onSubmit }) {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="mb-3">Enter Your Address</h5>
      <div className="mb-3">
        <label htmlFor="street" className="form-label">
          Street Address
        </label>
        <input
          type="text"
          className="form-control"
          id="street"
          name="street"
          value={address.street}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">
          City
        </label>
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form-label">
          State
        </label>
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="zip" className="form-label">
          ZIP Code
        </label>
        <input
          type="text"
          className="form-control"
          id="zip"
          name="zip"
          value={address.zip}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Address
      </button>
    </form>
  );
}

export default AddressForm;
