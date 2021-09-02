import React from 'react';
import './ViewProfile.css';

import EditIcon from '@material-ui/icons/Edit';

function ViewProfile(props) {
    return (
        <div className='ViewProfile'>

            <div className='Profile_details'>
                <h3 className='Profile_details_name'>{props.details.name}</h3>
                <p>{props.details.email}</p>
                <p>{props.details.number}</p>
                <p>{props.details.gender}</p>
                <p>{props.details.address}</p>
            </div>

            <button onClick={() => {props.setMode("edit")}} className='Profile_edit_btn'><EditIcon />|  <span>Edit</span> </button>
        </div>

    )
}

export default ViewProfile;
