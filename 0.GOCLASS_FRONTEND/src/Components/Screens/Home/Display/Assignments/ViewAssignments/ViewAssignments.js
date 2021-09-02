import { React, useContext, useEffect } from 'react';
import './ViewAssignments.css';



import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { ModalContext, StripContext } from '../../../../../../App';
import { getEvaluateCourseAssignments, getTutorCourses } from '../../../../../../Utils/tutorApiRequests';

import { useHistory, useParams } from 'react-router-dom';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import AddIcon from '@material-ui/icons/Add';
import { AssignmentModeContext, AssignmentsContext } from '../Assignments';
import Course from '../../Courses/Course/Course';
import { getAllCourseAssignments, getLiveCourseAssignments } from '../../../../../../Utils/commonApiRequests';
import { useState } from 'react';
import Assignment from '../Assignment/Assignment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import TimelineIcon from '@material-ui/icons/Timeline';
import { getSubmittedCourseAssignments } from '../../../../../../Utils/studentApiRequests';

function ViewAssignments() {
    const [showModal, setShowModal] = useContext(ModalContext);

    const [assignments, setAssignments] = useContext(AssignmentsContext);
    const [assignmentMode, setAssignmentMode] = useContext(AssignmentModeContext);
    const [value, setValue] = useState("live");
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)

    const linkStack = useHistory();
    const { courseId } = useParams();

    const loginAs = localStorage.getItem("loginAs");

    useEffect(() => {
        setAssignmentMode("view");
        call()
    }, [])

    const call = async () => {
        let temp;
        
        setShowModal(true)
        if (courseId) temp = await getLiveCourseAssignments(courseId.toString())
        setShowModal(false)

        if (temp && temp?.status === 200)
            setAssignments([...temp.assignments]);
        else {
            setOpenStrip(true);
            setStripMessage(temp?.message);
        }
    }


    const handleChange = async (event, newValue) => {
        setValue(newValue);

        let temp;
        setShowModal(true);
        if (newValue === "live") temp = await getLiveCourseAssignments(courseId)
        else if (newValue === "all") temp = await getAllCourseAssignments(courseId)
        else if (newValue === "evaluate" && loginAs === "tutor") temp = await getEvaluateCourseAssignments(courseId)
        else if (newValue === "submitted" && loginAs === "student") temp = await getSubmittedCourseAssignments(courseId, localStorage.getItem("userId"));
        setShowModal(false);
      
        console.log(temp);

        if (temp && temp?.status === 200)
            setAssignments([...temp.assignments]);
        else {
            setOpenStrip(true);
            setStripMessage(temp?.message);
        }
    };



    return (
        <div className="View_Assignment">
            <header className="Assignments_Header">
                {localStorage.getItem("loginAs") === "tutor" && assignmentMode === "view" ? (<button onClick={() => linkStack.push(`/assignments/add/course/${courseId}`)} className="NewAssignment_Button" >  <span> <AddIcon style={{ fontSize: "1rem", display: "flex", alignItems: "center" }} /> </span> <span style={{ margin: "0 0.4rem" }}> | </span> New Assignment </button>)
                    : null}

            </header>


            <section className="Assignments_Toolbar">
                <BottomNavigation value={value} onChange={handleChange} >
                    <BottomNavigationAction label="All" value="all" icon={<ViewCarouselIcon />} />
                    <BottomNavigationAction label="Live" value="live" icon={<AccessTimeIcon />} />
                    {loginAs === "student" ? <BottomNavigationAction label="Submitted" value="submitted" icon={<CloudDoneIcon />} /> : <BottomNavigationAction label="Evaluate" value="evaluate" icon={<TimelineIcon />} />}
                </BottomNavigation>
            </section>

            <section className='Assignment_Grid'>
                {assignments && assignments?.length > 0 ? assignments.map(element => {
                    return (<Assignment details={element} key={element?._id} />)
                }) : <div className="Course" ><p >No {value !== "all" ? value : null} assignments!</p> </div>}

            </section>
        </div>
    )
}

export default ViewAssignments
