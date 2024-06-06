import axios from "axios";

// @ts-ignore
export const baseURL = import.meta.env.VITE_HOST + "/api/v1";

export const LIST_ERROR_CODE = [400, 401, 403];

const service = axios.create({
  baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000, // request timeout
});

service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// export const checkResponseStatus = (response) => {
//   if (response.data.code === 401) {
//     return;
//   }

//   return Promise.reject(new Error(response.data?.message || "Error"));
// };

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // if (LIST_ERROR_CODE.includes(response.data?.code)) {
    //   return checkResponseStatus(response);
    // }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default service;
