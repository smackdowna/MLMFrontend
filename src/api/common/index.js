import {axiosInstance} from "../config/index"
import {apis} from "../apis"

// Get My Profile
const getMyProfile = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.getMyProfile)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.respose))
  })
}

// Update My Profile
const updateMyProfile = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.updateMyProfile)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.respose))
  })
}

// Send Money
const sendMoney = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(apis.sendMoney, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}
// My Transactions
const myTransactions = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(apis.myTransactions)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response))
  })
}

export {
  getMyProfile,
  updateMyProfile,
  sendMoney,
  myTransactions
}
