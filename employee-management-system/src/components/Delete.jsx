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
    if (!token) return navigate("/login");

    axios.post(`${URI}/Employee`, { id })
    .then(res => setEmployee(res.data));
     }, [id]);

  const HandleDelete = () => {
    axios.delete(`${URI}/deleteEmployee?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      const loggedId = localStorage.getItem("userId");

      if (loggedId === id) {
        localStorage.clear();
        navigate("/login");
      } else {
        navigate("/profile/employeeList");
      }
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
          <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn btn-danger" onClick={HandleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
