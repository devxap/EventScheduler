import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
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
            const { username, password, name, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                name,
                email,
                password,
            })
        }
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const handleValidation = () => {
        const { username, password } = values;
        if (password === "") {
            toast.error("Email & Password are required", toastOptions);
            return false;
        }
        else if (username.length === "") {
            toast.error("Email & Password are required", toastOptions);
            return false;
        }
        return true;
    }


    return (
        <Container>
            <form onSubmit={(event) => handleSubmit(event)}>
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

                <button type='submit'>Register</button>
                <span>Have an account already? <Link to='/login'>Login</Link></span>
            </form>
            <ToastContainer />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    
`;

export default Register;