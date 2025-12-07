const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const UserModel=require("../Models/user");
const signup=async(req,resp)=>{
try{
const {name,email,password} = req.body;
const existingUser =await UserModel.findOne({email});
if(existingUser){
    return resp.status(409)
        .json({message : 'User is already exit,you can login',success:false});
    
}
const hashedPassword=await bcrypt.hash(password,10);
const newUser=new UserModel({name,email,password:hashedPassword});

await newUser.save();

return resp.status(201).json({
    message:"Signup successfully",
    user:newUser,
    success:true
});
}
///console.log("Request Body:",req.body);
catch(err){
    console.error("signup error:",err.message,err.stack);
    return resp.status(500).json({
        message:"internal Server error",
        success:false
      });

}
};
//module.exports ={
  //  signup
//}
const login=async(req,resp)=>{
try{
const {email,password} = req.body;
const user =await UserModel.findOne({email});
const errorMsg = 'Authentication  failed, email or password is wrong';
if(!user){
    return resp.status(403)
        .json({message : errorMsg,success:false});
    
}
const isPassEqual = await bcrypt.compare(password,user.password);
if(!isPassEqual){
    return resp.status(403)
        .json({message : errorMsg,success:false});
    
}
const jwtToken =jwt.sign({email:user.email,_id:user._id},
    process.env.JWT_SECRET,
    {expiresIn :'24h'}
);
resp.status(200)
.json({
    message:"login successfully",
    success:true,
    token:jwtToken,
    user:{
        name:user.name,
        email:user.email,
    }
});
}

catch(err){
    console.error("Login error:",err);
    resp.status(500)
      .json({
        message:"internal Server error",
        success:false,
       
      });

}
};
module.exports ={
    login , signup
};