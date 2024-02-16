import React, { useState } from 'react';
import styled from 'styled-components';
import Welcome from '../components/Welcome';
import { useNavigate } from 'react-router-dom';
import { saveStudentDataRoute, studentLoginRoute } from '../utils/APIRoutes';
import axios from 'axios';

const StudentAppWindow = () => {
    const navigate = useNavigate();
    const [isFnameVisible, setFnameVisibility] = useState(false);
    const [isDateVisible, setDateVisibility] = useState(false);
    const [isTimeVisible, setTimeVisibility] = useState(false);
    const [isMessageVisible, setMessageVisibility] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState("Select from the list");
    const faculty = ["Avinash Pandey", "Samresh Mishra", "Sricheta Parui", "Anjan Bandhopadhyay", "Avinash Pandey", "Samresh Mishra", "Sricheta Parui", "Anjan Bandhopadhyay", "Avinash Pandey", "Samresh Mishra", "Sricheta Parui", "Anjan Bandhopadhyay"];
    const [submission, setSubmission] = useState({
        dateOfAppointment: "",
        timeOfAppointment: "",
        messageForAppointment: "",
    });
    const user = JSON.parse(localStorage.getItem('chat-app-user')) || {};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { dateOfAppointment, timeOfAppointment, messageForAppointment } = submission;


        // Make sure the user has an 'appointments' array
        if (dateOfAppointment && timeOfAppointment && messageForAppointment && selectedFaculty) {
            if (!user.appointments) {
                user.appointments = [];
            }

            // Push the data into the 'appointments' array
            user.appointments.push({
                facultyName: selectedFaculty,
                dateOfAppointment,
                timeOfAppointment,
                messageForAppointment,
            });
            // Update the user data on the server
            await axios.post(`${saveStudentDataRoute}/${user._id}`, {
                facultyName: selectedFaculty,
                dateOfAppointment,
                timeOfAppointment,
                messageForAppointment,
            });

            setSelectedFaculty(undefined);

            console.log("Updated User Data:", user);
            alert("Data Saved");
        }
        else {
            console.log("Sorry, not all data present");
        }
    };


    const handleChange = (e) => {

        setSubmission((prevSubmission) => ({
            ...prevSubmission,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Container>

            <div className="parent">
                <div className="title">
                    Submission
                </div>
                <div className="check-submission">
                    <form className='submission-details' action="/" onSubmit={handleSubmit}>
                        <label><span>Username</span><span>{user.username}</span></label>
                        <label><span>Name</span><span>{user.name}</span></label>
                        <label><span>Roll Number</span><span>{user.rollNumber}</span></label>
                        <label><span>Section</span><span>{user.section}</span></label>
                        <label><span>Year</span><span>{user.year}</span></label>
                        <label for='facultyName'><span>Faculty Name</span><span>{selectedFaculty}</span>
                            <input className="info display" type="text" name='facultyName' onChange={handleChange} value={submission['facultyName']} placeholder='facultyName' />
                        </label>
                        <label for='dateOfAppointment' className={(!isFnameVisible && isDateVisible && !isTimeVisible && !isMessageVisible) ? 'visible' : 'hidden'}><span>Date</span>
                            <input className="info" type="date" name='dateOfAppointment' onChange={handleChange} value={submission['dateOfAppointment']} placeholder='dateOfAppointment' />
                        </label>
                        <label for='timeOfAppointment' className={(!isFnameVisible && !isDateVisible && isTimeVisible && !isMessageVisible) ? 'visible' : 'hidden'}><span>Time</span>
                            <input className="info" type="time" name='timeOfAppointment' onChange={handleChange} value={submission['timeOfAppointment']} placeholder='timeOfAppointment' />
                        </label>
                        <label for='messageForAppoitment' className={(!isFnameVisible && !isDateVisible && !isTimeVisible && isMessageVisible) ? 'visible' : 'hidden'}><span>Message</span>
                            <input className="info" name='messageForAppointment' onChange={handleChange} value={submission['messageForAppointment']} placeholder='type...' />
                        </label>
                        <button className='apply-btn' type='submit'>submit</button>
                    </form>
                </div>
            </div>

            <div className="parent">
                <div className="title">
                    Faculty Display
                </div>
                <div className="faculty-display">
                    <Fname>
                        {faculty.map((item, index) => {
                            return (
                                <>
                                    <div key={index} onClick={(e) => {
                                        setSelectedFaculty(item);
                                    }}>
                                        <h3>{item}</h3>
                                    </div>
                                </>
                            )
                        })}
                    </Fname>

                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    box-shadow: 5px 0px 10px #ededed;
    flex-direction: row;
    .parent{
        display: flex;
        width: 80%;
        height: 100%;
        flex-direction: column;
        box-shadow: 10px 0px 10px -2px #ececec;
        .title{
            display: flex;
            justify-content: left;
            align-items: center;
            font-size: 26px;
            font-weight: 600;
            margin-top: 30px;
            margin-left: 50px;
            color: #cfcfcf;
        }
        .check-window{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        margin-top: 70px;
       
        .btn-window{
            display: flex;
            gap: 40px;
            flex-direction: column;
            .btn-check{
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 5px;
                border-radius: 12px;
                background-color: #ededed;
                border: none;
                height: 35px;
                width: auto;
                cursor: pointer;
                color: #747474;
                font-weight: 600;
            }
        }

    }
    .faculty-display{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        overflow: scroll;
        padding: 30px;
        box-shadow: -10px -5px 10px -2px #ececec;
        color: #616161;
        }
        .faculty-display>div>div{
            :hover{
                box-shadow: 0px 0px 10px 2px #ececec;
                transition: 0.3s ease-in-out;
                padding: 5px;
                border-radius:5px ;
                cursor: pointer;
                color: #30de19;
            }
        }
    .check-submission{
        display: flex;
        width: 100%;
        height: 100%;
        margin-top: 40px;
        flex-direction: column;
        align-items: center;
        .submission-details{
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;
            width: 75%;
            label{
                display: flex;
                flex-direction: row;
                gap: 10px;
                span{
                    display: flex;
                    padding: 5px;
                    width: 30%;
                    align-items: center;
                    justify-content: center;
                    flex-direction: row;
                    box-shadow: 2px 2px 5px 2px #e5e5e5;
                    border-radius: 5px;
                    font-weight: 600;
                }
                span:nth-child(2){
                    color: #30de19;
                }
            }
            .info{
                    display: flex;
                    padding: 5px;
                    width: 20%;
                    align-items: center;
                    justify-content: center;
                    flex-direction: row;
                    box-shadow: 2px 2px 5px 2px #e5e5e5;
                    border-radius: 5px;
                    border: none;
                    font-weight: 600;
                    color: #30de19;

                &.display{
                display: none;
                }
            }
        }
        .apply-btn{
            border-radius: 13px;
            border:none;
            height: 30px;
            width: 100px;
            background-color: #cdb7f0;
            margin-left: auto;
            font-weight: 600;
            color: #616161;
        }
        }    
    }
    .parent:nth-child(2){
        width: 20%;
    }
`;

const Fname = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
`;

const DateForm = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    visibility: hidden;

    &.visible {
        visibility: visible;
    }

    &.hidden {
        visibility: hidden;
    }
`;

const TimeForm = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
    visibility: hidden;

    &.visible {
        visibility: visible;
    }

    &.hidden {
        visibility: hidden;
    }

    
`;



export default StudentAppWindow;