import { axiosPrivate } from '../Services/axios/axios'
import { baseURL } from '../API/baseUrl';

async function getAllServerAsync() {
    try {
        const response = await axiosPrivate.get(`${baseURL}/nodes`);
        if (response.status === 200) {
            return  Promise.resolve(response)
        }
        else {
            console.log(response)
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}

async function getServerAsync(id) {
    try {
        const response = await axiosPrivate.get(`${baseURL}/node/${id}`);
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
async function nodeAccounts(id) {
    try {

        const response = await axiosPrivate.get(`${baseURL}/accounts/node/${id}`);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.reject(response)
        }

    } catch (error) {
        return null;
    }
}

async function postServerAsync(node) {
    try {
        const response = await axiosPrivate.post(`${baseURL}/node`, node);
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        else {
            return Promise.resolve(response)
        }
    } catch (error) {
        return Promise.resolve(error)
    }
}

async function updateServerAsync(id, node) {
    try {
        const response = await axiosPrivate.put(`${baseURL}/node/${id}`,  node );
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

async function deleteServerAsync(id) {
    try {
      
        const response = await axiosPrivate.delete(`${baseURL}/node/${id}`, {'Content-Type': 'text/plain'});
        if (response.status === 200) {
            return Promise.resolve(response);
        }
        else {
            return Promise.resolve(response)
        }

    } catch (error) {
        return Promise.reject(error.response.data.message);
    }
}

export {
    getAllServerAsync,
    getServerAsync,
    postServerAsync,
    updateServerAsync,
    deleteServerAsync,
    nodeAccounts
}