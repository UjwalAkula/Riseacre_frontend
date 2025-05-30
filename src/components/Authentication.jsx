import React from 'react'
import UserSignIn from './forms/UserSignIn'
import UserSignUp from './forms/UserSignUp'
import { useSelector } from 'react-redux'

const Authentication = () => {

  const {showSignUp}=useSelector((state)=>state.app);
  return (
    <div className='auth-container'>
      { !showSignUp && <UserSignIn/>}
      {showSignUp && <UserSignUp/>}
    </div>
  )
}

export default Authentication
