import React from 'react';
import './Course.css';

import courseImg from "../../../../../../Assests/WhatsApp Image 2020-03-07 at 4.52.43 AM.jpeg";

import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SchoolIcon from '@material-ui/icons/School';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import { useContext } from 'react';
import { EditContext, ModeContext } from '../Courses';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { postEnrollStudent, putEnrollStudent } from '../../../../../../Utils/studentApiRequests';
import { ModalContext, StripContext } from '../../../../../../App';
const goClassImg = "http://localhost:4000/images/goclassimg.png"



function Course(props) {
    const linkStack = useHistory();
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)

    const [showModal, setShowModal] = useContext(ModalContext);

    const [mode, setMode] = useContext(ModeContext);
    const [status, setStatus] = useState();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (localStorage.getItem("loginAs") === "student") {
            if (props.details.studentsEnrolled.find((st) => st.studentId === userId)) setStatus("Enrolled")
            else if (props.details.studentsPassed.find((st) => st.studentId === userId)) setStatus("Completed")
            else setStatus("Enroll Now");
        }
    }, [])

    const courseClicked = () => {
        linkStack.push(`/dashboard/course/${props.details._id}`)
    }

    const editCourseClicked = () => {
        linkStack.push(`/dashboard/course/edit/${props.details._id}`);
        setMode("edit");
    }

    const enrollStudent = async () => {
        setShowModal(true)
        const result = await putEnrollStudent(props.details._id);
        setShowModal(false);

        console.log(result);
        if (result.status === 200) {
            setStatus("Enrolled")
            setOpenStrip(true);
            setStripMessage("Use are successfully enrolled")
        }
    }

    let statusButton;
    if (localStorage.getItem("loginAs") === "student") {
        if (status === "Enrolled") statusButton = (<p className="Course_Status Enrolled">{status}</p>)
        else if (status === "Enroll Now") statusButton = (<p className="Course_Status Enroll_Now" onClick={enrollStudent} >{status}</p>)
        else statusButton = (<p className="Course_Status Completed">{status}</p>)
    }


    return (
        <div className="Course" >
            <img onClick={courseClicked} src={props.details.courseImagePath || goClassImg} alt="" />
            <div className="Course_Mid" onClick={courseClicked} >
                <div style={{position:"relative",top: "1rem", width:"75%"}}>
                    <h3>{props.details.courseTitle}</h3>
                    <p>{props.details.description}</p>
                </div>
            </div>
            <div className="Course_Info_Strip">
                {statusButton}
                <div className="Course_Contributers">
                    <img src={courseImg} alt="" />
                </div>

                <div className="Course_Stats">
                    <div> <SchoolIcon /> {props.details.studentsPassed.length} </div>
                    <div> <EmojiObjectsIcon /> {props.details.studentsEnrolled.length}  </div>
                </div>
                <div style={{ flex: "1" }}></div>
            </div>
            {localStorage.getItem("loginAs") === "tutor" ?
                <div className="Course_Right">
                    <BackupIcon />
                    <EditRoundedIcon onClick={editCourseClicked} />
                    <DeleteIcon />
                </div> : null}
        </div>
    )
}

export default Course
