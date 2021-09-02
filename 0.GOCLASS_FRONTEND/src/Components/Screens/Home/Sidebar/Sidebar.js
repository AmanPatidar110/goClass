import React from 'react';
import "./Sidebar.css"

import { NavLink, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import  "firebase/auth";

import EqualizerIcon from '@material-ui/icons/Equalizer';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';



function Sidebar() {
    const linkStack = useHistory();

    const signOutUser = () => {
        const auth = firebase.auth();

        auth.signOut().then(() => {
            linkStack.replace("/auth/login");
            localStorage.removeItem("loginAs");
            localStorage.removeItem("userId");
        }).catch((error) => {
            alert("Error Logging Out")
        });
    }

    return (
        <div className="Sidebar">
            <section className="Sidebar_Head">
                {/* <h2>Go-CLASS</h2> */}
                <img src="http://localhost:4000/images/goclassimg.png" alt="" />
            </section>

            <section className="Sidebar_List">
                <NavLink className="Sidebar_Element" to="/dashboard" activeClassName="Active_Sidebar_Element" >
                    <div className="Sidebar_Element_Icon"><DashboardIcon /></div>
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className="Sidebar_Element" to="/assignments" activeClassName="Active_Sidebar_Element" >
                    <div className="Sidebar_Element_Icon"><AssignmentIcon /> </div>
                    <p>Assignments</p>
                </NavLink>

                <NavLink className="Sidebar_Element" to="/tests" activeClassName="Active_Sidebar_Element" >
                    <div className="Sidebar_Element_Icon"><EqualizerIcon /> </div>
                    <p>Tests</p>
                </NavLink>

                <NavLink className="Sidebar_Element" to="/authors" activeClassName="Active_Sidebar_Element" >
                    <div className="Sidebar_Element_Icon"><PeopleAltIcon /> </div>
                    <p>Authors</p>
                </NavLink>


                <NavLink to="/profile" className="Sidebar_Element" activeClassName="Active_Sidebar_Element" >
                    <div className="Sidebar_Element_Icon"><AccountCircleIcon /></div>
                    <p>Profile</p>
                </NavLink >

                <div className="Sidebar_Element" onClick={signOutUser} >
                    <div className="Sidebar_Element_Icon"><ExitToAppIcon /> </div>
                    <p>Log Out</p>
                </div>
            </section>

        </div>
    )
}

export default Sidebar
