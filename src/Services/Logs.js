import axios from 'axios'
import { baseURL } from '../API/baseUrl';

async function getOTPLogsAsync() {
    try {
        const response = await axios.get(`${baseURL}/logs`);
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

async function getFilteredLogs(clientname, type) {
    try {
        const response = await axios.get(`${baseURL}/logs/${clientname}/${type}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function getMasterEmailLogsAsync(master_email) {
    try {
        const response = await axios.get(`${baseURL}/logs/master/${master_email}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function getClientLogsAsync(client_id) {
    try {
        const response = await axios.get(`${baseURL}/logs/client/${client_id}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function getServerLogsAsync(node_id) {
    try {
        const response = await axios.get(`${baseURL}/logs/server/${node_id}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}
export {
    getOTPLogsAsync,
    getMasterEmailLogsAsync,
    getClientLogsAsync,
    getServerLogsAsync,
    getFilteredLogs
}