import React from 'react';
import styled from 'styled-components';
import meetingicon from '../../src/meetings.png';
import groupicon from '../../src/projectgroup.png';
import appointmenticon from '../../src/appointment.png';

const ServicePanel = () => {
    return (
        <Container>
            <div className="services">
                <div className="service-option">
                    <img className="service-icon" src={appointmenticon} alt="appointment icon" />
                    <div className="service-title">Appointments</div>
                </div>
                <div className="service-option">
                    <img className="service-icon" src={groupicon} alt=" group icon" />
                    <div className="service-title">Groups</div>
                </div>
                <div className="service-option">
                    <img className="service-icon" src={meetingicon} alt=" meetings icon" />
                    <div className="service-title">Meetings</div>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    margin-left: 30px;
    width: 15%;
    height: 100%;
    box-shadow: 5px 0px 10px #ededed;
    .services{
        display: flex;
        margin-top: 50px;
        flex-direction: column;
        gap: 20px;
        .service-option{
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            .service-icon{
                height: 25px;
            }
            .service-title{
                font-size: 16px;
                font-weight: 600;
                color: #4e4e4e;
            }
        }
    }
`;

export default ServicePanel;