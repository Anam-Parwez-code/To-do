//import React from "react";
//function Signup(){
  //  return (
    //    <div>Signup</div>
    //);
//}
//export default Signup;
import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../util";

function Login({setAuthenticated}) {
  const [loginInfo,setloginInfo]= useState({
    
    email:"",
    password:""
  })
  const navigate =useNavigate();
  const handleChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copyloginInfo ={...loginInfo};
    copyloginInfo[name]=value;
    setloginInfo(copyloginInfo);
  }
  console.log('loginInfo ->',loginInfo);
  const handlelogin = async (e) =>{
    e.preventDefault();
    const {email,password}=loginInfo;
    if(!email || !password){
     return handleError('email and password are required')
    }
    try{
     const url ="http://localhost:8080/auth/login";
     const response=await fetch(url,{
      method:"POST",
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify(loginInfo)
     });
     const result=await response.json();
     const {success,message,jwtToken,user}=result;

     if(success){
      handleSuccess(message);
    
      localStorage.setItem('token',jwtToken);
      localStorage.setItem('loggedInUser',user.name);
      setAuthenticated(true);
      navigate('/home');
      
     }else if(error){
      const details = error?.details[0].message;
      handleError(details);
     }else{
      handleError(message);
     }
     
    }
    catch(err){
      handleError(err.message);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
          
          type='email'
          name='email'
          placeholder="Enter Your email"
           value={loginInfo.email}
           onChange={handleChange}
        
          />
          <br>
          </br>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
          
          type='password'
          name='password'
          placeholder="Enter Your password"
           value={loginInfo.password}
          onChange={handleChange}
          />
          <br>
          </br>
          <br>
          </br>
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account ?
          <Link to ='/signup'>Signup</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
  //const [formData, setFormData] = useState({
    //name: "",
    //email: "",
    //password: ""
  //});

  //const handleChange = (e) => {
    //setFormData({ ...formData, [e.target.name]: e.target.value });
  //};

  //const handleSubmit = async (e) => {
   // e.preventDefault();

    //try {
      //const res = await fetch("http://localhost:8080/api/signup", {
        //method: "POST",
        //headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(formData)
      //});

      //const data = await res.json();
      //console.log(data);

      //if (res.ok) {
        //alert("Signup successful!");
      //} else {
        //alert(data.message || "Signup failed");
      //}
    //} catch (err) {
      //console.error(err);
      //alert("Server error");
    //}
  //};

  //return (
   // <div>
     // <h2>Signup</h2>
      //<form onSubmit={handleSubmit}>
        //<input
          //type="text"
          //name="name"
          //placeholder="Enter your name"
          //value={formData.name}
          //onChange={handleChange}
          //required
        ///>
        //<br />
        //<input
          //type="email"
          //name="email"
          //placeholder="Enter your email"
          //value={formData.email}
          //onChange={handleChange}
          //required
        //>
        //<br />
        //<input
          //type="password"
          //name="password"
          //placeholder="Enter your password"
          //value={formData.password}
          //onChange={handleChange}
          //required
        //>
        //<br />
        //<button type="submit">Signup</button>
      //</form>
    //</div>
  //);
}

export default Login;
