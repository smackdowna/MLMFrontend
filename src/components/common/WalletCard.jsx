import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllUsers } from '../../api/admin';
import '../../styles/innerScreen/styles.css';
import Modal from './Modal';
import Loader from './Loader';
import { sendMoney } from '../../api/common';
import { getUser } from '../../utils/localStorage';

const WalletCard = () => {
  const userData = getUser();
  const [loading, setLoading] = useState(false);
  const [userLoader, setUserLoader] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const fetchAllUsers = async () => {
    setUserLoader(true);
    try {
      const { users } = await getAllUsers();
      const filteredUsers = users.filter(user => user.own_id !== userData.own_id);
      setAllUserData(filteredUsers);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    } finally {
      setUserLoader(false);
    }
  }

  useEffect(() => {
    if (searchTerm === '') {
      setIsDisabled(true);
      setPaymentAmount('');
      fetchAllUsers();
    }
  }, [searchTerm])

  const handleSearch = () => {
    const filtered = allUserData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.own_id.toString().includes(searchTerm)
    )
    setAllUserData(filtered);
  }

  const handleUserCardClick = (user) => {
    setSelectedUser(user);
    setPaymentAmount('');
    setIsDisabled(true);
    setModalIsOpen(true);
  }

  const handlePay = async (amount, own_id) => {
    setLoading(true);
    try {
      const response = await sendMoney(
        {
          recevier_own_id: own_id,
          amount: amount
        }
      );
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.error || 'Error Occured while Payment!');
    } finally {
      setLoading(false);
      setModalIsOpen(false);
    }
  }

  const handleConfirmPayment = async () => {
    const confirmPayment = window.confirm(`Confirm to pay Rs. ${paymentAmount}`);
    if (confirmPayment) {
      await handlePay(paymentAmount, selectedUser?.own_id);
    }
  };

  const handlePayableAmount = (value) => {
    setIsDisabled(false);
    setPaymentAmount(value);
  }

  return (
    <>
      <div className="transfer-card-wrapper">
        <h2 className='transfer-card-title'>Transfer Money</h2>
        <div className="search-wrapper">
          <input
            className="search-input"
            type='text'
            placeholder='Enter username or user id'
            value={ searchTerm }
            onChange={ (e) => { setSearchTerm(e.target.value) } }
          />
          <button className='search-btn' onClick={ handleSearch }
            style={ { backgroundColor: '#006A04', color: 'white' } }
          >Search</button>
        </div>

        <hr className='separator' />
        {/* User Result View */ }
        <div className="transfer-user-card">
          {
            userLoader ? <Loader /> : (
              allUserData.map((user) => (
                <div className="user-profile-details" key={ user.own_id } onClick={ () => handleUserCardClick(user) } title='Click to Pay'>
                  <div className='profile-content'>
                    <p className='user-profile-name'>{ user.name }</p>
                    <p className='user-profile-id'>{ user.own_id }</p>
                  </div>
                  <p className='user-profile-status' style={ { color: user.status === 'Active' ? 'green' : 'red' } }>{ user.status }</p>
                </div>
              ))
            )
          }
        </div>
        <Modal isOpen={ modalIsOpen } onClose={ () => setModalIsOpen(false) }>
          <h2 className='modal-title'>Make Payment</h2>
          <p className='capitalize'>
            <strong>Name:</strong>&nbsp;&nbsp;{ selectedUser?.name }
          </p>
          <p>
            <strong>User ID:</strong> &nbsp;&nbsp;{ selectedUser?.own_id }
          </p>
          <div className="search-wrapper mt-1 mi-none">
            <input
              className='search-input'
              type="number"
              placeholder="Enter amount"
              value={ paymentAmount }
              onChange={ (e) => handlePayableAmount(e.target.value) }
              required
            />
            <button disabled={ isDisabled } className='search-btn' onClick={handleConfirmPayment}
              style={ { cursor: isDisabled ? 'not-allowed' : 'pointer' } }
            >
              { loading ? <Loader height='20px' width='20px' colour='#fff' /> : 'Pay' }</button>
          </div>
        </Modal>
      </div>
    </>
  )
}

export {
  WalletCard
}