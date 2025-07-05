import axios from 'axios'
import { baseURL } from '../API/baseUrl';
import { axiosPublic } from './axios/axiosPublic';

async function getAllChats() {
    try {

        const response = await axios.get(`${baseURL}/adminchats`);
        if (response.data) {
           return  Promise.resolve(response)
        }
        else {
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function getMessagesForUser(chatid) {
    try {

        const response = await axios.get(`${baseURL}/adminchats/${chatid}/messages`);
        if (response.data) {
           return  Promise.resolve(response)
        }
        else {
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

export {
    getAllChats,
    getMessagesForUser
}