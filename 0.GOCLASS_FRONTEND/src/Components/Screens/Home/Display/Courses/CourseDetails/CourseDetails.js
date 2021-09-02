import React, { useState } from 'react';
import "./CourseDetails.css";
import imG from "../../../../../../Assests/WhatsApp Image 2020-03-07 at 4.52.43 AM.jpeg"

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { Switch, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCourse } from '../../../../../../Utils/commonApiRequests';
import { useContext } from 'react';
import { ModalContext, StripContext } from '../../../../../../App';
import PersonIcon from '@material-ui/icons/Person';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import BackupIcon from '@material-ui/icons/Backup';
import DeleteIcon from '@material-ui/icons/Delete';
import { ModeContext } from '../Courses';
import Assignments from '../../Assignments/Assignments';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { putEnrollStudent } from '../../../../../../Utils/studentApiRequests';

function CourseDetails() {
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)

    const [showModal, setShowModal] = useContext(ModalContext);

    const [details, setdetails] = useState()
    const [value, setValue] = useState(0);
    const { courseId } = useParams();

    const linkStack = useHistory();
    const [mode, setMode] = useContext(ModeContext);
    const [status, setStatus] = useState();


    const loginAs = localStorage.getItem("loginAs")
    const userId = localStorage.getItem("userId")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        set()
    }, [])

    const set = async () => {
        setShowModal(true)
        const response = await getCourse(courseId);
        setShowModal(false)

        if (response) {
            if (response.status === 200) {
                setdetails(response.course);

            }
            else {
                setOpenStrip(true);
                setStripMessage(response.message);
            }
        }
    }

    useEffect(() => {
        if (loginAs === "student" && details) {
            if (details?.studentsEnrolled.find((st) => st.studentId === userId)) setStatus("Enrolled")
            else if (details?.studentsPassed.find((st) => st.studentId === userId)) setStatus("Completed")
            else setStatus("Enroll Now");
        }
    }, [details])



    const editCourseClicked = () => {
        linkStack.push(`/dashboard/course/edit/${details._id}`);
        setMode("edit");
    }


    const enrollStudent = async () => {
        const result = await putEnrollStudent(details._id);

        console.log(result);
        if (result.status === 200) {
            setStatus("Enrolled")
            setOpenStrip(true);
            setStripMessage("Use are successfully enrolled")
        }
    }

    let statusButton;
    if (localStorage.getItem("loginAs") === "student") {
        if (status === "Enrolled") statusButton = (<button className="Course_Status CourseDetails_Button Enrolled">{status}</button>)
        else if (status === "Enroll Now") statusButton = (<button className="Course_Status CourseDetails_Button Enroll_Now" onClick={enrollStudent} >{status}</button>)
        else statusButton = (<button className="Course_Status CourseDetails_Button Completed">{status}</button>)
    }



    return (
        <div className="CourseDetails">

            <div className="CourseDetails_Container">
                <img className="CourseDetails_img" src={details?.courseImagePath} alt="" />
                <div className="CourseDetails_mid">
                    <h2>{details?.courseTitle}</h2>
                    <p>{details?.description}</p>
                </div>

                {loginAs === "tutor" ?
                    <div className="Course_Right">
                        <BackupIcon />
                        <EditRoundedIcon onClick={editCourseClicked} />
                        <DeleteIcon />
                    </div> : null}

            </div>
            <div className="CourseDetails_Tutor">
                <div >
                    <p style={{ color: "tomato", fontSize: "0.8rem" }}>Instructor: </p>
                    <p>{details?.tutorId.tutorName}</p>
                </div>
                {details?.tutorId.profileImagePath ? <img src={details?.tutorId.profileImagePath} alt="" /> : <PersonIcon />}

            </div>

            <div className="CourseDetails_Poster">
                <div className="CourseDetails_Poster_Text">
                    <h6 >Offered by</h6>
                    <h1 >Go-CLASS</h1>
                </div>

            </div>
            <div className="CourseDetails_Action">
                <div>
                    {statusButton}
                    <p>{details?.studentsEnrolled.length} students enrolled!</p>
                </div>
            </div>
            {status !== "Enroll Now" || (loginAs === "tutor") ?

                (<div>
                    <Paper square className="CourseDetails_Tabs" >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="icon label tabs example"
                        >
                            <Tab icon={<AssignmentIcon />} label="ASSIGNMENTS" />
                            <Tab icon={<FavoriteIcon />} label="TEST" />
                            <Tab icon={<PersonPinIcon />} label="ANNOUNCEMENTS" />
                        </Tabs>
                    </Paper>

                    {value === 0 ? <Assignments /> : null}
                    {/* {value === 1 ? <Assignments /> : null}
        {value === 2 ? <Assignments /> : null} */}
                </div>
                )
                : null}

        </div>
    )
}

export default CourseDetails
