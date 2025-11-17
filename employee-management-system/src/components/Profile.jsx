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
      })
      .then(res => setUserData(res.data))
      .catch(err => console.log("error occurred"));
    }
  }, [location.pathname]);

  const clickHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
    navigate("/");
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="border p-4 rounded">
        <div className="d-flex mt-2"><span><b>uname:</b></span><span><p>{userData.uname}</p></span></div>
        <div className="d-flex mt-2"><span><b>jobTitle:</b></span><span><p>{userData.jobTitle}</p></span></div>
        <div className="d-flex mt-2"><span><b>hireDate:</b></span><span><p>{userData.hireDate}</p></span></div>
        <div className="d-flex mt-2"><span><b>department:</b></span><span><p>{userData.department}</p></span></div>
        <div className="d-flex mt-2"><span><b>contact:</b></span><span><p>{userData.contact}</p></span></div>
      </div>

      <div className="mt-3">
        <button className="btn btn-danger" onClick={clickHandler}>Logout</button>
      </div>

      <div className="mt-3">
        <button className="btn btn-info">
          <Link to="/profile/employeeList" className="text-white text-decoration-none">EmployeesList</Link>
        </button>
      </div>

      <Outlet />
    </div>
  );
}

export default Profile;
