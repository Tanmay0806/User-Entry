import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "", 
    address: "",
  });

  const [error, setError] = useState(""); 

  const { firstName, lastName, phoneNumber, email, address } = user; 

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/user/${id}`, user);
      navigate("/"); 
    } catch (error) {
      setError("Failed to update user. Please check the input fields.");
      console.error("Error updating user:", error);
    }
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/${id}`);
      setUser(result.data);
    } catch (error) {
      setError("Failed to load user data. Please try again.");
      console.error("Error loading user:", error);
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>} 
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                name="firstName"
                value={firstName}
                onChange={onInputChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onInputChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">  
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email ID"
                name="email" 
                value={email}
                onChange={onInputChange}
                required 
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                className="form-control"
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={onInputChange}
                required 
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
