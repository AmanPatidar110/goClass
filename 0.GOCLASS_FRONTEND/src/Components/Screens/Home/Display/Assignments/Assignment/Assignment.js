import React from 'react';
import './Assignment.css';


import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SchoolIcon from '@material-ui/icons/School';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { StripContext } from '../../../../../../App';
import { AssignmentModeContext } from '../Assignments';
const goClassImg = "http://localhost:4000/images/goclassimg.png"



function Assignment(props) {


    const linkStack = useHistory();
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)
    
    const [mode, setMode] = useContext(AssignmentModeContext);
    const [status, setStatus] = useState();
    const [evaluation, setEvaluation] = useState();
    
    const userId = localStorage.getItem("userId");
    const loginAs = localStorage.getItem("loginAs");
    
    let dateString = new Date(props.details?.dueDate);

    useEffect(() => {
        if (loginAs === "tutor") {
            if (new Date(props.details?.dueDate) > Date.now()) setStatus("Live")
            else setStatus("Evaluate");
        }
        else {
            const ev = props.details?.studentSubmissions.find((s) => ( s.studentId === userId && s.marksAlloted));

            if(ev){ setStatus("Evaluated");  setEvaluation(ev.marksAlloted); }
            else if (props.details?.studentSubmissions.find((s) =>  s.studentId === userId)) setStatus("Submitted");
            else setStatus("Submit");
        }

    }, []);

    const assignmentClicked = () => {
        if(loginAs=== "tutor") {
            if(status === "Live") {
                setOpenStrip(true);
                setStripMessage("Submission data can only be seen in Evaluate Section after the deadline!")
            }
            else linkStack.push(`/assignments/evaluate/${props.details?._id}`)
        }
        else
            linkStack.push(`/assignments/submit/${props.details?._id}`)
    }

    const editAssignmentClicked = () => {
        linkStack.push(`/assignments/edit/${props.details?._id}/course/${props.details?.courseId._id}`);
        setMode("edit");
    }

  
    let statusButton;

    if (loginAs === "tutor") {
        if (status === "Live") statusButton = (<p className="Assignment_Status  Enrolled">{status}</p>)
        else if (status === "Evaluate") statusButton = (<p className="Assignment_Status Enroll_Now" onClick={() => linkStack.push(`/assignments/evaluate/${props.details?._id}`)}>{status}</p>)
    }
    else {
        if (status === "Evaluated") statusButton = (<button className="Assignment_Status  Enrolled">{`${status}: ${evaluation}`}</button>)
        else if (status === "Submitted") statusButton = (<p className="Assignment_Status  Completed">{status}</p>)
        else if (status === "Submit") statusButton = (<button className="Assignment_Status Enroll_Now" onClick={() => linkStack.push(`/assignments/submit/${props.details?._id}`)} >{status}</button>)
    }


    return (
        <div className="Course" >
            <div className="separator"></div>
            <p className="Assignment_Course"  onClick={assignmentClicked} >Course: {props.details?.courseId.courseTitle}</p>
            <div className="Assignment_Mid" onClick={assignmentClicked} >

                <div style={{ position: "relative", top: "1rem", width: "75%" }}>
                    <h3>{props.details?.assignmentTitle}</h3>
                    <p>{props.details?.description}</p>
                </div>
            </div>

            <div className="Assignment_Info_Strip">
                {statusButton}
                <div className="Assignment_Contributers">
                    <p>Instructor : </p>
                    <img src={goClassImg} alt="" />
                </div>

                <div className="Assignment_Stats">
                    <div> <CloudDoneIcon /> <p>  Submissions: </p> {props.details?.studentsSubmission?.length} |</div>
                    <div> <FitnessCenterIcon /> <p> Weightage: </p> {props.details?.fullMarks} |</div>
                    <div> <AccessAlarmsIcon /> <p> Due Date: </p> {` ${dateString.getHours()}:${dateString.getMinutes()}  |  ${dateString.getDate()}/${dateString.getMonth() + 1}/${dateString.getFullYear()}`} </div>

                </div>
                <div style={{ flex: "1" }}></div>
            </div>
            {localStorage.getItem("loginAs") === "tutor" ?
                <div className="Course_Right">
                    <BackupIcon />
                    <EditRoundedIcon onClick={editAssignmentClicked} />
                    <DeleteIcon />
                </div> : null}
        </div>
    )
}

export default Assignment
