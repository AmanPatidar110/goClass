import React from 'react';
import "./Display.css";
import Profile from "./Profile/Profile";
import Courses from "./Courses/Courses";

import firebase from "firebase/app";
import "firebase/auth";

import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, ModalContext, StripContext } from '../../../../App';
import { useEffect } from 'react';
import { getLogin } from '../../../../Utils/authApiRequests';
import CourseDetails from './Courses/CourseDetails/CourseDetails';
import EditAssignments from './Assignments/EditAssignments/EditAssignments';
import Assignments from './Assignments/Assignments';
import { UserNameContext } from '../Home';


function Display() {
    const [showModal, setShowModal] = useContext(ModalContext);
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext);
    const [, setIsAuth] = useContext(AuthContext);
    const [userName, setUserName] = useContext(UserNameContext);

    const linkStack = useHistory();

    useEffect(() => {
        checkUser();
    }, [])

    const checkUser = async () => {
        setShowModal(true);
        console.log(localStorage.getItem("loginAs"));
        const data = await getLogin(localStorage.getItem("loginAs"));
        setShowModal(false);

        setOpenStrip(true);
        setStripMessage(data?.message);

        if (data?.status === 203) {
            const auth = firebase.auth();

            auth.signOut().then(() => {
                localStorage.removeItem("loginAs");
                localStorage.removeItem("userId");
                setIsAuth(false);
                linkStack.replace("/login");
            }).catch((error) => {
                alert("Error Logging Out")
            });
        } else if(data?.status === 201) {
            setUserName(data.userName)
            localStorage.setItem("userId", data.userId)
            localStorage.setItem("userName", data.userName)
        }

    }
    return (
        <div className="Display">
            <Switch>
                <Route path="/dashboard"> <Courses /> </Route>
                <Route  path="/assignments"> <Assignments/> </Route>
                <Route exact path="/profile"><Profile /> </Route>
                <Redirect to="/dashboard" />
            </Switch>
        </div>
    )
}

export default Display
