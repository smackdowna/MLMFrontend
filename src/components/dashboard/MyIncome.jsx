/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Loader from '../common/Loader';
import { filterIncomeDataByTimeRange } from '../../utils/date';

import '../../styles/innerScreen/styles.css'
import { getMyIncome, getBinaryMonthlyIncome } from '../../api/user';
import { getUser } from '../../utils/localStorage';
import { toast } from 'react-toastify';

const MyIncome = () => {
  const [incomeData, setIncomeData] = useState([])
  const [binaryIncome, setBinaryIncome] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalSalesIncome, setTotalSalesIncome] = useState(0);
  const [directReferral, setDirectReferral] = useState(0);

  const handleBinaryIncome = async () => {
    setIsLoading(true);
    try {
      const {income} = await getBinaryMonthlyIncome();
      setDirectReferral(0);

      income.map((item) => (
        (item.inc === 1100) ? setBinaryIncome(item.inc) : setDirectReferral(prev => prev + item.inc)
      ))
    } catch (error) {
      toast.error(error?.data?.message || 'Error fetching Binary Income');
    } finally {
      setIsLoading(false);
    }
  }

  const handleMyIncome = async () => {
    setIsLoading(true);
    try {
      const {income} = await getMyIncome();
      setIncomeData(income)
      setTotalSalesIncome(0);
      income.map((item) => (
        setTotalSalesIncome(prev => prev + item.income)
      ))
    } catch (error) {
      toast.error(error?.data?.message || 'Error fetching Income');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleMyIncome();
    handleBinaryIncome();
  }, [])

  return (
    <>
      <section className="header-wrapper">
        <h1 className='main-title'>Overview</h1>
        <div className="main-content">
          <div className="box">
            <span className='title'>My Income</span>
            <span className='content'>{ (binaryIncome + directReferral + totalSalesIncome) ?? 0 }</span>
          </div>
          <div className="box">
            <span className='title'>Binary Income</span>
            <span className='content'>{ binaryIncome ?? 0 }</span>
          </div>
          <div className="box">
            <span className='title'>Direct Referral Income</span>
            <span className='content'>{ directReferral ?? 0 }</span>
          </div>
          <div className="box">
            <span className='title'>Total Referral Income</span>
            <span className='content'>{ totalSalesIncome ?? 0 }</span>
          </div>
        </div>
      </section>

      <section className='content-wrapper'>
        <div className="content-body">
          <div className="description-wrapper">
            <h2 className='content-title'>Total Referral Income</h2>
            {
              isLoading ? <Loader /> : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile No.</th>
                      <th>Amount</th>
                      <th>Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      incomeData.length > 0 ? (
                        incomeData.map((item) => (
                          <tr key={ item.id }>
                            <td>{ item.name }</td>
                            <td>{ item.own_id }</td>
                            <td>{ item.income }</td>
                            <td>{ item.month }</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">
                            No Sales
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default MyIncome