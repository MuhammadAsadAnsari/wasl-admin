import axios from 'axios'
import { baseURL } from '../API/baseUrl';

async function getAllAnalytics() {
    try {
        const response = await axios.get(`${baseURL}/proxies/analytics`);
        if (response.status === 200) {
           return  Promise.resolve(response)
        }
        else {
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function getAllRatio() {
    try {
        const response = await axios.get(`${baseURL}/proxies/ratios`);
        if (response.status === 200) {
           return  Promise.resolve(response)
        }
        else {
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function getErrorWithCount(values) {
    try {
        // let from = encodeURIComponent(fromdate);
        // let to = encodeURIComponent(dateto);

        const response = await axios.post(`${baseURL}/proxies/errors/count`,values);
        if (response.status === 200) {
           return  Promise.resolve(response)
        }
        else {
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function getProxyStatus(values) {
    try {
        // let from = encodeURIComponent(fromdate);
        // let to = encodeURIComponent(dateto);

        const response = await axios.post(`${baseURL}/proxies/status/count`,values);
        if (response.status === 200) {
           return  Promise.resolve(response)
        }
        else {
            return  Promise.resolve(response)
        }

    } catch (error) {
        return  Promise.reject(error)
    }
}

async function getSpecificProxyStatus(data) {
    try {

        const response = await axios.post(`${baseURL}/proxies/analytics`,data);
        if (response.status === 200) {
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
    getAllAnalytics,
    getErrorWithCount,
    getProxyStatus,
    getAllRatio,
    getSpecificProxyStatus
}