import React, { useContext, useState, useEffect } from 'react';
import './EditCourse.css';


import TextField from '@material-ui/core/TextField';
import { ModeContext } from '../Courses';
import ImageUploader from '../../../../../UtilComponents/ImageUploader/ImageUploader';
import { useHistory, useParams } from 'react-router-dom';
import { getCourse } from '../../../../../../Utils/commonApiRequests';
import { postCourse, updateCourse } from '../../../../../../Utils/tutorApiRequests';
import { ModalContext, StripContext } from '../../../../../../App';


import SaveIcon from '@material-ui/icons/Save';

function EditCard(props) {

    const [showModal, setShowModal] = useContext(ModalContext);

    const linkStack = useHistory();
    const { courseId } = useParams();

    if (localStorage.getItem("loginAs") === "student") {
        linkStack.replace('/dashboard');
    }

    const [mode, setMode] = useContext(ModeContext)
    const [, setOpenStrip, , setStripMessage] = useContext(StripContext)

    let initialDetails = {};

    useEffect(() => {
        set()
    }, []);

    const set = async () => {
        if (courseId) {
            setMode("edit");
            setShowModal(true)
            const response = await getCourse(courseId);

            setShowModal(false)

            if (response) {
                if (response.status === 200) {
                    initialDetails = response.course;
                    setCourseTitle(initialDetails.courseTitle);
                    setDescription(initialDetails.description)
                    setDuration(+initialDetails.duration)
                }
                else {
                    setOpenStrip(true);
                    setStripMessage(response.message);
                }
            }
        } else {
            setMode("add")
        }
    }

    const [courseTitle, setCourseTitle] = useState(initialDetails.courseTitle);
    const [description, setDescription] = useState(initialDetails.description);
    const [duration, setDuration] = useState(+initialDetails.duration);
    const [courseImage, setCourseImage] = useState();



    const saveCourse = async () => {
        if (!courseTitle || !description || !duration) {
            setOpenStrip(true);
            setStripMessage("All text fields are required!")
            return;
        }

        if (courseTitle && description && duration && courseTitle.length === 0 && description.length === 0 && duration.length === 0) {
            setOpenStrip(true);
            setStripMessage("All text fields are required!")
            return;
        }

        const details = {
            courseTitle: courseTitle,
            description: description,
            duration: duration,
            file: courseImage
        }

        let data;

        setShowModal(true)
        if (mode === "add")
            data = await postCourse(details)

        else data = await updateCourse(details, courseId)

        setShowModal(false)

        setOpenStrip(true);
        setStripMessage(data.message);

        setMode("view");
        linkStack.replace("/dashboard");
    }


    return (
        <section className='EditCourse'>
            <header className="Courses_Header">
                <div className="Courses_Heading"> <h1>Course</h1> </div>
                {localStorage.getItem("loginAs") === "tutor" && mode !== "view" ? (<button onClick={saveCourse} className="NewCourse_Button" >  <span> <SaveIcon style={{ fontSize: "1rem", display: "flex", alignItems: "center" }} /> </span> <span style={{ margin: "0 0.4rem" }}> | </span> Save </button>)
                    : null}
            </header>

            <form className='Courses_Grid' noValidate autoComplete="off">
                <h3>Add/ Edit Course</h3>

                <ImageUploader image={courseImage} setImage={setCourseImage} />
                <p >Course Image</p>

                <TextField
                    id="outlined-full-width"
                    onChange={(event) => { setCourseTitle(event.target.value) }} label="Course Title*"
                    style={{ margin: 8 }}
                    value={courseTitle}
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
                    value={description} onChange={(event) => { setDescription(event.target.value) }} label="Description*"
                />

                <TextField
                    id="outlined-full-width"
                    value={(duration? +duration: null)}
                    onChange={(event) => { setDuration(event.target.value) }}
                    label="Course Duration* (In Months)"
                    style={{ margin: 8 }}
                    fullWidth
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

export default EditCard
