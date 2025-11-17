import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const URI = process.env.REACT_APP_API_URL;
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

  const [originalUser, setOriginalUser] = useState({ _id: "", uname: "" });

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.post(`${URI}/Employee`, { id })
      .then(res => {
        setValues(res.data);
        setOriginalUser({ _id: res.data._id, uname: res.data.uname });
      })
      .catch(err => console.log("Error fetching employee", err));
  }, [id, navigate, URI]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post(`${URI}/update`, values)
      .then(res => {
        const loggedInUserId = localStorage.getItem("userId");

        if (loggedInUserId === originalUser._id) {
          // Update localStorage and reflect in profile
          localStorage.setItem("userData", JSON.stringify(values));
          alert("Your profile has been updated!");
          navigate('/profile', { replace: true });
        } else {
          navigate('/profile/employeeList');
        }
      })
      .catch(err => console.error("Error updating employee", err));
  }

  return (
    <div>
      <h3>Edit Employee</h3>
      <hr />
      <form onSubmit={submitHandler}>
        {["uname","email","password","jobTitle","hireDate","department","contact"].map((field) => (
          <div className="mb-3 row" key={field}>
            <label htmlFor={field} className="col-sm-2 col-form-label">{field}</label>
            <div className="col-sm-10">
              <input
                type={field==="password"?"password":field==="hireDate"?"date":"text"}
                className="form-control"
                name={field}
                id={field}
                value={values[field]}
                onChange={changeHandler}
              />
            </div>
          </div>
        ))}
        <button type='submit' className='btn btn-success'>Submit</button>
      </form>
    </div>
  );
}

export default Edit;
