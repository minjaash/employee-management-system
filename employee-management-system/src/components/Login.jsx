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
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post(`${URI}/login`, values)
      .then(res => {
        const token = res.data.token;
        if (!token) {
          alert("Login failed");
          return;
        }

        localStorage.setItem("user", token);

        axios.post(`${URI}/userData`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res2 => {
          const userData = res2.data;

          localStorage.setItem("userId", userData._id);
          localStorage.setItem("userData", JSON.stringify(userData));

          navigate("/profile");
        });
      })
      .catch(err => console.log("Error in login", err));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="uname" className="form-control" onChange={changeHandler} />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className="form-control" onChange={changeHandler} />
        </div>

        <button type="submit" className="btn btn-success">Login</button>
      </form>
    </div>
  );
};

export default Login;
