import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  useEffect(() => {
    if (location.state?.userAdded) {
      loadUsers();
    }
  }, [location.state]);

  const loadUsers = async () => {
    try {
      const size = 5; // or your desired page size
      const result = await axios.get(
        `http://localhost:8080/user/all?page=${currentPage}&size=${size}`
      );
      console.log(result.data);
      setUsers(result.data.content);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      setError("Failed to load users. Please try again.");
      console.error(
        "Error loading users:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      loadUsers(); // Reload users after deletion
    } catch (error) {
      setError("Failed to delete user. Please try again.");
      console.error(
        "Error deleting user:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email ID</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{(currentPage - 1) * 5 + index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
