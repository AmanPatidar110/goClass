
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ModalContext, StripContext } from '../../../../../../App';
import { getAssignment } from '../../../../../../Utils/commonApiRequests';
import Assignment from '../Assignment/Assignment';
import './EvaluateAssignment.css'
import SubmissionList from './SubmissionList/SubmissionList';



function EvaluateAssignment() {
    const [showModal, setShowModal] = useContext(ModalContext);
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)

    const { assignmentId } = useParams();
    const [assignment, setassignment] = useState();
    const [submissionData, setsubmissionData] = useState()

    let response;

    useEffect(() => {
        if (assignmentId) {
            set()
        }
    }, [assignmentId])
    
    
    const set = async () => {
        setShowModal(true)
        response = await getAssignment(assignmentId);
        setShowModal(false)
        
        if (response.status === 200) {
            setassignment({...response.assignment});
            setsubmissionData([...response.assignment.studentSubmissions])
            
        } else {
            setOpenStrip(true);
            setStripMessage(response.message);
        }
        
    }


    return (
        <div className="EvaluateAssignment">
            <header className="Courses_Header">
                <div className="Courses_Heading"> <h1>Submissions </h1> </div>
            </header>

            <Assignment details={assignment} />

            <h3 style={{marginTop:"4rem"}}>Data List:</h3>

            {submissionData ? submissionData.map(e => {
                console.log(e);
                if(!e.marksAlloted) return (<SubmissionList submissionData={e} />)
                else return false;
            }): 
            <div className="Course"> No data for evaluation! </div>
            }
            
        </div>
    )
}

export default EvaluateAssignment
