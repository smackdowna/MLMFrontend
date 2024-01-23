import React from "react";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/localStorage";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogin = () => {
    const user = getUser();
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'user') {
        navigate('/user/dashboard', { replace: true })
      }
    } else {
      navigate('/login', { replace: true })
    }
  }

  const handleRegister = () => {
    navigate('/register', { replace: true })
  }

  return (
    <>
      <header>
        <div className="statusbar">
          <ul className="statusbar-wrapper">
            <li className="satusbar-items">CSR No. 3216548 (Under process) &nbsp;| &nbsp;</li>
            <li className="satusbar-items">Income Tax 80H Reg.No.123456 &nbsp;| &nbsp;</li>
            <li className="satusbar-items">Income Tax 12AReg No.123456</li>
          </ul>
        </div>
        <nav className="container">
          <div className="logo">
            <a href="/">
              <img src="/श्री धाम गौशाला_Logo.svg" alt="Logo" />
            </a>
          </div>

            {/* <ul className={`nav-items ${isMobileMenuOpen ? 'display' : 'none'}`}>
              <li className="nav-link" >
                Home
              </li>
              <li className="nav-link">
                About
              </li>
              <li className="nav-link">
                Gallery
              </li>
              <li className="nav-link">
                Contact Us
              </li>
            </ul> */}
          <div className="btn-wrapper">
            <button type="button" className="btn btn-outline" onClick={ handleLogin }>Member Login</button>
            <button type="button" className="btn btn-filled" onClick={ handleRegister }>Register</button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;