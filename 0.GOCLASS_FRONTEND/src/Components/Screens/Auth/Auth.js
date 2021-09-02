import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

import Login from "./Login/Login";
import "./Auth.css";

import AuthImg from '../../../Assests/login.1232c0e7.svg';
import backImg from '../../../Assests/pencils-762555_1920.jpg';

function Auth() {


    return (
        <div className="Auth" style={{ backgroundImage: `url(${backImg})` }}>
            <div className="Auth_Card">
                <div className="Auth_Card_Img">
                    <img src={AuthImg} alt="" />
                </div>
                <Switch>
                    <Route  path="/auth/login"  > <Login/> </Route>
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}

export default Auth
