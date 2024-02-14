import React from 'react';
import userpic from '../../src/userpic.png';
import logoutpic from '../../src/logout.png';

import styled from 'styled-components';

const Account = () => {
    const username="Avinash Pandey";
    return (
        <Container>
            <div className='container'>
            <div className="username">{username}</div>
            <img className="user-pic" src={userpic} alt="icon" />
            <span>|</span>
            <img className="user-pic" src={logoutpic} alt="icon" />
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