import { api, apiNoHeader,apiCheck } from "../Baseurl/BaseUrl";
import * as dayjs from "dayjs";

const token = localStorage.getItem("wasl_token");
export const updateToken = () => {
  const token = localStorage.getItem("wasl_token");
  api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null;
};

export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};

export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getInventory = () => {
  return fetch("https://dummyjson.com/products").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
}; 
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};


// export const getOrders = async () => {
//   let data;
//   await apiNoHeader
//     .get("https://dummyjson.com/carts/1")
//     .then((res) => {
//       console.log("12345",res)
//       return res.data
//     })
//     .catch((err) => {
//       if (err.response) {
//         return err.response
//       }
//     });
//   //return data;
// };

// export const getRevenue = async () => {
//   let data;
//   await apiNoHeader
//     .get("https://dummyjson.com/carts")
//     .then((res) => {
//       console.log("getRevenue",res.json())
//       return res.data
//     })
//     .catch((err) => {
//       if (err.response) {
//         return err.response
//       }
//     });
//   // return data;
// };

// export const getInventory = async () => {
//   let data;
//   await apiNoHeader
//     .get("https://dummyjson.com/products")
//     .then((res) => {
//       return res.data
//     })
//     .catch((err) => {
//       if (err.response) {
//         return err.response
//       }
//     });
// };

// export const getCustomers = async () => {
//   let data;
//   await apiNoHeader
//     .get("https://dummyjson.com/users")
//     .then((res) => {
//       return res.data
//     })
//     .catch((err) => {
//       if (err.response) {
//         return err.response
//       }
//     });
// };

