/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/dashboard.css'
import { allpendingrequest, getDeadUsers } from '../../api/admin';
import { getUser } from '../../utils/localStorage';
import { toast } from 'react-toastify';
import { getMyProfile } from '../../api/common';
import Loader from '../common/Loader';

const Home = () => {
  const [userData, setUserData] = useState({});
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [role, setRole] = useState(userData?.role);
  const [deadIdCount, setDeadIdCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPendingRequestData = async () => {
    try {
      const { count } = await allpendingrequest();
      setPendingRequestCount(count);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    }
  }

  const memoizedFetchAllDeadUsers = useMemo(() => async () => {
    try {
      const { count } = await getDeadUsers();
      setDeadIdCount(count);
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
    const user = getUser();
    setRole(user.role);
    if (role === 'admin') {
      getAllPendingRequestData();
      memoizedFetchAllDeadUsers();
    }
    getProfile();
  }, [memoizedFetchAllDeadUsers, role]);

  return (
    <>
      <h1 className='main-title'>Overview</h1>
      <div className="main-content">
        {
          isLoading ? <Loader height="50px" width="50px" color="#007bff" /> :
            <>
              {
                role === "admin" && (
                  <>
                    <div className="box">
                      <span className='title'>Total Members</span>
                      <span className='content'>{ (userData.TotalLeftCount ?? 0) + (userData.TotalRightCount ?? 0) }</span>
                    </div>
                    {/* <div className="box">
                      <span className='title'>Total Earning</span>
                      <span className='content'>{ userData.income ?? 0 }</span>
                    </div> */}

                    <div className="box">
                      <span className='title'>Email id</span>
                      <span className='content' style={{fontSize: '15px'}}>{ userData.email }</span>
                    </div>
                    <div className="box">
                      <span className='title'>Own id</span>
                      <span className='content'>{ userData.own_id }</span>
                    </div>
                    <div className="box">
                      <span className='title'>Pending Request(s)</span>
                      <span className='content'>{ pendingRequestCount }</span>
                    </div>
                    <div className="box">
                      <span className='title'>Dead IDs</span>
                      <span className='content'>{ deadIdCount }</span>
                    </div>
                  </>

                )
              }
              {
                role === 'user' &&
                (
                  <>
                    <div className="box box1">
                      <span className='title'>My Commission</span>
                      <span className='content'>{ userData.income ?? 0 }</span>
                    </div>
                    <div className="box box2">
                      <span className='title'>My Network</span>
                      <span className='content'>{ (userData.TotalLeftCount ?? 0) + (userData.TotalRightCount ?? 0) }</span>
                    </div>
                    <div className="box">
                      <span className='title'>Email id</span>
                      <span className='content' style={{fontSize: '15px'}}>{ userData.email }</span>
                    </div>
                    <div className="box">
                      <span className='title'>Sponsor id</span>
                      <span className='content'>{ userData.sponsor_id }</span>
                    </div>
                    <div className="box box3">
                      <span className='title'>My Wallet</span>
                      <span className='content'>{ userData.wallet ?? 0 }</span>
                    </div>
                    <div className="box box4">
                      <span className='title'>My ID</span>
                      <span className='content'>{ userData.own_id ?? 0 }</span>
                    </div>
                  </>
                )
              }
            </>
        }



      </div>
    </>
  )
}

export default Home