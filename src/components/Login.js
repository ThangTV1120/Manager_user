import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {handleLoginRedux} from "../redux/action/userAction"
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

export default function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setisShowPassword] = useState(false);
    const [loadingAPI,setloadingAPI]=useState(false);
    //useSelector de lay bien trong redux (useReducer)
    const isLoading=useSelector(state=>state.user.isLoading);
    
    const account=useSelector(state=>state.user.account);
  
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email or Password emty")
            return
        }
        else {
            dispatch(handleLoginRedux(email,password));

        }
    }
    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(token){
            navigate("/");
        }
    },[])
    const handlGoBack=()=>{
        navigate("/");
    }
    const handlePressEnter =(envent)=>{
        if(envent&&envent.key==="Enter"){
             handleLogin();
        }
    }
    useEffect(()=>{
        if(account&&account.auth){
            navigate('/')
        }
    },[account])
    return (
        <div className='login-container col-4'>
            <div className='title'>Login</div>
            {/* <input type="text" placeholder='Email or username' value={email} onChange={(event) => setEmail(event.target.value)} /> */}
            <TextField id="outlined-basic" label="Email or username" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
            <div className='input-2'>
                <TextField className='password' type={isShowPassword ? "text" : 'password'} id="outlined-basic" label="Password...." variant="outlined" onChange={(event) => setPassword(event.target.value)} onKeyDown={(envent)=>handlePressEnter(envent)}/>
                  
                <i className={isShowPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'} onClick={() => { setisShowPassword(!isShowPassword) }}></i>
            </div>

            <button className={email && password ? "active" : ""} disabled={email && password ? false : true} onClick={() => handleLogin()}>
              {/* {loadingAPI && <i className='fa-solid fa-sync fa-spin'></i> }   */}
              {isLoading && <i className='fa-solid fa-sync fa-spin'></i> }  
              &nbsp;  Login
            </button>
            <div className='back'>
                <i className='fa-solid fa-angles-left'></i>
                <span onClick={()=>handlGoBack()}>Go back</span></div>
        </div>
    )
}
