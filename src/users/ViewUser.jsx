import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailId: "",
    address: "",
  });

  const [error, setError] = useState(""); 

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  
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
          <h2 className="text-center m-4">User Details</h2>

          <div className="card">
            <div className="card-header">
              Details of User ID: {id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>First Name:</b> {user.firstName}
                </li>
                <li className="list-group-item">
                  <b>Last Name:</b> {user.lastName}
                </li>
                <li className="list-group-item">
                  <b>Phone Number:</b> {user.phoneNumber}
                </li>
                <li className="list-group-item">
                  <b>Email ID:</b> {user.emailId}
                </li>
                <li className="list-group-item">
                  <b>Address:</b> {user.address}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
