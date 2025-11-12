import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()

  const URI= process.env.REACT_APP_API_URL;

  const[values,setValues]=useState({uname:"",password:""})
  const changeHandler=(event)=>{
    const{name,value}=event.target
    setValues({...values,[name]:value})
  }
  const submitHandler=(event)=>{
      event.preventDefault()
      axios.post(URI+"/Login",values)
      .then(res=>{
        console.log("login response",res)
        if(!(localStorage.getItem("user")==="undefined")&&localStorage.getItem("user")===res.data.token){
           
          navigate("/profile")
         }
         else{
          console.log((res.data.token))
          localStorage.setItem("user", res.data.token)
          navigate("/profile")
         }
        // localStorage.setItem("user",res.data.token)
        // navigate("/profile")
      })
      .catch(err=>console.log("error in login",err))
  }
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
      <label >Username :</label>
      <input type="text" id="username" name="uname" onChange={changeHandler} ></input>
      <label >Password :</label>
      <input type="password" id="password" name="password" onChange={changeHandler} />
      <input className='bg-uccess' type="submit"></input>
      </form>
      
    </div>
  )
}

export default Login