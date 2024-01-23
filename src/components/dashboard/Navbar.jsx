import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MobileNav from '../common/MobileNav';

import '../../styles/dashboard.css'
import { getUser } from '../../utils/localStorage';

const Navbar = ({ name, purchased }) => {
  const { role } = getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className='nav-container'>
        <div className="logo">
          <Link to={ '/' }>
            <img src="/श्री धाम गौशाला_Logo.svg" alt="Logo" />
          </Link>
        </div>
        <div className="content">
          {/* <span>
            <img src='/assets/icons/bell.svg' alt='notification' />
          </span> */}
          { (role === 'user' && purchased === 'False') &&
            <button className='buy-btn' onClick={ () => navigate('/user/dashboard/buyproduct') }>Buy Product</button>
          }
          <ul className='profile-container'>
            <li className='profile-title'>{ name }</li>
            <li className='profile-image'>
              <img src="/assets/images/profile.svg" alt="Profile" />
            </li>
          </ul>
          <div className="hamburger-icon" onClick={ handleToggleMenu }>
            <img src='/assets/icons/hamburger_menu.svg' alt='Hamburger-icon' />
          </div>
        </div>

        <MobileNav menu_active={ isMenuOpen } />
      </nav>
    </>
  )
}

export default Navbar