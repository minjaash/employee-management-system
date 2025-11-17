import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URL;

  const [values, setValues] = useState({ uname: "", password: "" });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post(`${URI}/Login`, values)
      .then(res => {
        const token = res.data.token;
        if (!token) {
          console.log("Login failed");
          return;
        }

        // Store token
        localStorage.setItem("user", token);

        // Fetch logged-in user data to get _id and full info
        axios.post(`${URI}/userData`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res2 => {
          const userData = res2.data;
          localStorage.setItem("userId", userData._id);       // store user id
          localStorage.setItem("userData", JSON.stringify(userData)); // optional: store full user info
          navigate("/profile");
        })
        .catch(err => console.log("Error fetching user data", err));
      })
      .catch(err => console.log("Error in login", err));
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="uname"
            className="form-control"
            onChange={changeHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={changeHandler}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
}

export default Login;
