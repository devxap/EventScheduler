import React, { useState } from 'react';
import StudentAppWindow from './StudentAppWindow.jsx'; 
import FacultyAppWindow from './FacultyAppWindow.jsx';
import GroupServicesWindow from './GroupServicesWindow';
import MeetingServicesWindow from './MeetingServicesWindow';
import Welcome from './Welcome.jsx';
import styled from 'styled-components';
import meetingicon from '../../src/meetings.png';
import groupicon from '../../src/projectgroup.png';
import appointmenticon from '../../src/appointment.png';

const ServiceContainer = () => {

    const [appointmentBtn, setAppointmentBtn] = useState(false);
    const [groupsBtn, setGroupsBtn] = useState(false);
    const [meetingsBtn, setMeetingsBtn] = useState(false);

    if(localStorage.getItem('chat-app-user')){
        const { usertype } = JSON.parse(localStorage.getItem('chat-app-user'));

        let renderedComponent=null;
    
        if(appointmentBtn && !groupsBtn && !meetingsBtn){
            if(usertype==="Student")
                renderedComponent= <StudentAppWindow/>
            else if(usertype==="Faculty")
                renderedComponent= <FacultyAppWindow/>
            else
                alert("Usertype not defined");
        }
        else if(!appointmentBtn && groupsBtn && !meetingsBtn){
            renderedComponent= <GroupServicesWindow/>
        }
        else if(!appointmentBtn && !groupsBtn && meetingsBtn){
            renderedComponent= <MeetingServicesWindow/>
        }
        else{
            renderedComponent= <Welcome/>
        }


        return (
            <Container>
            <PanelContainer>
            <div className="services">
                <div className="service-option" onClick={()=>{
                    setGroupsBtn(false);
                    setMeetingsBtn(false);
                    setAppointmentBtn(true);
                }}>
                    <img className="service-icon" src={appointmenticon} alt="appointment icon" />
                    <div className="service-title">Appointments</div>
                </div>
                <div className="service-option" onClick={()=>{
                    setGroupsBtn(true);
                    setMeetingsBtn(false);
                    setAppointmentBtn(false);
                }}>
                    <img className="service-icon" src={groupicon} alt=" group icon" />
                    <div className="service-title">Groups</div>
                </div>
                <div className="service-option" onClick={()=>{
                    setGroupsBtn(false);
                    setMeetingsBtn(true);
                    setAppointmentBtn(false);
                }}>
                    <img className="service-icon" src={meetingicon} alt=" meetings icon" />
                    <div className="service-title">Meetings</div>
                </div>
                
            </div>
           
            </PanelContainer>
            {renderedComponent}
        </Container>
    );
    
    }
    else{
        let renderedComponent=<GroupServicesWindow />

        return (
            <Container>
            <PanelContainer>
            <div className="services">
                <div className="service-option" onClick={()=>{
                    setGroupsBtn(false);
                    setMeetingsBtn(false);
                    setAppointmentBtn(true);
                }}>
                    <img className="service-icon" src={appointmenticon} alt="appointment icon" />
                    <div className="service-title">Appointments</div>
                </div>
                <div className="service-option" onClick={()=>{
                    setGroupsBtn(true);
                    setMeetingsBtn(false);
                    setAppointmentBtn(false);
                }}>
                    <img className="service-icon" src={groupicon} alt=" group icon" />
                    <div className="service-title">Groups</div>
                </div>
                <div className="service-option" onClick={()=>{
                    setGroupsBtn(false);
                    setMeetingsBtn(true);
                    setAppointmentBtn(false);
                }}>
                    <img className="service-icon" src={meetingicon} alt=" meetings icon" />
                    <div className="service-title">Meetings</div>
                </div>
                
            </div>
           
            </PanelContainer>
            {renderedComponent}
        </Container>
    );
    }

    
}
 
const Container=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 88vh;
    overflow: hidden;
`;
const PanelContainer = styled.div`
    display: flex;
    margin-left: 30px;
    width: 15vw;
    height: 88vh;
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

 
export default ServiceContainer;