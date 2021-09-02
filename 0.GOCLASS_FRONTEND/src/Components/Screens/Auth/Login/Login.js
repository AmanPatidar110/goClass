import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useParams} from "react-router-dom";



import "./Login.css"


import StreetviewIcon from '@material-ui/icons/Streetview';
import SchoolIcon from '@material-ui/icons/School';
import { useContext } from 'react';
import { LoginAsContext } from '../../../../App';
import LoginContainer from './LoginContainer';

function Login(props) {
    const [loginAs, setLoginAs] = useContext(LoginAsContext);

    const linkStack = useHistory();
    if (window.location.pathname === "/auth/login") setLoginAs("");

    useEffect(() => {
        if (window.location.pathname === "/auth/login/student") setLoginAs("student");
        if (window.location.pathname === "/auth/login/tutor") setLoginAs("tutor");

        if (!loginAs) linkStack.replace("/auth/login");
    }, [])
    
    return (
        <div className="Auth_Card_Right" >
            <h1>GO-CLASS</h1>

            <Switch>
                <Route exact path="/auth/login" >
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <button className="Login_As_Button" onClick={() => { setLoginAs("tutor"); linkStack.push("/auth/login/tutor") }}  >  <span> <StreetviewIcon style={{ fontSize: "1rem", display: "flex", alignItems: "center" }} /> </span> <span style={{ margin: "0 0.4rem" }}> | </span> Login as Tutor </button>
                        <button className="Login_As_Button" onClick={() => { setLoginAs("student"); linkStack.push("/auth/login/student") }} >  <span> <SchoolIcon style={{ fontSize: "1rem", display: "flex", alignItems: "center" }} /> </span> <span style={{ margin: "0 0.4rem" }}> | </span> Login as Student </button>
                    </div>
                </Route>
                <Route path="/auth/login/:loginAs" > <LoginContainer /> </Route>
            </Switch>

        </div>
    )
}

export default Login;
