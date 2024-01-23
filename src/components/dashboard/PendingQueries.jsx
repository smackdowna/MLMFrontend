import React, { useState, useEffect } from 'react'
import { getAllTickets, updateTicketStatus } from '../../api/admin/index'
import { toast } from 'react-toastify'
import { getUser } from '../../utils/localStorage'
import Loader from '../common/Loader'

const PendingQueries = () => {
  const [selectedQuery, setSelectedQuery] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticketCount, setTicketCount] = useState(0);
  const { role } = getUser();

  const handleQueryStatus = async (userId, status) => {
    setSelectedQuery((prevQuery) => ({
      ...prevQuery,
      [userId]: status
    }))

    status && updateTicketStatus({ userId, status })
    await getAllQueryRequests();
  }

  // Tickets Request
  const getAllQueryRequests = async () => {
    setIsLoading(true);
    try {
      const allTickets = await getAllTickets();
      setTicketsData(allTickets.ticket);
      setTicketCount(allTickets.ticketCount)
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching query data!');
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (role === 'admin') {
      getAllQueryRequests();
    }
  }, [role]);

  return (
    <>
      <div className='header-wrapper' style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
        <h1 className='main-title'>
          Raised Queries ({ ticketCount })
        </h1>
      </div>
      <div className="content-wrapper">
        {
          isLoading ? <Loader /> : (
            <>
              <div className="description-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Mobile No.</th>
                      <th>Issue</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      ticketsData.length > 0 ? (
                        ticketsData.map((item, index) => (
                          <tr key={ index }>
                            <td>{ item.name }</td>
                            <td>{ item.own_id }</td>
                            <td>{ item.issue }</td>
                            <td>
                              <select
                                className='income-range'
                                id={ `statusSelector-${item.own_id}` }
                                onChange={ (e) => handleQueryStatus(item._id, e.target.value) }
                                value={ selectedQuery[item._id] || '' }
                              >
                                <option value=''>Change Status</option>
                                <option value='Solved'>Solved</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" key={ 1 }>
                            No Data
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

export default PendingQueries