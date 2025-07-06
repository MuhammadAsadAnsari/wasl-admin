import axios from 'axios'
import { baseURL } from '../API/baseUrl';
import { axiosPublic } from './axios/axiosPublic';

async function getAllCategories() {
    try {

        const response = await axios.get(`${baseURL}/categories/admin`);
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
async function createCategory(category) {
    try {
        const response = await axios.post(`${baseURL}/categories`,  category );
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

async function getAllSubCategories() {
    try {

        const response = await axios.get(`${baseURL}/categories/sub`);
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

async function SubCategoryDetails() {
    try {

        const response = await axios.get(`${baseURL}/categories`);
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

async function createSubCategory(id,subcat) {
    try {
        let obj = {
            name :subcat.trim()
        }
        const response = await axios.post(`${baseURL}/categories/${id}/sub-categories`,  obj );
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
    getAllCategories,
    createCategory,
    getAllSubCategories,
    SubCategoryDetails,
    createSubCategory
}