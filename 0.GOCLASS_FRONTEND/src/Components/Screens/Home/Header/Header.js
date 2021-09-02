import React from 'react';
import "./Header.css";
import imgPath from "../../../../Assests/WhatsApp Image 2020-03-07 at 4.52.43 AM.jpeg";

import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';
import { useContext } from 'react';
import { UserNameContext } from '../Home';

function Header() {

    const [userName] = useContext(UserNameContext);

    return (
        <div className="Header">
            <section></section>
            <section className="Header_Left">
                <SearchIcon/>
                <NotificationsIcon/>
                <div style={{width: "1px", height: "2rem", border: "1px solid rgb(0,0,0)", margin:"0 1rem", backgroundColor:"rgb(0,0,0)"}}></div>
                <p>{userName}</p>
                <div className="Header_Profile_Img"><img src={imgPath} alt="" /></div>
            </section>
        </div>
    )
}

export default Header
