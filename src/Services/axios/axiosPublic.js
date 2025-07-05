import axios from "axios";
import { baseURL } from '../baseUrl'

export const axiosPublic = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
  },
})
