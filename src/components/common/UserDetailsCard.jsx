import React from 'react'
import { dateFormatter, format } from '../../utils/date';
import '../../styles/innerScreen/styles.css'

const UserDetailsCard = ({user}) => {

  return (
    <div className='user-card-container'>
      <p>Name: <span>{user.name}</span></p>
      <p>Registration Date: <span>{dateFormatter(user.createdAt, format.monthName)}</span></p>
      <p>Sponsor Id: <span>{user.sponsor_id}</span></p>
      <p>Left Count: <span>{user.TotalLeftCount}</span></p>
      <p>Right Count: <span>{user.TotalRightCount}</span></p>
      <p>Total Active Direct: <span>{user.total_direct_refral}</span></p>
    </div>
  )
}

export default UserDetailsCard