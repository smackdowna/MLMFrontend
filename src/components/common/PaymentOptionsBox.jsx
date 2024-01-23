/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { getMyProfile } from '../../api/common';
import { buyProduct } from '../../api/user';
import { toast } from 'react-toastify';
import Loader from './Loader';

const PaymentOptions = ({ cost }) => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState({
    wallet: false,
    qr: false
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    try {
      const {user} = await getMyProfile();
      setWalletData(user.wallet);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching Wallet Data!');
    }
  }

  useEffect(() => {
    getProfile();
    if (walletData < cost) {
      setIsDisabled(true)
    } else setIsDisabled(false);
  }, [cost, walletData]);

  const handleCheckboxChange = (checkboxType) => {
    if (checkboxType === 'wallet') {
      if (walletData >= cost) {
        setIsChecked({
          wallet: true,
          qr: false
        })
      } else {
        setIsChecked({
          wallet: false,
          qr: false
        })
      }
    } else if (checkboxType === 'qr') {
      setIsChecked({
        wallet: false,
        qr: true
      })
    }
  };

  const handlePayNowClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    const confirmPayment = window.confirm(`Confirm to pay Rs. ${cost}`);
    if (confirmPayment) {
      await handleFinalPay();
    }
  };

  const handleFinalPay = async () => {
    setLoading(true);
    try {
      const response = await buyProduct(
        {
          productCost: cost
        }
      )
      toast.success(response.message || 'Product Purchased');
      setIsModalOpen(false);
      window.location.reload();
      navigate('/user/dashboard');
      
    } catch (error) {
      toast.error(error?.data?.message || 'Product Purchase Failed!')
      setIsModalOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="payment-options-box">
      <div className="checkbox-wrapper">
        <label>
          <input
            type="checkbox"
            disabled={ isDisabled }
            checked={ isChecked.wallet }
            onChange={ () => handleCheckboxChange('wallet') }
          />
          <span className={ isDisabled ? 'disabledStyle' : '' }>{ `Wallet Balance (Available Balance Rs. ${walletData ?? 0})` }</span>
        </label>
      </div>
      <div className="checkbox-wrapper">
        <label>
          <input
            type="checkbox"
            checked={ isChecked.qr }
            onChange={ () => handleCheckboxChange('qr') }
          />
          <span>QR Code</span>
        </label>
      </div>

      <button className="buy-btn mt-2" onClick={ handlePayNowClick } disabled={(isChecked.wallet || isChecked.qr) ? false : true }>Buy Product</button>

      { isModalOpen && (
        <Modal isOpen={ isModalOpen } onClose={ () => setIsModalOpen(false) } >
          { isChecked.wallet ? <>
            <h2 className='text-center'>Wallet Payment</h2>
            <p className='mt-1'><b>Product Cost:</b> Rs. { cost }</p>
            <button className="buy-btn mt-2" onClick={ handleConfirmPayment }>
              {loading ? <Loader height={'30px'} width={'40px'} colour='#fff'/> : `PAY Rs. ${ cost }`}
              
              </button>
          </> : <>
            <div className="qrCode">
              <img style={ { height: '350px', width: '350px' } } src="/assets/images/shreeDhamQr.png" alt="QrCoode" />
            </div>
          </> }
        </Modal>
      ) }
    </div>
  );
};

export default PaymentOptions;
