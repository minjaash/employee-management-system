import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate,Link, Outlet} from "react-router-dom"



const Profile = () => {
  const URI="http://localhost:4000"
  const[userData,setUserData]=useState({})
  const navigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem('user')
    
    if (token==="undefined"){
      navigate("/")
    }else{
      axios({
        method: 'post',
        url:URI+"/userData" ,
        headers:{
          Authorization:"Bearer "+token
        }
      }).then(res=>{
        console.log("first response",res)
       setUserData(res.data)
       console.log("second response",userData)
      }).catch(err=>console.log("error occured"))
      // axios.post(URI+"/userData",{token})
      // .then(res=>{
      //   userData=res.data;
      // })
      // .catch(err=>console.log("user not found"))
    }
  },[])
  
  
  const clickHandler=()=>{
    localStorage.removeItem("user")
    navigate("/")
  }
   
  return (
    <div>
    <div className="position-relative top-0 start-50">
      <div className="d-flex mt-2 " ><span><b>uname:</b></span><span><p>{userData.uname}</p></span></div>
      <div className="d-flex mt-2 "><span><b>jobTitle:</b></span><span><p>{userData.jobTitle}</p></span></div>
      <div className="d-flex mt-2 "><span><b>hiredate:</b></span><span><p>{userData.hireDate}</p></span></div>
      <div className="d-flex mt-2 "><span><b>hiredate:</b></span><span><p>{userData.hireDate}</p></span></div>
      <div className="d-flex mt-2 "><span><b>department:</b></span><span><p>{userData.department}</p></span></div>
      <div className="d-flex mt-2 "><span><b>contact:</b></span><span><p>{userData.contact}</p></span></div>
      

    </div>     
     <div className='"position-relative top-50 start-50 '><button className="btn btn-danger" onClick={clickHandler}> Logout</button></div>
    <div><button className="btn btn-info mt-3"><Link to="/profile/Employee"> EmployeesList</Link></button></div>
    <div> 
      <Outlet></Outlet>
    </div>
    </div>
  )
}

export default Profile
