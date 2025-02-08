import React, { useState, useEffect } from 'react';
import UserLogin from './forms/UserLogin';
import UserSignUp from './forms/UserSignUp';
import UserSignIn from './forms/UserSignIn';
import Properties from './Properties';
import HomePage from './HomePage';

const Landingpage = () => {
  const [showHomePage, setShowHomePage] = useState(true);

  return (
    <div className='landing-section'>
      <div className="auth-section">
        {/*<UserLogin />*/}
        {/*<UserSignUp />*/}
        {/*<UserSignIn />*/}
      </div>
      <div className="main-section">
        {showHomePage && (
          <HomePage />
        )}
      </div>
    </div>
  );
};

export default Landingpage;
