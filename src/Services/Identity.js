import {axiosPublic} from '../Services/axios/axiosPublic'
import history from 'history/browser'
import { baseURL } from '../API/baseUrl';

async function login(email, password, setToken) {
    try {
        let obj ;
        if(setToken != "string" && setToken != undefined && setToken != null){
            obj = { email: email, password: password ,device_token : setToken}
        }
        else{
            obj = {
              email: email,
              password: password,
              device_token:
                "e-hhaAor2e8fsjVnCR5Y2t:APA91bFabdvlRdYXlr-AIQAWBGmkAz-R_T5Wen_OdJCC9I2yNnCnq-0nyT_dRA2QmUnoCsXeDDGvrhGnVQV-WPFl7zLjpqkD3Z6MhbanGsnhhq4Ne824O68",
            };
        }
        const response = await axiosPublic.post(`${baseURL}/auth/token`, obj);
        console.log(response)
        if (response.data) {

            return response.data;
           //localStorage.setItem('token', response.data.token.access_token);
            //setToken(response.data.token.access_token);
            //history.push('/dashboard/default');
        }
        else {
            return null;
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

async function renewToken(email, password) {
    try {
        const response = await axiosPublic.post(`${baseURL}/api/refresh`, { email: email, password: password });
        if (response.status === 200) {
            return null;
        }
        else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

async function findYourAccount(email) {
    try {
        const response = await axiosPublic.post(`${baseURL}/api/forgot`, { email: email });
        if (response.status === 200) {
            return null;
        }
        else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

async function forgotPassword(email) {
    try {
        const response = await axiosPublic.post(`${baseURL}/api/forgot`, { email: email });
        if (response.status === 200) {
            return null;
        }
        else {
            return null;
        }

    } catch (error) {
        return null;
    }
}
export {
    login,
    renewToken,
    findYourAccount,
    forgotPassword,
}