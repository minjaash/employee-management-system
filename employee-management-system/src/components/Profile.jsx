import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import axios from 'axios';

const Profile = () => {
  const URI = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      navigate("/");
      return;
    }

    const localUserData = localStorage.getItem("userData");
    if (localUserData) {
      setUserData(JSON.parse(localUserData));
    } else {
      axios.post(`${URI}/userData`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUserData(res.data));
    }
  }, [location.pathname]);

  const clickHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="border p-4 rounded">
        {["uname", "email", "jobTitle", "hireDate", "department", "contact"].map(key => (
          <div className="d-flex mt-2" key={key}>
            <span><b>{key}:</b></span>
            <span><p>{userData[key]}</p></span>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button className="btn btn-danger" onClick={clickHandler}>Logout</button>
      </div>

      <div className="mt-3">
        <button className="btn btn-info">
          <Link to="/profile/employeeList" className="text-white text-decoration-none">Employees List</Link>
        </button>
      </div>

      <Outlet />
    </div>
  );
};

export default Profile;
