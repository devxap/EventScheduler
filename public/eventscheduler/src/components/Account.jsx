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

    const handleSubmit= ()=>{  
                try {
                    localStorage.removeItem('chat-app-user');
                navigate("/loginStudent");
                } catch (error) {
                   console.log(`logout/handleSubmit-->${error}`); 
                }
        }
    
        const user = JSON.parse(localStorage.getItem('chat-app-user')) || {};

    return (
        <Container>
            <div className='container'>
            <div className="username">Welcome {user.username}</div>
            <span>|</span>
            <img className="user-pic" src={logoutpic} alt="icon" onClick={handleSubmit} />
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