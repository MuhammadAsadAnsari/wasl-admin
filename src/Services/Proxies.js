import axios from 'axios'
import { baseURL } from '../API/baseUrl';

async function getVendors() {
    try {
        const response = await axios.get(`${baseURL}/proxies/vendors`);
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

async function getVendor(id) {
    try {
        const response = await axios.get(`${baseURL}/proxies/vendor/${id}`);
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

async function removeVendor(id) {
    try {
        const response = await axios.delete(`${baseURL}/proxies/vendor/${id}`);
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

async function updateVendor(id,values) {
    try {
        const response = await axios.put(`${baseURL}/proxies/vendor/${id}`,values);
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

async function Assign(values) {
    try {
        const response = await axios.post(`${baseURL}/proxies/assign`, values);
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


async function UnAssign(values) {
    try {
        const response = await axios.post(`${baseURL}/proxies/unassign`, values);
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

async function ReplaceProxies(values) {
    try {
        const response = await axios.post(`${baseURL}/proxies/replace`, values);
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

async function getCounter() {
    try {
        const response = await axios.get(`${baseURL}/proxies/counter`);
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

async function getProxies(offset,limit) {
    try {
        const response = await axios.get(`${baseURL}/proxies?offset=${offset}&limit=${limit}`);
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
async function getUserProxyStats() {
    try {
        const response = await axios.get(`${baseURL}/proxies/stats`);
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
async function UploadFile(values) {
    try {
        const baseurl = baseURL;
        const response = await axios.post(`${baseURL}/proxies/upload`, values);
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
export {
    getVendors,
    getUserProxyStats,
    getProxies,
    getCounter,
    Assign,
    UnAssign,
    UploadFile,
    getVendor,
    removeVendor,
    updateVendor,
    ReplaceProxies
}