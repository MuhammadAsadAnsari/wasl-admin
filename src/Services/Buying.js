import axios from 'axios'
import { baseURL } from '../API/baseUrl';



async function getAnalytics(values){

    try {

   const response = await axios.post(`${baseURL}/buying/count`, values);
 
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error);
    }
}


async function getStat(values) {
    try {

        const response = await axios.post(`${baseURL}/buying/stats`, values);

        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error);
    }
}


async function getTable(date_from , date_to ) {
    try {
    
         const response = await axios.get(`${baseURL}/buying/user/stats?date_from=${date_from}&date_to=${date_to}`);

        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

async function getCount(date_from , date_to ) {
    try {
        
        const response = await axios.get(`${baseURL}/buying/userstats/count?date_from=${date_from}&date_to=${date_to}`);

        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

async function getPercentage(date_from, date_to) {
    try {

        const response = await axios.get(`${baseURL}/buying/userstats/percentage?date_from=${date_from}&date_to=${date_to}`);

        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

async function getAllClientNames() {
    try {
        const response = await axios.get(`${baseURL}/client/names`);
        if (response.status === 200) {
            return  Promise.resolve(response)
        }
        else {
            return Promise.reject(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

export {

   getAnalytics,
   getStat,
   getTable, 
   getCount,
   getPercentage,
   getAllClientNames
   
}