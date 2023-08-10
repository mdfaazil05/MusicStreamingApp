import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../HomePage/Home";
import "./Login.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Loginimg from "./Login.jpg";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from "@mui/material";
import img1 from "./2.png";
import l1 from "./l1.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const[login,setLogin]=useState(true);
  const [alertView,setAlertView]=useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[regUName,setRegUName]=useState('');
  const[regPassword,setRegPassword]=useState('');
  const[regEmail,setRegEmail]=useState('');
  const[regDOB,setRegDOB]=useState('');

  const SubmitF = () => {
    const udata = {
      'userName': username,
      'Password': password
    };
    axios.post("https://localhost:7049/api/Login", udata)
      .then((resp) => {
        // alert("correct u and p");
        toast.success('Login Success!', {
          position: toast.POSITION.BOTTOM_LEFT
      });
        window.location.href=`/Home?ID=${encodeURIComponent(resp.data.userId)}`;// Navigate to "Home" page
        return <Home value={udata.userName}/>;
      })
      .catch((error) => {
        toast.error('Incorrect password or username!!', {
          position: toast.POSITION.BOTTOM_LEFT
      });
        console.error(error);
      });
  };
  const SubmitregF=()=>{
    const registerData={
      "name":regUName,
      "password":regPassword,
      "email":regEmail,
      "dob":regDOB
    };
    axios.post("https://localhost:7049/api/Users",registerData)
    .then((resp) => {
      // alert("correct u and p");
      toast.success('Registered Successfully!', {
        position: toast.POSITION.BOTTOM_LEFT
    });
      window.location.href=`/Home?ID=${encodeURIComponent(resp.data.userId)}`;// Navigate to "Home" page
      // return <Home value={.userName}/>;
    })
    .catch((error) => {
      console.error(error);
    });

  }
  const Login1=()=>{
    setLogin(!login);
  }

  return (
    <div className="bg">
      <ToastContainer/>
     <div className="textcontain">
      <h1>RYTHMIXPLORER</h1>
      <h2>-"YOUR MIX, YOUR WAY"</h2>
      <p>"Embark on a musical adventure like never before! Explore new beats, traverse diverse genres, and voyage through the symphonic universe with our immersive and intuitive music experience."</p>
      </div> 

    {login&&<div style={{marginLeft:650,marginRight:-70}} >
      <h2 >LOGIN</h2>
      <TextField type="text" required value={username} variant="filled" sx={{width:'70%'}} onChange={(e) => setUsername(e.target.value)} placeholder="Enter User Name "/>
      <br></br>
      <TextField type="password" required value={password} variant="filled" sx={{marginTop:1,width:'70%'}} onChange={(e) => setPassword(e.target.value)}  placeholder="Enter Password"/>
      <br></br>
      <Button type="submit" variant="contained" sx={{marginTop:2,marginLeft:5}} onClick={SubmitF}>Submit</Button>
      <p>Don't have an account?.<a onClick={Login1} className="clickhere">click here</a> to create an account for free</p>
    </div>}
    
    {!login&&<div className="login">
      <h2>REGISTER</h2>
      <TextField type="text" required value={regUName} variant="filled" sx={{width:'90%'}} onChange={(e) => setRegUName(e.target.value)} placeholder="Enter User Name "/>
      <br></br>
      <TextField type="password" required value={regPassword} variant="filled" sx={{marginTop:1,width:'90%'}} onChange={(e) => setRegPassword(e.target.value)}  placeholder="Enter Password"/>
      <br></br>
      <TextField type="email" required value={regEmail} variant="filled" sx={{marginTop:1,width:'90%'}} onChange={(e) => setRegEmail(e.target.value)} placeholder="Enter EmailID "/>
      <br></br>
      <TextField type="date" required value={regDOB} variant="filled" sx={{marginTop:1,width:'90%'}} onChange={(e) => setRegDOB(e.target.value)}  placeholder="Enter DOB"/>
      <br></br>
      <Button type="submit" variant="contained" sx={{marginTop:2,marginLeft:5}} onClick={SubmitregF}>Submit</Button>
      <p>Do you have an account?. <a onClick={Login1} className="clickhere">click here</a> to Login</p>
    </div>

    }
    
    </div>
    
  );
};

export default Login;
