

import axios from 'axios';
import firebase from 'firebase';

const baseUrl = "https://aman.developersmonk.com";




export const getLogin = async (loginAs) => {

    try {
        if (firebase.auth().currentUser == null) return null;

        let token = await firebase.auth().currentUser.getIdToken();
        console.log("token" + token);
        const response = await axios.get(`${baseUrl}/auth/login/${loginAs}`, {
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