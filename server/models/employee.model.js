const mongoose=require('mongoose')
const bcrypt=require("bcrypt")

const schema=new mongoose.Schema({
    uname:{
        type: String,
        required : true,
        unique:true
    },
    email:{
        type:String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required : true
        
    },
    jobTitle:{
        type:String,
        required : true
        
    },
    hireDate:{
        type:Date,
        required : true
        
    },
    department:{
        type:String,
        required : true,
        
    },
    contact:{
        type:String,
        required : true,
        
    }

    
})
  schema.pre("save",async function (next){
    
    if(this.isModified('password'))
    {
       this.password=await bcrypt.hash(this.password,8)
       
    }
    next()
})

const Employee=mongoose.model("Employee",schema);
module.exports=Employee
