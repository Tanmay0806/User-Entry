import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const { firstName, lastName, phoneNumber, email, address } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user/create", user);
      navigate("/", { state: { userAdded: true } }); // Pass state to indicate user was added
    } catch (error) {
      setError("Failed to add user. Please check input fields.");
      console.error("Error adding user:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add User</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="LastName" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email ID</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email ID"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address</label>
              <textarea
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={onInputChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
