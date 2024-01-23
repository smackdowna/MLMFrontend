import {axiosInstance} from "../config/index"
import {apis} from "../apis"

// Get Income
const getMyIncome = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.getUserIncome, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get Network
const getMyNetwork = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.getMyNetwork)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Get Binary Monthly Income
const getBinaryMonthlyIncome = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.getUserBinaryMonthlyIncome)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Buy Product
const buyProduct = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(apis.buyProduct, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}
// My Purchase
const myPurchase = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.myPurchase)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

// Create Ticket
const createTicket = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
    .post(apis.createTicket, data)
    .then((res) => resolve(res.data))
    .catch((err)=> reject(err.response))
  })
}

export {
  getMyIncome, 
  getMyNetwork, 
  getBinaryMonthlyIncome,
  buyProduct,
  myPurchase,
  createTicket
}
