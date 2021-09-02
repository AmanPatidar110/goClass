

import axios from 'axios';
import firebase from 'firebase';

const baseUrl = "https://aman.developersmonk.com";

export const getCourse = async (courseId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.get(`${baseUrl}/common/course/${courseId}`, {
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

export const getAssignment = async (assignmentId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();

        const response = await axios.get(`${baseUrl}/common/assignment/${assignmentId}`, {
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

export const getAllCourseAssignments = async (courseId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        console.log(courseId);
        const response = await axios.get(`${baseUrl}/common/assignments/${courseId}`, {
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

export const getLiveCourseAssignments = async (courseId) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        console.log(courseId);
        const response = await axios.get(`${baseUrl}/common/liveassignments/${courseId}`, {
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