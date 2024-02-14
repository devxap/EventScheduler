import React, { useState } from 'react';
import styled from 'styled-components';
import approve from '../approve.png';
import reject from '../reject.png';


const initialPersons=[
    { roll: 21051210, name: "Avinash Pandey", year: 3, section: "CSE13", date: "2/14/2024", time: "03:00", description: "Hi professor, I want to meet you for a project discussion, please approve my appointment, thank you. Hi professor, I want to meet you for a project discussion, please approve my appointment, thank you", approvalStatus: false },
    { roll: 21051211, name: "John Doe", year: 2, section: "ECE12", date: "2/15/2024", time: "04:30", description: "Meeting request for project collaboration.", approvalStatus: true },
    { roll: 21051212, name: "Jane Smith", year: 4, section: "MECH14", date: "2/16/2024", time: "02:00", description: "Discussion on research paper submission.", approvalStatus: false },
    { roll: 21051213, name: "Alice Johnson", year: 1, section: "IT11", date: "2/17/2024", time: "10:00", description: "Query regarding upcoming exam schedule.", approvalStatus: true },
    { roll: 21051214, name: "Bob Anderson", year: 3, section: "CSE13", date: "2/18/2024", time: "01:30", description: "Appointment request for career guidance.", approvalStatus: false },
    { roll: 21051215, name: "Eva Williams", year: 2, section: "ECE12", date: "2/19/2024", time: "11:00", description: "Discussion on internship opportunities.", approvalStatus: true },
    { roll: 21051216, name: "Samuel Taylor", year: 4, section: "MECH14", date: "2/20/2024", time: "03:30", description: "Approval for project extension request.", approvalStatus: false },
    { roll: 21051217, name: "Sophia Brown", year: 1, section: "IT11", date: "2/21/2024", time: "12:00", description: "Meeting to discuss course assignments.", approvalStatus: false },
    { roll: 21051218, name: "Michael White", year: 3, section: "CSE13", date: "2/22/2024", time: "02:30", description: "Seeking feedback on project progress.", approvalStatus: false },
    { roll: 21051219, name: "Olivia Miller", year: 2, section: "ECE12", date: "2/23/2024", time: "09:00", description: "Query about upcoming workshop.", approvalStatus: true },
    { roll: 21051220, name: "Daniel Davis", year: 4, section: "MECH14", date: "2/24/2024", time: "04:00", description: "Discussion on final year project.", approvalStatus: true },
];


const FacultyAppWindow = () => {

    const [persons,setPersons] = useState(initialPersons);

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
                        {persons.map((person, index) => (
                            <div key={index} className="personContainer">
                                <div>{person.roll}</div>
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
                                                    <img src={reject} onClick={()=>{
                                                         console.log("Previously Approved, Now rejected");
                                                         const updatedPersons = [...persons];
                                                         updatedPersons[index].approvalStatus = false;
                                                         setPersons(updatedPersons);
                                                    }} className='approval-style' alt="icon" />
                                                </div>
            
                                            )
                                        :
                                            (
                                                <div>
                                                    <img src={approve} onClick={()=>{
                                                        console.log("Previously rejected, Now approved");
                                                        const updatedPersons = [...persons];
                                                        updatedPersons[index].approvalStatus = true;
                                                        setPersons(updatedPersons);
                                                    }} className='approval-style' alt="icon" />
                                                    
                                                </div>
                                            )
                                     }
                                </div>
                            </div>
                        ))}

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
                flex-direction: row;
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