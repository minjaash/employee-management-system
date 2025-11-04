require('dotenv').config(); 
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Employee = require('./models/employee.model');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')



const port = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
app.use(express.json())
app.use(cors());


// app.post("/register",async(req,res)=>{
//     try{ 
//         console.log(req.body)
//     const employeeDetails=req.body;

//     await mongoose.connect(MONGO_URI);
//     console.log("db connected");
//     const employee= new Employee(employeeDetails);
//     await employee.save();  
    
//    }
// catch(e){
//     console.error("could not connect to db",e.message)
// }
   
        
// })
app.post("/register",(req,res)=>{
    try {
        console.log(req.body)
        const employeeDetails=req.body;
        mongoose.connect(MONGO_URI).
        then(dbres=>{
            
            const employee=new Employee(employeeDetails)
            employee.save().
            then(dbres=>{console.log("emp saved",dbres)
                console.log( "registered user",employee.uname)
               const token=jwt.sign({uname_:dbres.uname},JWT_SECRET_KEY)
               console.log("from register api",token)
               res.json({token})
            }).
            catch(err=>console.log("could not save",err))
        }).
        
        catch(err=>console.log('err from db'))
    } catch (error) {
        console.log('error from try-catch block')
    }
})

//====================================================================================//
app.post("/login",(req,res)=>{
    const employeeDetails=req.body;
    mongoose.connect(MONGO_URI).
    then(dbres=>{
        Employee.findOne({uname:employeeDetails.uname}).
        then(dbres=>{
            console.log(req.body)
            if(bcrypt.compareSync(employeeDetails.password, dbres.password)){
               token= jwt.sign({uname_:dbres.uname},JWT_SECRET_KEY)
               res.json ({token});
            }
            else{
                console.log("err in login")
                res.json({err:"error in login"})
            }
        })
        .catch(err=>console.log("err in login"))
    })
})
// ======================================================================================//

app.post("/userData",(req,res)=>{
   
  const authHeader=req.header('Authorization')
    if (!authHeader||!authHeader.startsWith("Bearer")){
        res.json({message:"unauthorized access"})
    }
    const token=authHeader.replace("Bearer ", "")
    const decoded=jwt.verify(token, JWT_SECRET_KEY)
    console.log("decoded",decoded)
    mongoose.connect(MONGO_URI)
    .then(result=>{
        console.log("from userdata api ",decoded.uname_)
        Employee.findOne({uname:decoded.uname_})
        .then(result=>{
            console.log("employee registered",result)
            res.send(result)
        })
        .catch(res=>{
            console.log("error occured while logging")
        })
    })
    .catch(err=>{
        console.log("error occured while connecting")
    })
  //const decoded= jwt.verify(token,JWT_SECRET_KEY)
    //console.log(decoded)
//   mongoose.connect(MONGO_URI).
//   then(dbres=>{
//     Employee.findOne({uname:decoded}).
//     then(dbres=>console.log(dbres)).
//     catch(err=>console.log("error: could not find user"))
// })
//     .catch(err=>console.log("could connect to db"))
  
})
//======================================================================
 
app.post("/Employee",(req,res)=>{
    console.log(req.body)
    mongoose.connect(MONGO_URI)
    .then(dbres=>{ 
      
        Employee.findOne({_id:req.body.id})
        .then(doc=>{
        res.send(doc)
        })
        .catch(err=>{
        console.log("could not connect")
    })
    })
    .catch(err=>console.log(err))
   
 })

//======================================================================

app.get("/Employees",(req,res)=>{
    mongoose.connect(MONGO_URI)
    .then(dbres=>{ 
       
        Employee.find()
        .then(doc=>{
        res.send(doc)
        })
        .catch(err=>{
        console.log("could not connect")
    })
    })
    .catch(err=>console.log(err))
   
 })

 //=====================================================================
 app.post("/update",(req,res)=>{
    console.log("employee to update",req.body)
    mongoose.connect(MONGO_URI)
    .then(dbres=>{
       Employee.findById({_id:req.body._id})
       .then(updateEmployee=>{
        updateEmployee.uname=req.body.uname ||updateEmployee.uname
        updateEmployee.email = req.body.email || updateEmployee.email;
        updateEmployee.password = req.body.password || updateEmployee.password;
        updateEmployee.jobTitle = req.body.jobTitle || updateEmployee.jobTitle;
        updateEmployee.hireDate = req.body.hireDate || updateEmployee.hireDate;
        updateEmployee.department = req.body.department || updateEmployee.department;
        updateEmployee.contact = req.body.contact || updateEmployee.contact;
        updateEmployee.save()
            .then(doc=>res.send(doc))
            .catch(err=>console.log(err))
       })
       .catch(err=>{
        console.log(err)
       })
           
    })
    .catch(err=>console.log(err))
 })

 
 
app.listen(port ,(req,res)=>{
    console.log ("server is running in port 4000");
})