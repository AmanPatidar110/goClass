import React, { useContext, useState, useEffect } from 'react';
import './EditAssignments.css';

import { useHistory, useParams } from 'react-router-dom';
import { getAssignment} from '../../../../../../Utils/commonApiRequests';
import { postAssignment, updateAssignment} from '../../../../../../Utils/tutorApiRequests';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import { ModalContext, StripContext } from '../../../../../../App';
import { AssignmentModeContext } from '../Assignments';
import FileUploader from '../../../../../UtilComponents/FIleUploader/FileUploader';


function EditAssignments(props) {
    const [showModal, setShowModal] = useContext(ModalContext);

    const linkStack = useHistory();
    const { assignmentId, courseId } = useParams();

    if (localStorage.getItem("loginAs") === "student") {
        linkStack.replace('/dashboard');
    }
    let initialDetails = {};

    const [assignmentMode, setAssignmentMode] = useContext(AssignmentModeContext);
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext);

console.log(courseId);

    useEffect(() => {
        set()
    }, [assignmentId]);

    const set = async () => {
        if (assignmentId) {
            setAssignmentMode("edit");

            setShowModal(true)
            const response = await getAssignment(assignmentId);
            setShowModal(false);

            if (response) {
                if (response.status === 200) {
                    initialDetails = response.assignment;
                    console.log(initialDetails);
                    setAssignmentTitle(initialDetails.assignmentTitle);
                    setDescription(initialDetails.description);
                    setDueDate(initialDetails.dueDate);
                    setFullMarks(+initialDetails.fullMarks);
                }
                else {
                    setOpenStrip(true);
                    setStripMessage(response.message);
                }
            }
        } else {
            setAssignmentMode("add")
        }
    }


    const [assignmentTitle, setAssignmentTitle] = useState(initialDetails.courseTitle);
    const [description, setDescription] = useState(initialDetails.description);
    const [dueDate, setDueDate] = useState(initialDetails.duration);
    const [fileName, setFileName] = useState(initialDetails.fileName);
    const [File, setFile] = useState();
    const [fullMarks, setFullMarks] = useState(+initialDetails.fullMarks);





    const saveAssignment = async () => {
        if (!assignmentTitle || !description || !dueDate || !fullMarks) {
            setOpenStrip(true);
            setStripMessage("All text fields are required!")
            return;
        }
        const details = {
            assignmentTitle: assignmentTitle,
            description: description,
            dueDate: dueDate,
            file: File,
            fullMarks: fullMarks
        }

        console.log(courseId);
        let data;

        if (assignmentMode === "add")
            data = await postAssignment(details, courseId)

        else data = await updateAssignment(details, assignmentId, courseId)

        setOpenStrip(true);
        setStripMessage(data?.message);

        setAssignmentMode("view");
        linkStack.replace(`/dashboard/course/${courseId}`);
    }


    return (
        <section className='EditAssignment'>
            <header className="Courses_Header">
                <div className="Courses_Heading"> <h1>Assignment</h1> </div>
                {localStorage.getItem("loginAs") === "tutor" && assignmentMode !== "view" ? (<button onClick={saveAssignment} className="NewCourse_Button" >  <span> <SaveIcon style={{ fontSize: "1rem", display: "flex", alignItems: "center" }} /> </span> <span style={{ margin: "0 0.4rem" }}> | </span> Save </button>)
                    : null}
            </header>

            <form className='Courses_Grid' noValidate autoComplete="off">
                <h3 style={{marginBottom: "4rem"}}>Add/ Edit Assignment</h3>

                
                <FileUploader  File={File} setFile={setFile}/>
                <p style={{textAlign:"center", marginLeft:"1rem"}} >Assignment File: <span>{File? File.name: (fileName? fileName: null)}</span></p>
                <TextField
                    id="outlined-full-width"
                    onChange={(event) => { setAssignmentTitle(event.target.value) }}
                    label="Assignment Title*"
                    style={{ margin: 8 }}
                    value={assignmentTitle}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
                <TextField
                    id="outlined-full-width"
                    multiline
                    fullWidth
                    rowsMax={5}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={description} onChange={(event) => { setDescription(event.target.value) }}
                    label="Description*"
                />


                <TextField
                    id="datetime-local"
                    label="Due Date*"
                    type="datetime-local"
                    defaultValue="2021-01-24T10:30"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => { setDueDate(new Date(event.target.value).toISOString()) }}
                />

                <TextField
                    id="outlined-full-width"
                    value={fullMarks}
                    onChange={(event) => { setFullMarks(event.target.value) }}
                    label="Weightage*"
                    style={{ margin: 8 }}
                    fullWidth
                    type="number"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"

                />
                {/* <TextField id="standard-required" type="number" value={duration} onChange={(event) => { setDuration(event.target.value) }} label="Course Duration* (In Months)" /> */}

            </form>
        </section>
    )
}


export default EditAssignments
