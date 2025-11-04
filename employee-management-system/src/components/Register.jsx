import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URI="http://localhost:4000"

const Register = () => {
    const navigate=useNavigate()
    const[values,setValues]=useState({uname:"",email:"",password:"",jobTitle:"",hireDate:Date,department:"",contact:"" })
    
    
    const changeHandler=(event)=>{
       const {name,value}=event.target;
        setValues({...values,[name]:value})

       
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        console.log(values)
         axios.post(URI + "/register",values)
         .then(res=>{console.log("dbres", res)
           if(!(localStorage.getItem("user")==="undefined")&&localStorage.getItem("user")===res.data.token){
            
            navigate("/profile")
           }
           else{
            console.log((res.data.token))
            localStorage.setItem("user", res.data.token)
            navigate("/profile")
           }
         })
         .catch(error=>console.error(error.message))
         

        
        


    }
  return (
    <div>
        Register
        <hr />
        <form onSubmit={submitHandler}>
        
        <div className="mb-3 row">
            <label for="name" className="col-sm-2 col-form-label">name</label>{changeHandler}
            <div className="col-sm-10">
            <input type="text" className="form-control" name='uname' id="name" onChange={changeHandler}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label for="email" className="col-sm-2 col-form-label">email</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" name="email" id="email" onChange={changeHandler}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label for="Password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" name="password" id="Password" onChange={changeHandler}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label for="jobTitle" className="col-sm-2 col-form-label">jobTitle</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" name="jobTitle" id="jobTitle" onChange={changeHandler}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label for="hireDate" className="col-sm-2 col-form-label">hireDate</label>
            <div className="col-sm-10">
            <input type="date" className="form-control" name="hireDate" id="hireDate"onChange={changeHandler}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label for="department" className="col-sm-2 col-form-label">department</label>
            <div className="col-sm-10">
            <input type="text" className="form-control" name='department' id="department"onChange={changeHandler}/>
            </div>
        </div>
        <div className="mb-3 row">
            <label for="contact" className="col-sm-2 col-form-label">contact</label>
            <div className="col-sm-10">
            <input type="text" className="form-control"  name="contact" id="contact" onChange={changeHandler}/>
            </div>
        </div>
         <button type='submit' className='btn btn-success'>submit</button>
</form>
</div>
  )
}

export default Register