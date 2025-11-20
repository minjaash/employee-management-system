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
    <div className="container mt-5">

      {/* Profile section */}
      <div className="border p-4 rounded mb-4">
        {["uname", "email", "jobTitle", "hireDate", "department", "contact"].map(key => (
          <div className="d-flex mt-2" key={key}>
            <strong style={{ width: "120px" }}>{key}:</strong>
            <span>{userData[key]}</span>
          </div>
        ))}

        <div className="mt-3 d-flex gap-3">
          <button className="btn btn-danger" onClick={clickHandler}>Logout</button>

          <Link to="/profile/employeeList" className="btn btn-info text-white">
            Employees List
          </Link>
        </div>
      </div>

      {/* Nested Routes Render Here */}
      <Outlet />

    </div>
  );
};

export default Profile;
