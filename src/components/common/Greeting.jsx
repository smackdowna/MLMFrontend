import React from 'react';
import '../../styles/dashboard.css';

const Greeting = (props) => {
  return (
    <div className="user-greeting">
      <div className="user">
        <p>Hi,</p>
        <p style={{textTransform: 'capitalize'}}>{props.name}</p>
      </div>
    </div>
  )
}

export default Greeting