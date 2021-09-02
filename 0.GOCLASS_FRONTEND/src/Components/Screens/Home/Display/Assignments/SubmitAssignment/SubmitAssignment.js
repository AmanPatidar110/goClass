import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ModalContext, StripContext } from '../../../../../../App';
import { getAssignment } from '../../../../../../Utils/commonApiRequests';
import { patchSubmitAssignment } from '../../../../../../Utils/studentApiRequests';
import FileUploader from '../../../../../UtilComponents/FIleUploader/FileUploader';
import ImageUploader from '../../../../../UtilComponents/ImageUploader/ImageUploader';
import Assignment from '../Assignment/Assignment';
import './SubmitAssignment.css';


function SubmitAssignment() {
  const [showModal, setShowModal] = useContext(ModalContext);

  const linkStack = useHistory();
  const [submissionStatus, setSubmissionStatus] = useState();
  const [evaluation, setEvaluation] = useState("Not Evaluated");
  const [timeRemaining, setTimeRemaining] = useState();
  const [submittedAt, setSubmittedAt] = useState();
  const [details, setDetails] = useState();
  const { assignmentId } = useParams();
  const [, setOpenStrip, , setStripMessage] = useContext(StripContext);
  const [File, setFile] = useState();

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    if (localStorage.getItem("loginAs") === "student" && assignmentId)
      set();

    else linkStack.replace("/dashboard");
  }, [])

  const set = async () => {
    setShowModal(true)
    const temp = await getAssignment(assignmentId);
    setShowModal(false)
    console.log(temp);

    if (temp && temp.status === 200)
      setDetails({ ...temp.assignment });
    else {
      setOpenStrip(true);
      setStripMessage(temp?.message);
    }

  }
  useEffect(() => {
    if (details) {
      const ev = details?.studentSubmissions.find((s) => (s.studentId === userId && s.marksAlloted));

      if (ev) { setSubmissionStatus("Evaluated"); setEvaluation(ev.marksAlloted); }
      else if (details?.studentSubmissions.find((s) => s.studentId === userId)) setSubmissionStatus("Submitted");
      else setSubmissionStatus("Not Submitted");
      if (submissionStatus === "Note Submitted") setEvaluation("Not Evaluated");

      if (details) {
        const d = new Date(details?.dueDate);
        if (Date.now() > d && submissionStatus === "Not Submitted") setTimeRemaining("Submission is overdue!");
        else if (ev && ev.submissionTime && submissionStatus === "Submitted") setSubmittedAt(` ${d.getHours()}:${d.getMinutes()}  |  ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`)
        if (details?.studentSubmissions.find((s) => (s.studentId === userId && !s.marksAlloted))) setEvaluation("Not Evaluated");

      }
    }

  }, [details])


  const submitAssignment = async () => {

    const data = await patchSubmitAssignment( File, details._id, details.courseId);

    if(data) {

      setOpenStrip(true);
      setStripMessage(data.message);
    }
console.log(details);
    linkStack.replace(`/dashboard/course/${details.courseId._id}`);
  }

  return (

    <div className="SubmitAssignment">
      <header className="Courses_Header">
        <div className="Courses_Heading"> <h1>Submission </h1> </div>
      </header>

      <div class="card_body">
        {details ? <Assignment details={details} /> : null}

        <div class="Instructions">
          <p>Instructions:</p>
          <div>
            <p>The solutions should be written on paper and the scanned pdf can be submitted.</p>
            <p> Ensure to write your roll number and name on top of all the written pages.</p>
            <p>All students should submit the assignment before the due date.</p>
          </div>
        </div>


        <p>Assignment File: <a href="" download={details?.filePath} >{details?.fileName || "Download Assignment File"}</a>
        </p>
        <div class="Status_Card">
          <div className="Status_Card_Line">
            <p style={{ textAlign: "end", marginRight: "1rem" }}>Submission status: </p>
            <p >{submissionStatus ? submissionStatus : null}</p>
          </div>
          <div className="Status_Card_Line">
            <p style={{ textAlign: "end", marginRight: "1rem" }}>Evaluation: </p>
            <p>{evaluation ? evaluation : null} </p>
          </div>
          <div className="Status_Card_Line">
            <p style={{ textAlign: "end", marginRight: "1rem" }}>Submitted At: </p>
            <p > </p>
          </div>
          <div className="Status_Card_Line">
            <p style={{ textAlign: "end", marginRight: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }} >Assignment File <FileUploader File={File} setFile={setFile} /> : </p>
            <p style={{ color: "tomato" }} > {File ? File.name : null}</p>
          </div>
        </div>

        <button className="Submit_button" disabled={!File} onClick={submitAssignment} >Submit</button>

      </div>
    </div>


  )
}

export default SubmitAssignment;
