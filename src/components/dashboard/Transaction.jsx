import React, { useEffect, useState } from 'react';
import '../../styles/innerScreen/styles.css';
import Loader from '../common/Loader';
import { getMyProfile } from '../../api/common';
import { toast } from 'react-toastify';
import { myTransactions } from '../../api/common/index';
import { getAllTransactions, getAllProductTransactions } from '../../api/admin';
import { myPurchase } from '../../api/user'
import { TransactionCard, AllTransactionCard, ProductTransactionCard, MyProductTransactionCard } from '../common/TransactionCard';
import { getUser } from '../../utils/localStorage';

const Transaction = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [creditList, setCreditList] = useState([]);
  const [debitList, setDebitList] = useState([]);
  const [allTransanction, setAllTransaction] = useState([]);
  const [productTransanction, setProductTransaction] = useState([]);
  const [myPurchaseDetail, setMyPurchaseDetail] = useState([]);

  const { role } = getUser();

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await getMyProfile();
      setUserData(response.user);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data');
    } finally {
      setIsLoading(false);
    }
  }

  const getMyTransactions = async () => {
    setInnerLoading(true);
    try {
      const { debit, credit } = await myTransactions();
      setDebitList([...debit]);
      setCreditList([...credit]);
      toast.success('My Transaction Fetched!')
    } catch (error) {
      toast.error(error?.data?.message || 'Error fetching my transactions');
    } finally {
      setInnerLoading(false);
    }
  }

  const getAllUserTransactions = async () => {
    try {
      const { trans } = await getAllTransactions();
      setAllTransaction(trans);
      toast.success('All Transactions Fetched')
    } catch (error) {
      toast.error(error?.data?.message || 'Error fetching all transactions');
    }
  }

  const getProductTransactions = async () => {
    try {
      const { trans } = await getAllProductTransactions();
      setProductTransaction(trans);
      toast.success('Product Transactions Fetched')
    } catch (error) {
      toast.error(error?.data?.message || 'Error fetching product transactions');
    }
  }

  const getMyPurchaseDetail = async () => {
    try {
      const { trans } = await myPurchase();
      setMyPurchaseDetail(trans);
      toast.success('Product Transactions Fetched')
    } catch (error) {
      toast.error(error?.data?.message || 'Error fetching product transactions');
    }
  }

  useEffect(() => {
    getProfile();
    getMyTransactions();
    if (role === 'admin') {
      getAllUserTransactions();
      getProductTransactions();
    } else if (role === 'user') {
      getMyPurchaseDetail();
    }
  }, [])

  return (
    <>
      <div>
        {
          isLoading ? <Loader /> : (
            <>
              <section className="header-wrapper">
                <h1 className='main-title'>Overview</h1>
                <section className="main-content">
                  <div className="box">
                    <span className='title'>Wallet Balance</span>
                    <span className='content'>{ userData.wallet }</span>
                  </div>
                  <div className="box">
                    <span className='title'>My ID</span>
                    <span className='content'>{ userData.own_id }</span>
                  </div>
                </section>
              </section>

              <section className="content-wrapper">
                <div className="main-content">
                  {
                    role === 'admin' ? (
                      <>
                        <div id="all" className="transaction-wrapper">
                          <div className="transaction-header">
                            <h1 className='transaction-title'>All Transactions History</h1>
                          </div>

                          {/* TRANSACTION CONTENT LIST */ }
                          <div className="transaction-content-wrapper">
                            <AllTransactionCard allTransactions={ allTransanction } />
                          </div>
                        </div>
                        <div id="product" className='transaction-wrapper'>
                          <div className="transaction-header">
                            <h1 className='transaction-title'>All Product Transactions</h1>
                          </div>

                          {/* TRANSACTION CONTENT LIST */ }
                          <div className="trasaction-content-wrapper">
                            <ProductTransactionCard productTransactions={ productTransanction } />
                          </div>
                        </div>
                      </>

                    ) : null
                  }
                  <div id="my" className="transaction-wrapper">
                    <div className="transaction-header">
                      <h1 className='transaction-title'>My Transactions History</h1>
                    </div>

                    {/* TRANSACTION CONTENT LIST */ }
                    <div className="transaction-content-wrapper">
                      { innerLoading ? <Loader /> :
                        <TransactionCard debitList={ debitList } creditList={ creditList } />
                      }
                    </div>
                  </div>
                  {
                    role === 'user' && (
                      <div className="transaction-wrapper">
                        <div className="transaction-header">
                          <h1 className='transaction-title'>My Purchase Transaction</h1>
                        </div>

                        {/* MY PURCHASE TRANSACTIONS */ }
                        <div className="transaction-content-wrapper">
                          { innerLoading ? <Loader /> :
                            <MyProductTransactionCard purchaseTransaction={ myPurchaseDetail } />
                          }
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>
            </>
          )
        }
      </div>
    </>
  )
}

export default Transaction