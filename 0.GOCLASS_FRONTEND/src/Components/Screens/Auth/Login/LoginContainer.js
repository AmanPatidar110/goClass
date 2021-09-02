import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase';
import 'firebaseui';

import FirebaseUtil from '../../../../Utils/FirebaseUtil';
import { LoginAsContext } from '../../../../App';
import { useHistory } from 'react-router-dom';

function LoginContainer() {

    const [loginAs, setLoginAs] = useContext(LoginAsContext);
    const linkStack = useHistory();

    const FirebaseApp = new FirebaseUtil().app();
    const [showUI, setShowUI] = useState(true);

    useEffect(() => {
        console.log("log"+ loginAs);
        
    }, [])

    const firebaseui = require('firebaseui');
    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: async (auth, redirect) => {
                console.log('Auth', auth);

                localStorage.setItem("loginAs", loginAs);
                linkStack.replace("/dashboard")

                firebase.auth().currentUser.getIdToken().then(token => {
                    console.log('Id Token: ', token);
                }).catch(err => {
                    console.log('Id Token(err): ', err);
                })

                setShowUI(true);
            },
            signInFailure: (err) => {
                alert('Error Signing you in');
                console.error('Signin error', err);
                setShowUI(true);
            },
            uiShown: () => {
                setShowUI(false);
            }
        },
        signInFlow: "popup",
        signInSuccessUrl: false,
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            },
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            }
        ]
    };



    useEffect(() => {
        if (loginAs && window.location.pathname !== "/auth/login") {
            if (firebaseui.auth.AuthUI.getInstance()) {
                const ui = firebaseui.auth.AuthUI.getInstance()
                ui.start('#FireBaseLoginContainer', uiConfig)
            } else {
                const ui = new firebaseui.auth.AuthUI(firebase.auth())
                ui.start('#FireBaseLoginContainer', uiConfig)
            }
        }

    }, [loginAs]);




    return (

        <div id="FireBaseLoginContainer"> </div>

    )
}

export default LoginContainer;
