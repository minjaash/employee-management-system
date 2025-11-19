import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URI = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    uname: "",
    email: "",
    password: "",
    jobTitle: "",
    hireDate: "",
    department: "",
    contact: ""
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post(URI + "/register", values)
      .then(res => {
        const token = res.data.token;
        if (!token) {
          alert("Registration failed");
          return;
        }

        localStorage.setItem("user", token);

        axios.post(`${URI}/userData`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res2 => {
            const userData = res2.data;
            localStorage.setItem("userId", userData._id);
            localStorage.setItem("userData", JSON.stringify(userData));

            navigate("/profile");
          })
          .catch(err => console.log("Error fetching user data", err));
      })
      .catch(error => console.error("Register Error:", error));
  };

  return (
    <div>
      <h3>Register</h3>
      <hr />
      <form onSubmit={submitHandler}>
        {["uname", "email", "password", "jobTitle", "hireDate", "department", "contact"].map(field => (
          <div className="mb-3 row" key={field}>
            <label className="col-sm-2 col-form-label">{field}</label>
            <div className="col-sm-10">
              <input
                type={field === "password" ? "password" : field === "hireDate" ? "date" : "text"}
                name={field}
                className="form-control"
                onChange={changeHandler}
              />
            </div>
          </div>
        ))}
        <button type='submit' className='btn btn-success'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
