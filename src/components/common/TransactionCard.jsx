import React from 'react'
import '../../styles/innerScreen/styles.css'
import { dateFormatter, format } from '../../utils/date';

const TransactionCard = ({ debitList, creditList }) => {

  return (
    <>
      {
        creditList.length > 0 && (creditList.map((item) => (
          (item.amount) && (
            <div className="transaction-content-card">
              <div className="transaction-description">
                <div className="transaction-details">
                  <div className='details-icon-wrapper'>
                    <img className='details-icon' src="/assets/icons/receive_money.svg" alt="Receive Money Icon" />
                  </div>
                  <div className='details-content'>
                    <p className='success capitalize'>
                      Received from
                    </p>
                    <p>
                      <span className='details-content-id'> ID: ({ item.sender_own_id })
                      </span>
                    </p>
                  </div>
                </div>
                <div className="transaction-amount">
                  <span className='success'>
                    +₹{ item.amount ?? 0 }
                  </span>
                </div>
              </div>
              {/* Transaction Label */ }
              <div className="transaction-label">
                <span className='date'>
                  { dateFormatter(item.transaction_time, format.monthName) }
                </span>
                <span className='mode'>
                  Credited to Wallet
                </span>
              </div>
            </div>
          )
        ))
        )
      }
      {
        debitList.length > 0 && (debitList.map(item => (
          (item.amount) && (
            <div className="transaction-content-card">
              <div className="transaction-description">
                <div className="transaction-details">
                  <div className='details-icon-wrapper'>
                    <img className='details-icon' src="/assets/icons/send_money.svg" alt="Transfered Money Icon" />
                  </div>
                  <div className='details-content'>
                    <p className='danger capitalize'>
                      Transferred to
                    </p>
                    <p>
                      <span className='details-content-id'> ID:({ item.recevier_own_id })
                      </span>
                    </p>
                  </div>
                </div>
                <div className="transaction-amount">
                  <span className='danger'>
                    -₹{ item.amount ?? 0 }
                  </span>
                </div>
              </div>
              {/* Transaction Label */ }
              <div className="transaction-label">
                <span className='date'>
                  { dateFormatter(item.transaction_time, format.monthName) }
                </span>
                <span className='mode'>
                  Debited from Wallet
                </span>
              </div>
            </div>
          )
        )))
      }
      { (creditList.length === 0 && debitList.length === 0) && <p>No Transaction Yet</p> }
    </>
  )
}

const AllTransactionCard = ({ allTransactions }) => {
  return (
    <>
      { allTransactions ? (
        allTransactions.map((item) => (
          (item.amount) && (<div className="transaction-content-card">
            <div className="transaction-description">
              <div className="transaction-details">
                <div className='details-content'>
                  <p className='danger capitalize'>
                    <span className='details-content-id'>Sender ID: { item.sender_own_id }
                    </span>
                  </p>
                  <p>
                    <span className='details-content-id'>Receiver ID: { item.recevier_own_id }
                    </span>
                  </p>
                </div>
              </div>
              <div className="transaction-amount">
                <span className='gray'>
                  ₹{ item.amount ?? 0 }
                </span>
              </div>
            </div>
            <div className="transaction-label">
              <span className='date'>
                { dateFormatter(item.transaction_time, format.monthName) }
              </span>
            </div>
          </div>)
        ))
      ) : (
        <p> No Transactions Available</p>
      )
      }
    </>
  )
}

const ProductTransactionCard = ({ productTransactions }) => {

  return (
    <>
      {
        (productTransactions.length > 0) ? productTransactions.map((item) => (
          <div className="transaction-content-card">
            <div className="transaction-description">
              <div className="transaction-details">
                <div className='details-content'>
                  <p className='danger capitalize'>
                    <span className='details-content-id'>Buyer ID: { item.Buy_user_own_id }
                    </span>
                  </p>
                </div>
              </div>
              <div className="transaction-amount">
                <span className={ item.type === 'Purchased' ? 'success' : 'danger' }>
                  ₹{ item.productCost ?? 0 }
                </span>
              </div>
            </div>
            <div className="transaction-label">
              <span className='date'>
                { dateFormatter(item.Puchased_time, format.monthName) }
              </span>
            </div>
          </div>
        )) : <p>No Product Sales</p>
      }
    </>
  )
}

const MyProductTransactionCard = ({ purchaseTransaction }) => {
  return (
    <>
      {
        (purchaseTransaction.length > 0) ? purchaseTransaction.map((item) => (
          <div className="transaction-content-card">
            <div className="transaction-description">
              <div className="transaction-details">
                <div className='details-content'>
                  <p className='danger capitalize'>
                    <span className='details-content-id'>Buyer ID: { item.Buy_user_own_id }
                    </span>
                  </p>
                </div>
              </div>
              <div className="transaction-amount">
                <span className={ item.type === 'Purchased' ? 'success' : 'danger' }>
                  ₹{ item.productCost ?? 0 }
                </span>
              </div>
            </div>
            <div className="transaction-label">
              <span className='date'>
                { dateFormatter(item.Puchased_time, format.monthName) }
              </span>
            </div>
          </div>
        )) : <p>No Product Purchase</p>
      }
    </>
  )
}

export {
  TransactionCard,
  AllTransactionCard,
  ProductTransactionCard,
  MyProductTransactionCard
}