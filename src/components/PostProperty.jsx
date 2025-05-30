import React, { useEffect } from 'react'
import './PostPropertyStyles.css'
import ListingStep_1 from './ListingStep_1'
import ListingStep_2 from './ListingStep_2'
import ListingStep_3 from './ListingStep_3'
import { useSelector,useDispatch } from 'react-redux';
import PropertiesNavBar from './PropertiesNavBar';
import UserActivity from './UserActivity'
import { useLocation } from 'react-router-dom'
import Authentication from './Authentication'
import { handleLoggedIn, handleshowAuth } from '../../Redux/AppSlice'


const PostProperty = () => {

  const dispatch=useDispatch();

  const page_location=useLocation();

  const {showUser,showAuth ,loggedIn}=useSelector((state)=>state.app);

  const showStep_1=useSelector((state)=>state.posting.showStep_1);
  const showStep_2=useSelector((state)=>state.posting.showStep_2);
  const showStep_3=useSelector((state)=>state.posting.showStep_3);

  const isPostPropertyPage =page_location.pathname === '/postProperty';

  if (localStorage.getItem('token')) {
    dispatch(handleLoggedIn(false));
  }

  return (
    <div className='postPropery-container'>
      {!loggedIn && isPostPropertyPage && <Authentication/>}
      {showAuth && isPostPropertyPage && <Authentication/>}
      { showUser && isPostPropertyPage  &&<div className="user-page">
        <UserActivity/>
      </div>}
      <PropertiesNavBar />
      <div className="postProperty-section">
        <div className="our-ad">
          <h3>Sell or Rent your  property <br/><span style={{color:'#055CB4'}}>online faster</span> in riseacre.in</h3>
          <div className="ad-imgs">
            <img src='/house-image.png' className='house-img'/>
          </div>
          <h4>Post your property in 3 simple steps</h4>
          <ul>
            <li>Basic Info</li>
            <li>add Features </li>
            <li>add Pricing & Photos</li>
          </ul>
        </div>
        <div className="steps-section">
          {showStep_1 && <ListingStep_1/>}
          {showStep_2 && <ListingStep_2/>}
          {showStep_3 && <ListingStep_3/>}
        </div>
      </div>
    </div>
  )
}

export default PostProperty
