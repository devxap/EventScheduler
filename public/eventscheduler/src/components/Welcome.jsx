import React from 'react';
import Robot from '../assets/robot.gif';
import styled from 'styled-components';

const Welcome = () => {
    return (
        <Container>
            <div className="image">
                <img src={Robot} alt="Robot" />
            </div>
            <div className="content">
                <h2>Select a service from the service panel.</h2>
            </div>
        </Container>
    );
}
 
const Container=styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    gap: 50px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .image{
        display: flex;
        height: 100px;
        width: 100px;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: #828282;
        font-size: 30px;
    }
`;

export default Welcome;