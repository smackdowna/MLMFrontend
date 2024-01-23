/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { getMyNetwork } from '../../api/user';
import Loader from '../common/Loader';
import TreeNode from '../common/TreeNode';
import { getDeadUsers, allpendingrequest } from '../../api/admin';
import { getMyProfile } from '../../api/common';
import '../../styles/innerScreen/styles.css'
import { toast } from 'react-toastify';
import UserDetailsCard from '../common/UserDetailsCard';
import Modal from '../common/Modal';
import { dateFormatter, format } from '../../utils/date';

const MyNetwork = () => {
  const [userData, setUserData] = useState([]);
  const [networkData, setNetworkData] = useState({});
  const [deadIdCount, setDeadIdCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const memoizedFetchMyNetwork = useMemo(() => async () => {
    setIsLoading(true);
    try {
      const response = await getMyNetwork();
      setNetworkData(response?.userTree || {});
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    } finally {
      setIsLoading(false);
    }
  }, []);


  const memoizedFetchAllDeadUsers = useMemo(() => async () => {
    try {
      const { count } = await getDeadUsers();
      setDeadIdCount(count);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    }
  }, []);

  const memoizedFetchPendingRequest = useMemo(() => async () => {
    try {
      const { count } = await allpendingrequest();
      setInactiveCount(count);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    }
  }, []);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getMyProfile();
      setUserData(response.user);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
    if (userData.role === 'admin') {
      memoizedFetchPendingRequest();
      memoizedFetchAllDeadUsers();
    }
    memoizedFetchMyNetwork();
  }, [memoizedFetchMyNetwork, memoizedFetchAllDeadUsers, memoizedFetchPendingRequest, userData.role]);

  const totalNetworkUserCount = () => {
    return (userData.TotalLeftCount ?? 0) + (userData.TotalRightCount ?? 0);
  }

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  return (
    <>
      <section className='header-wrapper'>
        <h1 className='main-title'>Overview</h1>
        <div className="main-content">
          { userData.role === 'admin' && (
            <>
              <div className="box box1">
                <span className='title'>Active IDs</span>
                <span className='content'>{ totalNetworkUserCount() }</span>
              </div>
              <div className="box box1">
                <span className='title'>Inctive IDs</span>
                <span className='content'>{ inactiveCount }</span>
              </div>
              <div className="box box1">
                <span className='title'>Dead IDs</span>
                <span className='content'>{ deadIdCount }</span>
              </div>
              <div className="box box1">
                <span className='title'>Left Count</span>
                <span className='content'>{ userData.TotalLeftCount ?? 0 }</span>
              </div>
              <div className="box box1">
                <span className='title'>Right Count</span>
                <span className='content'>{ userData.TotalRightCount ?? 0 }</span>
              </div>
            </>
          ) }
          { userData.role === 'user' && (
            <>
              <div className="box box1">
                <span className='title'>My Network</span>
                <span className='content'>{ totalNetworkUserCount() }</span>
              </div>
              <div className="box box1">
                <span className='title'>Left Network</span>
                <span className='content'>{ userData.TotalLeftCount ?? 0 }</span>
              </div>
              <div className="box box1">
                <span className='title'>Right Network</span>
                <span className='content'>{ userData.TotalRightCount ?? 0 }</span>
              </div>
            </>
          ) }
        </div>
      </section>

      <section className="content-wrapper flex-wrap">
        { isLoading ? (
          <Loader height="50px" width="50px" color="#007bff" />
        ) : (
          networkData && (
            <div className="outer-container">
              <div className="parent-container">
                <div className="tree">
                  <ul>
                    <TreeNode node={ networkData } onCardClick={ handleCardClick } />
                  </ul>
                </div>
              </div>
            </div>
          )
        ) }

        <article >
          {/* { selectedUser && <UserDetailsCard user={ selectedUser } /> } */ }
          {
            selectedUser && (
              <Modal isOpen={ modalIsOpen } onClose={ () => setModalIsOpen(false) }>
                <div className='user-card-container'>
                  <p>Name: <span>{ selectedUser.name }</span></p>
                  <p>Registration Date: <span>{ dateFormatter(selectedUser.createdAt, format.monthName) }</span></p>
                  <p>Sponsor Id: <span>{ selectedUser.sponsor_id }</span></p>
                  <p>Left Count: <span>{ selectedUser.TotalLeftCount }</span></p>
                  <p>Right Count: <span>{ selectedUser.TotalRightCount }</span></p>
                  <p>Total Active Direct: <span>{ selectedUser.total_direct_refral }</span></p>
                </div>
              </Modal>
            )
          }
        </article>
      </section>
    </>
  )
}

export default MyNetwork