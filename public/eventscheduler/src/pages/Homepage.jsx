import React from 'react';
import Header from '../components/Header';
import ServiceContainer from '../components/ServiceContainer';
import styled from 'styled-components';
 
const Homepage = () => {
    return (
        <Container>
            <Header/>
            <ServiceContainer/>
        </Container>
    );
}
 
const Container=styled.div`
    
`;

 
export default Homepage;