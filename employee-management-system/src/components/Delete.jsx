import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("user");

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!token) {
      alert("Unauthorized. Please login first.");
      navigate("/login");
      return;
    }

    axios.post(`${URI}/Employee`, { id })
      .then(res => setEmployee(res.data))
      .catch(err => console.error("Error fetching employee", err));
  }, [id, navigate, token, URI]);

  const HandleDelete = (id) => {
    axios.delete(`${URI}/deleteEmployee?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      const loggedInUserId = localStorage.getItem("userId");
      if (loggedInUserId === id) {
        // Deleted own profile
        alert("Your profile has been deleted.");
        localStorage.clear();
        navigate("/register");
      } else {
        alert("Employee deleted successfully");
        navigate('/profile/employeeList');
      }
    })
    .catch(err => {
      console.error("Error deleting employee", err);
      alert("Failed to delete employee");
      navigate("/profile/employeeList");
    });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-danger mb-3">Delete Employee</h3>
      <div className="card p-3">
        <p>
          {employee ? (
            <>Are you sure you want to delete <strong>{employee.uname}</strong>?</>
          ) : (
            "Loading employee details..."
          )}
        </p>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={() => HandleDelete(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
