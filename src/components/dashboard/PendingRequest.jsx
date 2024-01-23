import React, { useEffect, useState } from 'react'
import '../../styles/innerScreen/styles.css'
import { allpendingrequest } from '../../api/admin';
import { dateFormatter, format } from '../../utils/date';
import { updateUserStatusActive, generateMonthlyIncome, updateUserStatusDead } from '../../api/admin/index'
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import { getUser } from '../../utils/localStorage';

const PendingRequest = () => {
  const [selectedOption, setSelectedOption] = useState({});
  const [pendingData, setPendingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [innerLoader, setInnerLoader] = useState(false);
  const { role } = getUser();

  const handleRequestStatus = async (userId, status) => {
    setSelectedOption((prevOptions) => ({
      ...prevOptions,
      [userId]: status
    }));

    status === 'Active' ? updateUserStatusActive({ userId, status }) : updateUserStatusDead({ userId, status });
    await getAllPendingRequests();
  };

  // Pending Enrollment Request
  const getAllPendingRequests = async () => {
    setIsLoading(true);
    try {
      const pendingRequest = await allpendingrequest();
      setPendingData(pendingRequest.user);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    } finally {
      setIsLoading(false);
    }
  }

  // Monthly Income
  const getMonthlyIncome = async () => {
    setInnerLoader(true);
    try {
      const response = await generateMonthlyIncome();
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.data?.message || 'Error while fetching data!');
    } finally {
      setInnerLoader(false);
    }
  }

  useEffect(() => {
    if (role === 'admin') {
      getAllPendingRequests();
    }
  }, [role]);

  return (
    <>
      <div className='header-wrapper' style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
        <h1 className='main-title'>
          Pending Requests ({pendingData?.length})
        </h1>
        <button className='income-details-btn' title='Click to Generate Income' onClick={ getMonthlyIncome }>
          { innerLoader ? <Loader height={ '40px' } width={ '100px' } colour={ '#ffffff' } /> : 'Generate Income' }
        </button>
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
                      <th>Joined</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      pendingData.length > 0 ? (
                        pendingData.map((item, index) => (
                          <tr key={ index }>
                            <td>{ item.name }</td>
                            <td>{ item.own_id }</td>
                            <td>{ dateFormatter(item.createdAt, format.monthName) }</td>
                            <td>
                              <select
                                className='income-range'
                                id={ `statusSelector-${item.own_id}` }
                                onChange={ (e) => handleRequestStatus(item._id, e.target.value) }
                                value={ selectedOption[item._id] || '' }
                              >
                                <option value=''>Change Status</option>
                                <option value='Active'>Active</option>
                                <option value='Dead'>Dead</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" key={1}>
                            No Data
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </>
          ) }
      </div>
    </>
  )
}

export default PendingRequest