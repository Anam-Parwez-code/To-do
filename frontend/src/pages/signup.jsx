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

function Signup() {
  const [signupInfo,setSignupInfo]= useState({
    name:'',
    email:"",
    password:""
  })
  const navigate =useNavigate();
  const handleChange = (e)=>{
    const {name,value} = e.target;
    console.log(name,value);
    const copySignupInfo ={...signupInfo};
    copySignupInfo[name]=value;
    setSignupInfo(copySignupInfo);
  }
  console.log('signupInfo ->',signupInfo);
  const handleSingup = async (e) =>{
    e.preventDefault();
    const {name,email,password}=signupInfo;
    if(!name || !email || !password){
     return handleError('name,email and password are required')
    }
    try{
     const url ="https://mern-authentication-ivory-eta.vercel.app/auth/signup";
     //app.post("/api/auth/signup", signup);

     const response=await fetch(url,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(signupInfo)
     });
     const result=await response.json();
     const {success,message,error}=result;

     if(success){
      handleSuccess(message);
      setTimeout(()=>{
          navigate('/login')
      },1000)
     }else if(error){
      const details = error?.details?.[0]?.message || message;
      handleError(details);
     }else {
      handleError(message);
     }
     console.log(result);
    }
    catch(err){
      handleError(err.message);
    }
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSingup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
          type='text'
          name='name'
          autoFocus
          placeholder="Enter Your Name"
          value={signupInfo.name}
          onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
          
          type='email'
          name='email'
          placeholder="Enter Your email"
           value={signupInfo.email}
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
           value={signupInfo.password}
          onChange={handleChange}
          />
          <br>
          </br>
          <br>
          </br>
        </div>
        <button type="submit">SignUp</button>
        <span>
          Already have an account ?
          <Link to ='/login'>Login</Link>
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

export default Signup;
