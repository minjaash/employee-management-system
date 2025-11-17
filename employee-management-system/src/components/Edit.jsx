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

    // Fetch employee details
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
        console.log("Employee updated", res.data);

        const loggedInUserId = localStorage.getItem("userId"); // store this on login

        if (loggedInUserId === originalUser._id) {
          // User updated their own profile
          localStorage.setItem("userData", JSON.stringify(values)); // <-- Update localStorage
          alert("Your profile has been updated!");
          navigate('/profile', { replace: true });
        } else {
          // Navigating back to employee list
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

        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name='uname' id="name" value={values.uname} onChange={changeHandler} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" name="email" id="email" value={values.email} onChange={changeHandler} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="Password" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" name="password" id="Password" value={values.password} onChange={changeHandler} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="jobTitle" className="col-sm-2 col-form-label">Job Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="jobTitle" id="jobTitle" value={values.jobTitle} onChange={changeHandler} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="hireDate" className="col-sm-2 col-form-label">Hire Date</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" name="hireDate" id="hireDate" value={values.hireDate} onChange={changeHandler} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="department" className="col-sm-2 col-form-label">Department</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name='department' id="department" value={values.department} onChange={changeHandler} />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="contact" className="col-sm-2 col-form-label">Contact</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="contact" id="contact" value={values.contact} onChange={changeHandler} />
          </div>
        </div>

        <button type='submit' className='btn btn-success'>Submit</button>
      </form>
    </div>
  );
}

export default Edit;
