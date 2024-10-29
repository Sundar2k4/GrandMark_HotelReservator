import React from 'react'
import { UserContext } from '../UserContext'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AccountPage = () => {
  const {user,ready} = useContext(UserContext);

  if(!ready)
  {
    return <div>Loading...</div>
  }

  if(ready && !user)//the ready is obtained from the usercontext.jsx to avoid the pagen reload taking back to login
  {//due to the user variable not initialized yet so ready acts as an extra condition.
    return <Navigate to={'/login'} />
  }
  return (
    <div>
      Account page for {user.name}
    </div>
  )
}

export default AccountPage
