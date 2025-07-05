import axios from 'axios'
import { baseURL } from '../API/baseUrl';
import { axiosPublic } from './axios/axiosPublic';

async function getAllVisitors() {
    try {

        const response = await axios.get(`${baseURL}/visitors`);
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

async function getAllVisitorsStats() {
    try {

        const response = await axios.get(`${baseURL}/visitors/stats`);
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

async function updateVisitorStatus(id, node) {
    try {
        const response = await axios.put(`${baseURL}/visitors/${id}`,  node );
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

async function visitorCheckedIn(id, node) {
    try {
        const response = await axios.put(`${baseURL}/visitors/${id}/checkedin`,  node );
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
    getAllVisitors,
    updateVisitorStatus,
    visitorCheckedIn,
    getAllVisitorsStats
}