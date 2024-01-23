import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="logo">
          <img src="/श्री धाम गौशाला_Logo.svg" alt="Logo" />
        </div>
        <div className="footer-content">
          <a href="tel:+(123) 456-7890">(123) 456-7890</a>
          <a href="mailto:contact@lift.agency">contact@lift.agency</a>
          <p className='footer-description'>© 2020 Lift Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer