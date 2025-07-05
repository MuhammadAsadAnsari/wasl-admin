import axios from 'axios'
import { baseURL } from '../API/baseUrl';
import { axiosPublic } from './axios/axiosPublic';

async function getAllRequests() {
    try {

        const response = await axios.get(`${baseURL}/userrequests`);
        if (response.data) {
           return  Promise.resolve(response)
        }
        else {
            console.log("with error"+response);
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function getAllRequestsStats() {
    try {

        const response = await axios.get(`${baseURL}/userrequests/stats`);
        if (response.data) {
           return  Promise.resolve(response)
        }
        else {
            console.log("with error"+response);
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function updateRequestStatus(id, node) {
    try {
        const response = await axios.put(`${baseURL}/userrequests/${id}`,  node );
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.reject(response)
        }

    } catch (error) {
        return Promise.reject(error.response.data.message)
    }
}
export {
    getAllRequests,
    updateRequestStatus,
    getAllRequestsStats
}