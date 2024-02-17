import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { studentRegisterRoute } from '../utils/APIRoutes';

const StudentRegister = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        rollNumber: "",
        year: "",
        section: "",
        usertype:"",
    })
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, password, name, email, section, year, rollNumber, usertype } = values;
            const { data } = await axios.post(studentRegisterRoute, {
                username,
                name,
                email,
                password,
                section,
                year,
                rollNumber,
                usertype,
            })

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/homepage");
            }
        }
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleValidation = () => {
        const { username, password, usertype } = values;
        if (password === "") {
            alert("Username & Password are required");
            return false;
        }
        else if (username.length === "") {
            alert("Username & Password are required");
            return false;
        }
        else if (usertype !== "Student") {
            alert("Wrong Usertype");
            return false;
        }
        return true;
    }


    return (
        <>
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="forminputs">
                <input
                    type="text"
                    placeholder='Username'
                    name='username'
                    onChange={(e) => handleChange(e)}
                    min="3"
                />

                <input
                    type="text"
                    placeholder='Name'
                    name='name'
                    onChange={(e) => handleChange(e)}
                    min="3"
                />

                <input
                    type="text"
                    placeholder='User Type'
                    name='usertype'
                    onChange={(e) => handleChange(e)}
                    min="3"
                />

                <input
                    type="text"
                    placeholder='Roll Number'
                    name='rollNumber'
                    onChange={(e) => handleChange(e)}
                />

                <input
                    type="text"
                    placeholder='Section'
                    name='section'
                    onChange={(e) => handleChange(e)}
                />

                <input
                    type="text"
                    placeholder='Year'
                    name='year'
                    onChange={(e) => handleChange(e)}
                />

                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    onChange={(e) => handleChange(e)}
                    min="3"
                />

                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    onChange={(e) => handleChange(e)}
                />
                </div>

                <button type='submit'>Register</button>
                <span>Have an account already? <Link to='/loginStudent'>Login</Link></span>
            </form>
        </FormContainer>
        <ToastContainer />
        </>
    );
}


const FormContainer=styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #f3f3f3;

form{
    display: flex;
    width: 25%;
    height: 60%;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff76;
    border-radius: 2rem;
    padding: 3rem 5rem;
    box-shadow: 3px 1px 10px -1px #dfdfdf;
    .forminputs{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        overflow: auto;
        gap: 5px;
        input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color:#2a2a2a;
        width: 75%;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color: #2a2a2a;
        font-weight: 600;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
    
}
`; 

export default StudentRegister;