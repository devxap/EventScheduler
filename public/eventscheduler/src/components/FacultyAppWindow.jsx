import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import approve from '../approve.png';
import reject from '../reject.png';
import axios from 'axios';
import { host } from '../utils/APIRoutes';

const FacultyAppWindow = () => {
  const [students, setStudents] = useState([]);
  const loggedinuser = JSON.parse(localStorage.getItem('chat-app-user'));
  console.log(loggedinuser.name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host}/api/auth/getAllStudents/${loggedinuser._id}`);
        console.log(response.data.students);
        console.log(response.data.students);
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, [loggedinuser._id]);

  const handleApproval = async (studentId, newStatus) => {
    try {
      await axios.put(`${host}/api/auth/updateApproval/${loggedinuser._id}`, { approvalStatus: newStatus, studentId });
      console.log(`${studentId} status: ${newStatus ? 'approved' : 'rejected'}`);
    } catch (error) {
      console.error('Error updating approval:', error);
    }
  };

  return (
    <Container>
      <div className="data">
        <div className="colnames">
          <div className='col-w'>Roll Number</div>
          <div className='col-w'>Name</div>
          <div className='col-w'>Year</div>
          <div className='col-w'>Section</div>
          <div className='col-w'>Date</div>
          <div className='col-w'>Time</div>
          <div className='col-w'>Description</div>
          <div className="col-w">Approval</div>
        </div>
        <div className="parent">
          <div className="coldata">
          {students.map((student) => (
              <div key={student._id} className="personContainer">
                <div>{student.rollNumber}</div>
                <div>{student.name}</div>
                <div>{student.year}</div>
                <div>{student.section}</div>
                <div className='appointmentsContainer'>
                  {student.appointments.map((appointment, index) => (
                    (appointment.facultyName===loggedinuser.name) && (
                        <div className='appointmentsContainer' key={index}>
                      <div>Date: {appointment.dateOfAppointment}</div>
                      <div>Time: {appointment.timeOfAppointment}</div>
                      <div>Description: {appointment.messageForAppointment}</div>
                    </div>
                    )
                  ))}
                </div>
                <div>
                  {student.approvalStatus ? (
                    <img src={reject} onClick={() => handleApproval(student._id, false)} className='approval-style' alt="icon" />
                  ) : (
                    <img src={approve} onClick={() => handleApproval(student._id, true)} className='approval-style' alt="icon" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    box-shadow: 5px 0px 10px #ededed;
    flex-direction: column;
    overflow: auto;
    .data{
        padding: 50px;
        .colnames{
            display: flex;
            justify-content: left;
            flex-direction: row ;
            width:100%;
            margin-bottom: 25px;
                box-shadow: 0px 10px 20px 0px #eaeaea;
                padding: 10px;
                border-radius: 10px;

            .col-w{
                width: 10%;
                color: #3c3c3c;
                font-weight: 800;
                font-size: 16px;
            }
             .col-w:nth-last-child(2){
                width: 15%;
                margin-right: 50px;
            }
        }

    .parent{
        display: flex;
        justify-content: center;
        width: 100%;
        .coldata{
            display: flex;
            justify-content: center;
            flex-direction: column ;
            width: 100%;
            gap: 10px;
            .personContainer{
                display: flex;
                flex-direction: row;
                justify-content: left;
                width: 100%;
                box-shadow: 0px 10px 20px 0px #eaeaea;
                padding: 10px;
                border-radius: 10px;
                .approval-style{
                    height: 25px;  
                }
                .appointmentsContainer{
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    width: 100%;
                    border: 2px solid red;
                }
                
            }
            /* .personContainer>div>div>img:not(:nth-last-child(2)){
                justify-content: center;
                align-items: center;
                margin-left:10px;
            } */
            .personContainer>div{
                width: 10%;
                height: auto;
            }
            /* .personContainer>div:nth-last-child(2){
                overflow: auto;
                width: 15%;
                margin-right: 50px;
            } */
        }
        
    }
    
    }
`;

export default FacultyAppWindow;
