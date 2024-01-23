import axios from "axios"
import {getToken} from "../../utils/localStorage"
let token = getToken()

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    common: {
      "Content-Type": "application/json",
    },
  },
})

// Request interceptor for setting Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    if (!token) {
      token = getToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access or token expiration
      // Redirect to login page or refresh token

    }
    return Promise.reject(error)
  }
)

export {axiosInstance}
