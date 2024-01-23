import {axiosInstance} from "../config/index"
import {apis} from "../apis"

// Pending Requests
const allpendingrequest = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.getAllPendingRequests)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// User Status
const updateUserStatusActive = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${apis.updateUserStatusActive}/${data?.userId}`, {
        status: data?.status,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.respose))
  })
}

const updateUserStatusDead = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${apis.updateUserStatusDead}/${data?.userId}`, {
        status: data?.status,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.respose))
  })
}

// Dead Ids
const getDeadUsers = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${apis.getDeadIds}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get All Monthly Income
const generateMonthlyIncome = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${apis.generateMonthlyIncome}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get All Users
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${apis.fetchAllUsersFromAdmin}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get Single User Detail
const getSingleUserDetail = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${apis.getSingleUserDetail}/${id}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get All Income
const getAllIncome = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${apis.getAllIncome}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get All Transactions
const getAllTransactions = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${apis.getAllTransactions}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// All Product Transactions
const getAllProductTransactions = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${apis.allProductTransactions}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get All Tickets
const getAllTickets = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .get(`${apis.allTickets}`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err.response))
  })
}

// Update Ticket Status
const updateTicketStatus = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .put(`${apis.updateTicketStatus}/${data?.userId}`, {
      status: data?.status,
    })
    .then((res) => resolve(res.data))
    .catch((err)=> reject(err.response))
  })
}

export {
  allpendingrequest,
  updateUserStatusActive,
  updateUserStatusDead,
  getDeadUsers,
  generateMonthlyIncome,
  getAllUsers,
  getSingleUserDetail,
  getAllIncome,
  getAllTransactions,
  getAllProductTransactions,
  getAllTickets,
  updateTicketStatus
}
