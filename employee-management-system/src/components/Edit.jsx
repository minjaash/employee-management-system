import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const Edit = () => {
  const {id}=useParams();
  
  const URI="http://localhost:4000"
  const navigate=useNavigate()
  
  const[values,setValues]=useState({uname:"",email:"",password:"",jobTitle:"",hireDate:Date,department:"",contact:"" })
  useEffect(()=>{
    const token=localStorage.getItem('user')
    axios({
        method:'post',
        url:URI+"/Employee",
        data:{
          id:id
        }
     }
     
    )
    .then(res=>{
      console.log("edit values",res)
     setValues(res.data)
     console.log(values)
    }).catch(err=>console.log("error occured"))
  },[]
)

  const changeHandler=(event)=>{
    const {name,value}=event.target;
     setValues({...values,[name]:value})

    
 }
 const submitHandler=(event)=>{
  event.preventDefault();
  console.log(values)
   axios.post(URI + "/update",values)
   .then(res=>{
    console.log("dbres", res)
    //navigate("/profile/Employee")
        
   })
   .catch(error=>console.error(error.message))
   

  
  


}
  return (
    <div>
    Edit
    <hr />
    <form onSubmit={submitHandler}>
    
    <div className="mb-3 row">
        <label for="name" className="col-sm-2 col-form-label" >name</label>{changeHandler}
        <div className="col-sm-10">
        <input type="text" className="form-control" name='uname' id="name" value={values.uname} onChange={changeHandler}/>
        </div>
    </div>
    <div className="mb-3 row">
        <label for="email" className="col-sm-2 col-form-label">email</label>
        <div className="col-sm-10">
        <input type="email" className="form-control" name="email" id="email" value={values.email} onChange={changeHandler}/>
        </div>
    </div>
    <div className="mb-3 row">
        <label for="Password" className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
        <input type="password" className="form-control" name="password" id="Password" value={values.password} onChange={changeHandler}/>
        </div>
    </div>
    <div className="mb-3 row">
        <label for="jobTitle" className="col-sm-2 col-form-label">jobTitle</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" name="jobTitle" id="jobTitle" value={values.jobTitle} onChange={changeHandler}/>
        </div>
    </div>
    <div className="mb-3 row">
        <label for="hireDate" className="col-sm-2 col-form-label">hireDate</label>
        <div className="col-sm-10">
        <input type="date" className="form-control" name="hireDate" id="hireDate" value={values.hireDate} onChange={changeHandler}/>
        </div>
    </div>
    <div className="mb-3 row">
        <label for="department" className="col-sm-2 col-form-label">department</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" name='department' id="department" value={values.department} onChange={changeHandler}/>
        </div>
    </div>
    <div className="mb-3 row">
        <label for="contact" className="col-sm-2 col-form-label">contact</label>
        <div className="col-sm-10">
        <input type="text" className="form-control"  name="contact" id="contact" value={values.contact} onChange={changeHandler}/>
        </div>
    </div>
     <button type='submit' className='btn btn-success'>submit</button>
</form>
</div>
  )
}

export default Edit