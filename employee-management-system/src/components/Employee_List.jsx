import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Edit from './Edit';

const EmployeeList = () => {
    const URI= process.env.REACT_APP_API_URL;
   

    const[empList,setEmpList]=useState([])
    useEffect(()=>{
        axios.get(URI+"/employees")
        .then(res=>{
            
            setEmpList(res.data)
            console.log("emplist",res.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },[])
  return (
    <div >
        <ol className= ' mt-3 border border-1'>
            {empList.map((emp,ind)=>
            //<li className='border border-2' key={ind}>{emp.uname} <div> <button className="btn btn-warning"> edit</button><button className="btn btn-danger"> delete</button></div></li>
           <li className='border border-1' key={ind}>
           <div className="d-flex bd-highlight">
            <div className="p-2 flex-grow-1 bd-highlight">{emp.uname}</div>
            <p>{emp._id}</p>
            <div className="p-2 bd-highlight"><Link to={`/Edit/${emp._id}`}><button className="btn btn-warning">edit</button></Link></div>
            <div className="p-2 bd-highlight"><Link to={`/delete/${emp._id}`}><button className="btn btn-danger">delete</button></Link></div>
          </div>
          </li> )}
        </ol>
    </div>
  )
}

export default EmployeeList