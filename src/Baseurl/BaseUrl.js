import axios from "axios";

const token = localStorage.getItem("wasl_token");


// Axios instance with headers
export const api = axios.create({
 // baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    "Accept-Language": "en",
    "Content-Type": "application/json",
    "X-localization": "en",
    "cache-control": "no-cache",
    Authorization: token ? `Bearer ${token}` : null,
  },
});

// Axios instance without headers
export const apiNoHeader = axios.create({
  //baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    "Accept-Language": "en",
    "Content-Type": "application/json",
    "X-localization": "en",
  },
});
export const apiCheck = axios.create({
 // baseURL: process.env.REACT_APP_BASEURL,
  // headers: {
  //   "Accept-Language": "en",
  //   "Content-Type": "application/json",
  //   "X-localization": "en",
  // },
});
