import React, { useState, useEffect } from 'react';
import { createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';


import firebase from "firebase";

import './App.css';
import Home from './Components/Screens/Home/Home';
import Auth from './Components/Screens/Auth/Auth';

import SnackbarStrip from './Components/UtilComponents/SnackbarStrip/SnackbarStrip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from './Components/UtilComponents/Modal/Modal';



export const AuthContext = createContext();
export const StripContext = createContext();
export const LoginAsContext = createContext();
export const ModalContext = createContext();

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const [stripMessage, setStripMessage] = useState("");
  const [openStrip, setOpenStrip] = useState();
  const [loginAs, setLoginAs] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    firebase.auth().onAuthStateChanged((user) => {
      setIsAuth(user != null);

    });
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <ModalContext.Provider value={[showModal, setShowModal]}>

          <Modal>
            <CircularProgress color="secondary" />
          </Modal>
          
            <StripContext.Provider value={[openStrip, setOpenStrip, stripMessage, setStripMessage]}>
              <LoginAsContext.Provider value={[loginAs, setLoginAs]} >
                <AuthContext.Provider value={[isAuth]} >
                  {isAuth ? <Home /> : <Auth />}
                </AuthContext.Provider>
              </LoginAsContext.Provider>

              <SnackbarStrip />
            </StripContext.Provider>
        </ModalContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
