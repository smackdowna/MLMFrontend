import React from 'react'

const Contact = () => {
  return (
    <section className='contact'>
      <div className="container">
        <h2 className='contact-title'>CONTACT US</h2>
        <div className="address">
          <div className="address-content">
            <h3 className='address-subtitle'>OUR ADDRESS</h3>
            <div className="address-wrapper">
              <div className="address-line">
                <h4 className='address-line-title'>DELHI,INDIA</h4>
                <p className='address-line-content'>New Goshala mlm ,Ashok Nagar near green park ,New delhi-110043,India</p>
              </div>
              <div className="address-line">
                <p className='address-line-subcontent'><span>Email: </span>newgosahala@gmail.com</p>
                <p className='address-line-subcontent'><span>Phone: </span>92135748228</p>
              </div>
              <div className="address-line">
                <h4 className='address-line-title'>Feedback</h4>
                <p>feedback@newgosahala.com</p>
              </div>
              <div className='address-description'>
                <p className='address-line-content'>
                  Whether you’re looking for answers, would like to solve a problem, or just want to let us know how we did, you’ll find.
                </p>
              </div>
              <button className='message-btn'>WRITE A MESSAGE</button>
            </div>
          </div>
          <div className="map">
            <img src='/assets/images/map.svg' alt='Location' />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact