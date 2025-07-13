import axios from 'axios'
import { baseURL } from '../API/baseUrl';
import { axiosPublic } from './axios/axiosPublic';

async function getAllUsers() {
    try {

        const response = await axios.get(`${baseURL}/appuser`);
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

async function addUser(user) {
    try {
        const response = await axios.post(`${baseURL}/auth/add-providers`, user);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else{
            return Promise.reject(response)
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

async function getPropety(id) {
    try {
        const response = await axios.get(`${baseURL}/property/${id}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.reject(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function updateProperty(id, property) {
    try {
        const response = await axios.put(`${baseURL}/property/${id}`, property);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.reject(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function remove(id) {
    try {
        const response = await axios.delete(`${baseURL}/appuser/${id}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.reject(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function moreInfo() {
    try {
        const response = await axios.get(`${baseURL}/appuser/stats`);
        if (response.status === 200) {
           return  Promise.resolve(response)
        }
    } catch (error) {
        return  Promise.reject(error)
    }
}

export {
    getAllUsers,
    addUser,
    getPropety,
    updateProperty,
    remove,
    moreInfo

}