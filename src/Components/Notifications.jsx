import React from 'react'
import './Notifications.css'

const Notifications = ({showNot}) => {
   return (
    <>
      {showNot && (
        <div className='notifications'>
          <h2>Updates</h2>
            <h4>Recent</h4>
            <p>No new notifications</p>
        </div>
      )}
    </>
  );
};
export default Notifications