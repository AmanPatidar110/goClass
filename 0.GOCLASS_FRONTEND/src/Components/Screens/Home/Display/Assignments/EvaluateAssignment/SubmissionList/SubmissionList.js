import React from 'react';
import './SubmissionList.css';
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useState } from 'react';
import { useContext } from 'react';
import { ModalContext, StripContext } from '../../../../../../../App';
import {  putEvaluationData } from '../../../../../../../Utils/tutorApiRequests';
import { useHistory, useParams } from 'react-router-dom';

function SubmissionList(props) {

    const [weight, setweight] = useState();
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext);
    const [showModal, setShowModal] = useContext(ModalContext);

    const linkStack = useHistory()

    const {assignmentId} = useParams();

    const saveWeight = async() => {
        if(!weight) {
            setOpenStrip(true)
            setStripMessage("Evaluation must not be empty!")
            return;
        }

        setShowModal(true)
        const response = await putEvaluationData(assignmentId, props.submissionData?.studentId._id, weight)
        setShowModal(false)
        if(response) {
            setOpenStrip(true)
            setStripMessage(response.message);
            linkStack.replace(`/assignments/evaluate/${assignmentId}`);
        }
    }


    return (
        <div className="Course SubmissionList">
            <p className="submission_data">{props.submissionData?.studentId.studentName}</p>
            <p className="submission_data">{props.submissionData?.studentId.email}</p>
            <p className="submission_data">
                <a href="" download={props.submissionData?.submissionFilePath} >{props.submissionData?.submissionFileName }</a>
            </p>


            <div className="weight">

                <TextField
                id="outlined-full-width"
                label="Evaluation*"
                onChange={(e) => {setweight(e.target.value)}}
                style={{ margin: 8 }}
                fullWidth
                type="number"
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                
                />
                </div>

                <p className="submission_list_right" onClick={saveWeight} >
                    <CheckCircleIcon/>
                </p>
        </div>
    )
}

export default SubmissionList
