import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

import './Courses.css';
import EditCourse from './EditCourse/EditCourse';
import ViewCourse from './ViewCourse/ViewCourse';

import { Switch, Route } from 'react-router-dom';
import CourseDetails from './CourseDetails/CourseDetails';



export const EditContext = createContext();
export const ModeContext = createContext();
export const CourseContext = createContext();

function Courses() {

    const [mode, setMode] = useState("view");
    const [editId, setEditId] = useState("");
    const [courses, setCourses] = useState();


    return (
        <div className="Courses">

            <EditContext.Provider value={[editId, setEditId]}>
                <ModeContext.Provider value={[mode, setMode]}>
                    <CourseContext.Provider value={[courses, setCourses]}>
                        <Switch>
                            <Route exact path="/dashboard/course/add"> <EditCourse /></Route>
                            <Route exact path="/dashboard/course/:courseId"> <CourseDetails/> </Route>
                            <Route path="/dashboard/course/edit/:courseId"> <EditCourse /></Route>
                            <Route exact path="/dashboard"> <ViewCourse/>  </Route>
                            {/* <Redirect to="/dashboard" /> */}
                        </Switch>
                    </CourseContext.Provider>
                </ModeContext.Provider>
            </EditContext.Provider>


        </div>
    )
}

export default Courses
