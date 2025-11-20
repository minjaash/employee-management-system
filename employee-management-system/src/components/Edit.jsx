import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const URI = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const [originalUser, setOriginalUser] = useState({ _id: "" });

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) return navigate('/login');

    axios.post(`${URI}/Employee`, { id }).then(res => {
       if (res.data.hireDate) {
    res.data.hireDate = res.data.hireDate.split("T")[0];
  }
      setValues(res.data);
      setOriginalUser({ _id: res.data._id });
    });
  }, [id]);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios.post(`${URI}/update`, values)
      .then(res => {
        const updatedUser = res.data;
        const loggedId = localStorage.getItem("userId");

        if (loggedId === originalUser._id) {
          localStorage.setItem("userData", JSON.stringify(updatedUser));
          navigate('/profile', { replace: true });
        } else {
          navigate('/profile/employeeList');
        }
      });
  };

  return (
    <div>
      <h3>Edit Employee</h3>
      <hr />

      <form onSubmit={submitHandler}>
        {["uname", "email", "password", "jobTitle", "hireDate", "department", "contact"].map(field => (
          <div className="mb-3 row" key={field}>
            <label className="col-sm-2 col-form-label">{field}</label>
            <div className="col-sm-10">
              <input
                type={field === "password" ? "password" : field === "hireDate" ? "date" : "text"}
                className="form-control"
                name={field}
                value={values[field] || ""}
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

export default Edit;
