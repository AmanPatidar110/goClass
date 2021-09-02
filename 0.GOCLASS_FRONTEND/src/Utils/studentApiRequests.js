

import axios from 'axios';
import firebase from 'firebase';


const baseUrl = "https://aman.developersmonk.com";


export const getAllCourses = async () => {
    console.log("all courses reached")
    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.get(`${baseUrl}/student/courses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response)
            return { ...response.data, status: response.status };
        else
            return { message: "Some error occured!", status: response.status }

    } catch (err) {
        console.log(err);
    }
}

export const getEnrolledCourses = async () => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.get(`${baseUrl}/student/enrolledcourses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response)
            return { ...response.data, status: response.status };
        else
            return { message: "Some error occured!", status: response.status }

    } catch (err) {
        console.log(err);
    }
}

export const getCompletedCourses = async () => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.get(`${baseUrl}/student/completedcourses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response)
            return { ...response.data, status: response.status };
        else
            return { message: "Some error occured!", status: response.status }

    } catch (err) {
        console.log(err);
    }
}

export const putEnrollStudent = async (courseId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.post(`${baseUrl}/student/enrollstudent`, { courseId}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response)
            return { ...response.data, status: response.status };
        else
            return { message: "Some error occured!", status: response.status }

    } catch (err) {
        console.log(err);
    }
}




export const getSubmittedCourseAssignments = async (courseId, userId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        console.log(courseId);
        const response = await axios.get(`${baseUrl}/student/${userId}/submittedassignments/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response)
            return { ...response.data, status: response.status };
        else
            return { message: "Some error occured!", status: response.status }

    } catch (err) {
        console.log(err);
    }
}






export const patchSubmitAssignment = async (File, assignmentId, courseId) => {



    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        const formData = new FormData();
        if (!File) {
            return {message: "File not submitted!"}
        }
        
        
        formData.append("submissionFilePath",  File.name);
        formData.append("FileUpload", File, File.name);
        formData.append("assignmentId", assignmentId);
        formData.append("courseId", courseId);

        const response = await axios.patch(`${baseUrl}/student/submitassignment`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response);
        if (response)
            return { ...response.data, status: response.status };
        else
            return { message: "Some error occured!", status: response.status }

    } catch (err) {
        console.log(err);
    }
}

