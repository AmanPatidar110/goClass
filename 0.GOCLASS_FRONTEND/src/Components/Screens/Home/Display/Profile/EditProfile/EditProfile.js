import React, { useState} from 'react';
import './EditProfile.css';
import DatePicker from '../../../../../UtilComponents/DatePicker/DatePicker';

import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


function EditProfile(props) {

    const [name, setname] = useState(props.details.name);
    const [email, setemail] = useState(props.details.email);
    const [number, setNumber] = useState(props.details.number);
    const [gender, setgender] = useState(props.details.gender);
    const [address, setaddress] = useState(props.details.address);
    const [DOB, setDOB] = useState(props.details.DOB);
   
    const saveDetails = (event) => {
        props.setDetails({
            name: name,
            email: email,
            gender: gender,
            DOB: DOB,
            address: address,
            number: number
        });
        props.setMode("view");
    };


    return (
        <div className='EditProfile'>
            <div className='Profile_details'>
                <form noValidate autoComplete="off">
                    <TextField id="standard-required" value={name} onChange={(event) => {setname(event.target.value)}} label="Full Name" />
                    <TextField id="standard-required" value={email} onChange={(event) => {setemail(event.target.value)}} label="Email" />
                    <TextField id="standard-required" value={number} onChange={(event) => {setNumber(event.target.value)}} label="Phone Number" />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(event) => {setgender(event.target.value)}}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>

                    <DatePicker setValue={setDOB} label= {"Birthday"} default={props.details.DOB} />

                    <TextField id="standard-basic" value={address} onChange={(event) => {setaddress(event.target.value)}} label="Address" />
                </form>

            </div>

            <button onClick={saveDetails} className='Profile_edit_btn'><SaveIcon />|  <span>Save</span> </button>

        </div>
    )
}

export default EditProfile;
