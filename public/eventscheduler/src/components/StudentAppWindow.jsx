import React from 'react';
import styled from 'styled-components';

const StudentAppWindow = () => {
    const faculty="",available="",roll="",student="",year="",branch="",section="",date="",time="",message="";

    return (
        <Container>
            <div className='parent'>
                <div className="title">
                    Checks
                </div>
                <div className="check-window">
                    <div className="btn-window">
                        <button className='btn-check'>Select Faculty</button>
                        <button className='btn-check'>Personal Details</button>
                        <button className='btn-check'>Date</button>
                        <button className='btn-check'>Time</button>
                        <button className='btn-check'>Message</button>
                    </div>
                </div>
            </div>
            <div className="parent">
                <div className="check-editor">
                    Check Editor
                </div>
            </div>
            <div className="parent">
                <div className="title">
                    Submission
                </div>
                <div className="check-submission">
                    <div className="submission-details">
                        <div className="info">Faculty {faculty}</div>
                        <div className="info">isAvailable {available}</div>
                        <div className="info">Roll Number {roll}</div>
                        <div className="info">Name {student}</div>
                        <div className="info">Year {year}</div>
                        <div className="info">Branch {branch}</div>
                        <div className="info">Section {section}</div>
                        <div className="info">Date {date}</div>
                        <div className="info">Time {time}</div>
                        <div className="info">Message {message}</div>
                    </div>
                    <button className='apply-btn'>Apply</button>
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
        width: 35%;
        height: 100%;
        flex-direction: column;
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
    .check-editor{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        }
    .check-submission{
        display: flex;
        width: 100%;
        height: 100%;
        margin-top: 40px;
        flex-direction: column;
        .submission-details{
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-left: 70px;
            .info{
                font-weight: 600;
                font-style: italic;
                color: #747474;
            }
        }
        .apply-btn{
            border-radius: 13px;
            border:none;
            height: 30px;
            width: 100px;
            background-color: #cdb7f0;
            margin-top: 50px;
            margin-left: auto;
            margin-right: 75px;
            font-weight: 600;
            color: #616161;
        }
        }    
    }
    
    
`;

export default StudentAppWindow;