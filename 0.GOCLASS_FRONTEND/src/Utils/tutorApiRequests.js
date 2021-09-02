

import axios from 'axios';
import firebase from 'firebase';

const baseUrl = "https://aman.developersmonk.com";




export const getTutorCourses = async () => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.get(`${baseUrl}/tutor/tutorCourses`, {
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



export const postCourse = async (course) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const formData = new FormData();
        if (course.file) {
            formData.append("ImageUpload", course.file, course.file.name);
        }
        formData.append("courseTitle", course.courseTitle);
        formData.append("description", course.description);
        formData.append("duration", course.duration);

        const response = await axios.post(`${baseUrl}/tutor/course`, formData, {
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





export const updateCourse = async (course, courseId) => {

    console.log(courseId, course);

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const formData = new FormData();
        if (course.file) {
            formData.append("ImageUpload", course.file, course.file.name);
        }
        formData.append("courseTitle", course.courseTitle);
        formData.append("description", course.description);
        formData.append("duration", course.duration);

        const response = await axios.put(`${baseUrl}/tutor/course/${courseId}`, formData, {
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



export const postAssignment = async (assignment, courseId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        console.log(assignment);

        const formData = new FormData();
        if (assignment.file) {
            formData.append("FileUpload", assignment.file, assignment.file.name);
            formData.append("fileName", assignment.file.name);
        }
        formData.append("assignmentTitle", assignment.assignmentTitle);
        formData.append("description", assignment.description);
        formData.append("dueDate", assignment.dueDate);
        formData.append("fullMarks", assignment.fullMarks);
        formData.append("courseId", courseId);

        const response = await axios.post(`${baseUrl}/tutor/assignment`, formData, {
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





export const updateAssignment = async (assignment, assignmentId, courseId) => {

    console.log(courseId, assignment);

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        const formData = new FormData();
        if (assignment.file) {
            formData.append("ImageUpload", assignment.file, assignment.file.name);
            formData.append("fileName", assignment.file.name);
        }
        formData.append("assignmentTitle", assignment.assignmentTitle);
        formData.append("description", assignment.description);
        formData.append("dueDate", assignment.dueDate);
        formData.append("fullMarks", assignment.fullMarks);
        formData.append("courseId", courseId);

        const response = await axios.put(`${baseUrl}/tutor/assignment/${assignmentId}`, formData, {
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



export const getEvaluateCourseAssignments = async (courseId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        console.log(courseId);
        const response = await axios.get(`${baseUrl}/tutor/evaluateassignments/${courseId}`, {
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


export const putEvaluationData = async (assignmentId, studentId, marksAlloted) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        const response = await axios.put(`${baseUrl}/tutor/evaluateassignment/${assignmentId}`, {studentId, marksAlloted}, {
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