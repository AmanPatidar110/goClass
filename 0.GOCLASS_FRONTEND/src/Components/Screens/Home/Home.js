import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from "./Header/Header";
import Display from "./Display/Display";
import { createContext } from 'react';
import { useState } from 'react';

export const UserNameContext = createContext();

function Home() {

    const [userName, setUserName] = useState();

    return (
        <div style={{ display: "flex", width: "100%" }}>
            <UserNameContext.Provider value={[userName, setUserName]} >

                <Sidebar />
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                    <Header />
                    <Display />
                </div>
            </UserNameContext.Provider>
        </div>
    )
}

export default Home
