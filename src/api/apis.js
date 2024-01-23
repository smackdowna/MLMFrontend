const local = false
const localUrl = `http://localhost:4000/api/v1`
const prodUrl = `http://api.shreegoudham.com/api/v1`

const base_url = local ? localUrl : prodUrl

const apis = {
  // auth apis
  register: `${base_url}/register`,
  login: `${base_url}/login`,
  logout: `${base_url}/logout`,
  forgotpassword: `${base_url}/password/forgot`,
  resetpassword: `${base_url}/password/reset`,
  updatepassword: `${base_url}/password/update`,

  // common apis
  getMyProfile: `${base_url}/me`,
  updateMyProfile: `${base_url}/me/update`,
  sendMoney: `${base_url}/sendmoney`,
  myTransactions: `${base_url}/mytransactions`,

  //admin apis
  getAllPendingRequests: `${base_url}/admin/pendingrequests`,
  updateUserStatusActive: `${base_url}/admin/user`,
  updateUserStatusDead: `${base_url}/admin/user`,
  getDeadIds: `${base_url}/admin/deadId`,
  generateMonthlyIncome: `${base_url}/monthlyincome`,
  fetchAllUsersFromAdmin: `${base_url}/admin/users`,
  getSingleUserDetail: `${base_url}/admin/user`,
  getAllIncome: `${base_url}/all/income`,
  getAllTransactions: `${base_url}/admin/transactions`,
  allProductTransactions: `${base_url}/admin/producttransactions`,
  allTickets: `${base_url}/admin/gettickets`,
  updateTicketStatus: `${base_url}/admin/userticket`,

  // user apis
  getUserIncome: `${base_url}/me/income`,
  getMyNetwork: `${base_url}/me/tree`,
  getUserBinaryMonthlyIncome: `${base_url}/binaryincome`,
  buyProduct: `${base_url}/buyproduct`,
  myPurchase: `${base_url}/mypurchase`,
  createTicket: `${base_url}/user/createticket`,
}

export {apis}
