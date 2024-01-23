import axios from "axios"
import {apis} from "../apis"

// Login
const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apis.login, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

// Register
const register = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apis.register, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

// ForgetPassword
const forgotPassword = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(apis.forgotpassword, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

// ResetPassword
const resetPassword = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apis.resetpassword}/${id}`, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

// UpdatePassword
const updatePassword = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${apis.updatepassword}`, data)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

// Logout
const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(apis.logout)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

export {register, login, logout, forgotPassword, resetPassword, updatePassword}
