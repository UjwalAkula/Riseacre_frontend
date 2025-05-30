import React from 'react';
import HomeNavBar from './HomeNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Authentication from './Authentication';
import UserActivity from './UserActivity';

const HomePage = () => {

    const dispatch = useDispatch();
  
    const page_location=useLocation();

    const {showUser,showAuth}=useSelector((state)=>state.app);

    const isHomePage=page_location.pathname===`/`;

  return (
    <div className='home-section'>
      {showAuth &&  isHomePage && <Authentication/>}
      { showUser &&  isHomePage &&<div className="user-page"><UserActivity/></div>}
      <HomeNavBar  />
    </div>
  );
};

export default HomePage;
