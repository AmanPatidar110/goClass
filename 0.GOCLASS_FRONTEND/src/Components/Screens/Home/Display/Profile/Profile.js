import React, {useState} from 'react';
import './Profile.css';

import EditProfile from './EditProfile/EditProfile';

import pic from '../images/WhatsApp Image 2020-03-07 at 4.52.43 AM.jpeg';
import ViewProfile from './ViewProfile/ViewProfile';

function Profile() {

     const [mode, setMode] = useState("view");
     
     const [details, setDetails] = useState({
         name: "Aman Patidar",
         email: "amaman@mail.com",
         gender: "male",
         DOB: "2000-03-30",
         address: "INDORE",
         number: "973927392"
     });

     

     let display;
     if(mode === "view") display = <ViewProfile setMode={setMode} details={details}/>
     else display = <EditProfile setMode={setMode}  details={details} setDetails= {setDetails} />

    return (
        <div className='Profile'>
            <section className="Profile_head">
                <h2>My Profile</h2>
            </section>

            <section className='Profile_section'>
                <div className='Profile_image'>
                    <img src={pic} alt=''/>
                    <div className='img_separator'></div>
                </div>

                {display}

            </section>
        </div>
    )
}

export default Profile;
