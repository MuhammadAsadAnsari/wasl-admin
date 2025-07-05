import axios from 'axios'
import history from 'history/browser'
import { baseURL } from './baseUrl';

async function login(email, password,setToken) {
    try {
        const response = await axios.post(`${baseURL}/login`, { email: email, password: password });
        if (response.status === 200) {

            localStorage.setItem('wasl_token', response.data.data.access_token);
            setToken(response.data.data.access_token);
            history.push('/dashboard/default');
        }
        else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

async function renewToken(email, password) {
    try {
        const response = await axios.post(`${baseURL}/api/refresh`, { email: email, password: password });
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
        const response = await axios.post(`${baseURL}/api/forgot`, { email: email });
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
        const response = await axios.post(`${baseURL}/api/forgot`, { email: email });
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