import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import approve from '../approve.png';
import reject from '../reject.png';
import axios from 'axios';
import { host, getAllStudentsRoute } from '../utils/APIRoutes';


const FacultyAppWindow = () => {


    const [initialPersons, setInitialPersons] = useState([]);
    const loggedinuser = JSON.parse(localStorage.getItem('chat-app-user'));
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(getAllStudentsRoute);
                setInitialPersons(response.data.students);
                console.log(initialPersons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

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
                    {/* {Object.keys(initialPersons).map((person, i) => (
                        // Move the condition inside the mapping function
                        person.facultyName === loggedinuser.name && (
                            <div key={i} className="personContainer">
                                <div>{person.rollNumber}</div>
                                <div>{person.name}</div>
                                <div>{person.year}</div>
                                <div>{person.section}</div>
                                <div>{person.date}</div>
                                <div>{person.time}</div>
                                <div>{person.description}</div>
                                <div>{
                                    person.approvalStatus
                                        ?
                                            (
                                                <div>
                                                    <img src={reject} onClick={async ()=>{
                                                         person.approvalStatus = false;
                                                         await axios.put(`${host}/api/auth/updateApproval/${person._id}`, { approvalStatus: person.approvalStatus });
                                                         console.log("Previously Approved, Now rejected");
                                                    }} className='approval-style' alt="icon" />
                                                </div>
            
                                            )
                                        :
                                            (
                                                <div>
                                                    <img src={approve} onClick={async ()=>{
                                                        person.approvalStatus = true;
                                                        await axios.put(`${host}/api/auth/updateApproval/${person._id}`, { approvalStatus: person.approvalStatus });
                                                        console.log("Previously rejected, Now approved");
                                                    }} className='approval-style' alt="icon" />
                                                    
                                                </div>
                                            )
                                     }
                                </div>
                            </div>
                        )
                        ))} */}

                    </div>

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
        .coldata{
            display: flex;
            justify-content: center;
            flex-direction: column ;
            gap: 10px;
            .personContainer{
                display: flex;
                flex-direction: column;
                justify-content: left;
                width: 100%;
                box-shadow: 0px 10px 20px 0px #eaeaea;
                padding: 10px;
                border-radius: 10px;
                .approval-style{
                    height: 25px;  
                }
            }
            .personContainer>div>div>img:not(:nth-last-child(2)){
                justify-content: center;
                align-items: center;
                margin-left:10px;
            }
            .personContainer>div{
                width: 10%;
                height: auto;
            }
            .personContainer>div:nth-last-child(2){
                overflow: auto;
                width: 15%;
                margin-right: 50px;
            }
        }
        
    }
    
    }
`;

export default FacultyAppWindow;