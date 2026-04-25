// api.js
import axios from "axios";
import {
  API_NOTIFICATION_MESSAGES,
  SERVICE_URLS,
} from "../constants/config.js";

const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  function (error) {
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200 || response?.status === 201) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log("ERROR IN RESPONSE", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure.message,
      code: error.response.status,
    };
  } else if (error.request) {
    console.log("ERROR IN REQUEST", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure.message,
      code: "",
    };
  } else {
    console.log("ERROR IN NETWORK", JSON.stringify(error));
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError.message,
      code: "",
    };
  }
};

const convertToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

const API = {};

// Corrected api.js loop
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = async (
    body = {},
    showUploadProgress = () => {},
    showDownloadProgress = () => {}
  ) => {
    try {
      // 🔁 Correctly extract URL params first
      let url = value.url;
      const paramMatches = url.match(/:\w+/g);
      let queryParams = { ...body }; // Copy all data to be potential query params

      if (paramMatches) {
        paramMatches.forEach((param) => {
          const paramKey = param.substring(1);
          if (body[paramKey]) {
            url = url.replace(param, body[paramKey]);
            delete queryParams[paramKey]; // Remove URL param from query params
          } else {
            throw new Error(`Missing required URL param: ${paramKey}`);
          }
        });
      }

      const config = {
        method: value.method,
        url: url,
        data: value.method === "GET" || value.method === "DELETE" ? undefined : queryParams,
        params: value.method === "GET" ? queryParams : undefined, // This is the fix
        headers: {
          "Content-Type":
            value.method === "POST" && body instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
        responseType: value.responseType,
        onUploadProgress: showUploadProgress,
        onDownloadProgress: showDownloadProgress,
      };

      const response = await axiosInstance(config);
      return response;
    } catch (error) {
      throw error;
    }
  };
}


export { API };


