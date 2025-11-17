import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const URI = process.env.REACT_APP_API_URL;
    const [empList, setEmpList] = useState([])

    useEffect(() => {
        axios.get(URI + "/employees")
            .then(res => {
                setEmpList(res.data)
                console.log("emplist", res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="container-fluid mt-3">
            <ol className='border border-1  w-100'>
                {empList.map((emp, ind) =>
                    <li className='border border-1 me-2 mb-2 p-2 w-100' key={ind}>
                        <div className="d-flex justify-content-between me-2 align-items-center w-100">
                            <div className="flex-grow-1">{emp.uname}</div>
                            <div>
                                <Link to={`/Edit/${emp._id}`}>
                                    <button className="btn btn-warning me-2">edit</button>
                                </Link>
                                <Link to={`/delete/${emp._id}`}>
                                    <button className="btn btn-danger">delete</button>
                                </Link>
                            </div>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default EmployeeList
