import userpic from '../../src/userpic.png';
import logoutpic from '../../src/logout.png';
import React, { useState } from 'react';
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { studentLoginRoute } from '../utils/APIRoutes';

const Account = () => {

    const navigate=useNavigate();
    const [values, setValues]= useState({
        username:"",
        password:"",
    })
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        draggable: true,
        pauseOnHover:true,
        theme:"dark",
    }

    let pic = {};
    let text="";
    if(localStorage.getItem('chat-app-user')){
        pic=logoutpic;
        text="Logout"
    }
    else{
        text="Login"
        pic=userpic;
    }
    const handleSubmit= ()=>{  
                if(localStorage.getItem('chat-app-user')){
                    try {
                        localStorage.removeItem('chat-app-user');
                    navigate("/loginStudent");
                    } catch (error) {
                       console.log(`logout/handleSubmit-->${error}`); 
                    }
                }
                else{
                    navigate("/loginStudent");
                }
        }
    
        const user = JSON.parse(localStorage.getItem('chat-app-user')) || {};

    return (
        <Container>
            <div className='container'>
            <div className="username">{text} {user.username}</div>
            <span>|</span>
            <img className="user-pic" src={pic} alt="icon" onClick={handleSubmit} />
            </div>
        </Container>
    );
}
    

const Container= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap : 10px;        
    }
    .username{
        font-size: 18px;
    }
    img{
        height: 30px;
        cursor: pointer;
    }
`;
 
export default Account;