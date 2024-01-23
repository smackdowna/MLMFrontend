import "./App.css"
import {Routes, Route} from "react-router-dom"
import {ToastContainer} from "react-toastify"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
// import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import Error from "./components/dashboard/Error"
import { AdminDashboardRoutes, UserDashboardRoutes } from "./dashboardRoutes"

const App = () => {
  // Disable devtools
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        <Route path="/reset/password" element={<NewPassword />} />
        <Route path="*" element={<Error />} />

        <Route path="/admin/dashboard/*" element={<AdminDashboardRoutes />} />
        <Route path="/user/dashboard/*" element={<UserDashboardRoutes />} />
      </Routes>
    </>
  )
}

export default App
