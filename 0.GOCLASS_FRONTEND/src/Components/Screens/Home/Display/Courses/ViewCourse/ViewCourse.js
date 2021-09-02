import { useEffect } from 'react';
import React, { useContext } from 'react';
import './ViewCourse.css';

import Course from '../Course/Course'
import { CourseContext, ModeContext } from '../Courses';
import { getAllCourses, getEnrolledCourses } from '../../../../../../Utils/studentApiRequests';


import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { ModalContext, StripContext } from '../../../../../../App';
import { getTutorCourses } from '../../../../../../Utils/tutorApiRequests';

import {  useHistory } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';


function ViewCourse(props) {
    const [showModal, setShowModal] = useContext(ModalContext);

    const [courses, setCourses] = useContext(CourseContext);
    const [mode, setMode] = useContext(ModeContext);
    const [value, setValue] = React.useState(localStorage.getItem("loginAs") === "student" ? 'enrolled' : "coursesOffered");
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)

    const linkStack = useHistory();

    const loginAs = localStorage.getItem("loginAs");
    useEffect(() => {
        setMode("view");

        call()
    }, [])

    const call = async () => {
        let temp;
        setShowModal(true)
        loginAs === "tutor" ? temp = await getTutorCourses() : temp = await getEnrolledCourses();
        
        setShowModal(false)
        if (temp && temp?.status === 200)
            setCourses([...temp.courses]);
        else {
            setOpenStrip(true);
            setStripMessage(temp?.message);
        }
    }


    const handleChange = async (event, newValue) => {
        setValue(newValue);

        let temp;
        if (loginAs === "student") {
            setShowModal(true)
            if (newValue === "enrolled") temp = await getEnrolledCourses()
            else if (newValue === "all") temp = await getAllCourses()
            else if (newValue === "completed") temp = await getEnrolledCourses()
            setShowModal(false)
        }

        console.log(temp);

        if (temp && temp?.status === 200)
            setCourses([...temp.courses]);
        else {
            setOpenStrip(true);
            setStripMessage(temp?.message);
        }
    };



    return (
        <div className="View_Course">
            <header className="Courses_Header">
                <div className="Courses_Heading"> <h1>Courses </h1> </div>
                {localStorage.getItem("loginAs") === "tutor" && mode === "view" ? (<button onClick={() => linkStack.push('/dashboard/course/add')} className="NewCourse_Button" >  <span> <AddIcon style={{ fontSize: "1rem", display: "flex", alignItems: "center" }} /> </span> <span style={{ margin: "0 0.4rem" }}> | </span> New Course </button>)
                    : null}

            </header>


            {loginAs=== "student" ? (<section className="Courses_Toolbar">
                <BottomNavigation value={value} onChange={handleChange} >
                    <BottomNavigationAction label="All" value="all" icon={<ViewCarouselIcon />} />
                    <BottomNavigationAction label="Enrolled" value="enrolled" icon={<EmojiObjectsIcon />} />
                    <BottomNavigationAction label="Completed" value="completed" icon={<BusinessCenterIcon />} />
                </BottomNavigation>
            </section>) :
                <section className="Courses_Toolbar">
                    <BottomNavigation value={value} onChange={handleChange} >
                        <BottomNavigationAction label="Courses Offered" value="coursesOffered" icon={<ViewCarouselIcon />} />
                    </BottomNavigation>
                </section>}

            <section className='Course_Grid'>
                {courses && courses?.length > 0 ? courses.map(element => {
                    return (<Course details={element} key={element?._id} />)
                }) : <div className="Course" ><p >No {value !== "all" ? value : null} courses!</p> </div>}

            </section>
        </div>
    )
}

export default ViewCourse;
