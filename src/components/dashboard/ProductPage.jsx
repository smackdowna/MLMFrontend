import React, { useState } from 'react';
import '../../styles/innerScreen/styles.css';
import PaymentOptions from '../common/PaymentOptionsBox';

const ProductPage = () => {
  const [showPayDetail, setShowPayDetail] = useState(false);
  const [cost, setCost] = useState({
    mrp: 12000,
    discount: 1000,
    delivery: 0,
    productCost: 11000
  })

  // useEffect(() => {
  //   setCost({

  //   })
  // }, [])

  return (
    <div className="product-container">
      <div className="column left-column">
        <img src="/assets/images/welcome_kit.png" alt="Welcome Kit" />
        <h1 className='product-title'>Shree Dham GoShala - welcome kit for new users</h1>
        <p className='product-striked-price'><span>MRP</span> <s>Rs. { cost.mrp }</s> <span>(Inclusive of all taxes)</span></p>
        <h2 className='product-cost'>Rs. { cost.productCost }</h2>
        <p className='product-description'>A Multi-Level Marketing (MLM) welcome kit is a package or set of materials provided to new recruits or distributors when they join an MLM company. The purpose of the welcome kit is to introduce new members to the company, its products or services, and the MLM business model.</p>

        <button className='buy-btn' onClick={ () => setShowPayDetail(true) }>Buy Now</button>
      </div>

      <div className="column right-column">
        {
          showPayDetail ? (
            <>
              <div className="payment-details">
                <h2 className='payment-details-title'>Price Details</h2>
                <div className='payment-row'>
                  <p>Price (1 Item)</p>
                  <p> Rs. { cost.mrp }</p>
                </div>
                <div className='payment-row'>
                  <p>Discount</p>
                  <p style={ { color: '#006A04' } }>-Rs. { cost.discount }</p>
                </div>

                <div className='payment-row'>
                  <p>Delivery Charges</p>
                  <p style={ { color: '#006A04' } }>{ cost.delivery > 0 ? cost.delivery : 'Free' }</p>
                </div>

                <hr />

                <div className='payment-row'>
                  <p>Amount Payable</p>
                  <p>Rs. { cost.productCost }</p>
                </div>
              </div>

              <div className="payment-options-container mt-2">
                <div className="payment-options-title">
                  <h2>PAYMENT OPTIONS</h2>
                </div>
                <div className="payment-options-wrapper">
                  <PaymentOptions cost={ cost.productCost } />
                </div>
              </div>
            </>

          ) : null
        }
      </div>

    </div >
  )
}

export default ProductPage