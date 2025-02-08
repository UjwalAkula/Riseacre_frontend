import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../data/Apipath';
import { Link } from 'react-router-dom';
import { usePropertyContext } from './contexts/Context';
import './PropertiesNavBarStyle.css'

const PropertiesNavBar = () => {
  return (
    <div className='navbar-section'>
      <div className="left-box">
        Riseacre<span style={{ fontSize: '1.2rem' }}>.in</span>
      </div>
      <div className="right-box">
        <div className="posting-btn">
          <b>Post property</b> <div className="free" style={{border:'0.1rem solid #049804'}}>FREE</div>
        </div>
        <div className="user-icon">
          <FontAwesomeIcon icon={faUser} size="sm" style={{ color: "#055CB4" }} />
        </div>
      </div>
    </div>
  )
}

export default PropertiesNavBar
