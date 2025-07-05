import axios from 'axios'
import { baseURL } from '../API/baseUrl';

async function getAllClientAsync() {
    try {
        const response = await axios.get(`${baseURL}/clients`);
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

async function getNodeAsync(id) {
    try {
        const response = await axios.get(`${baseURL}/node/${id}`);
        if (response.status === 200) {
            return response;
        }
        else {
            return null;
        }

    } catch (error) {
        return null;
    }
}

async function postNodeAsync(node) {
    try {
        const response = await axios.post(`${baseURL}/node`, node);
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

async function updateNodeAsync(id, node) {
    try {
        const response = await axios.put(`${baseURL}/node/${id}`,  node );
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

async function deleteNodeAsync(id) {
    try {
      
        const response = await axios.delete(`${baseURL}/node/${id}`, {'Content-Type': 'text/plain'});
        if (response.status === 200) {
            return Promise.resolve(response);
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error.message);
    }
}

export {
    getAllClientAsync,
    getNodeAsync,
    postNodeAsync,
    updateNodeAsync,
    deleteNodeAsync,
    getAllClientNames
}