/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { WalletCard } from '../common/WalletCard';
import { getMyProfile } from '../../api/common';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';

const Wallet = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getMyProfile();
      setUserData(response.user);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching Profile Data!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <>
      <div>
        {
          isLoading ? <Loader /> : (
            <>
              <section className="header-wrapper">
                <h1 className='main-title'>Overview</h1>
                <div className="main-content">
                  <div className="box">
                    <span className='title'>Wallet Balance</span>
                    <span className='content'>{ userData.wallet ?? 0 }</span>
                  </div>
                  <div className="box">
                    <span className='title'>My ID</span>
                    <span className='content'>{ userData.own_id ?? 0 }</span>
                  </div>
                </div>
              </section>
              <section className="content-wrapper">
                {
                  <>
                    <WalletCard />
                  </>
                }
              </section>
            </>
          )
        }
      </div>
    </>
  )
}

export default Wallet