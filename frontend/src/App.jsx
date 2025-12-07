import {Routes,Route, Navigate} from "react-router-dom";
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
//import RefreshHandler from "./components/RefreshHandler.jsx";

import Login from './pages/login.jsx';
import Signup from "./pages/signup.jsx";
import Home from "./pages/Home.jsx";
import { useState } from "react";

function App() {
  const[isAuthenticated,setAuthenticated]=useState(!!localStorage.getItem('token'));
  const PrivateRoute = ({element})=>{
    return isAuthenticated? element:<Navigate to='/login'/>;
  };
  //const [count, setCount] = useState(0)

  return (
    <div className="App">
      
      
   <Routes>
    <Route path="/" element = {<Navigate to='/login' />}/>
    <Route path="/home" element = {<PrivateRoute element={<Home/>}/>}/>
    <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>}/>
    <Route path ="/signup" element={<Signup setAuthenticated={setAuthenticated}/>} />
   </Routes>
   </div>
  );
}

export default App;
