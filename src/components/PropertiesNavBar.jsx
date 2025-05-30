import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../data/Apipath';
import { Link } from 'react-router-dom';
import { usePropertyContext } from './contexts/Context';
import './PropertiesNavBarStyle.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import{
  handleShowUser
} from  '../../Redux/AppSlice';


const PropertiesNavBar = () => {

  const dispatch = useDispatch();

  const {showUser}=useSelector((state)=>state.app);

  const location = useLocation();  // Get the current location
  // Check if we are on the /postProperty page
  const isPostPropertyPage = location.pathname === '/postProperty';

  const showPostPropertyBtn=useSelector((state)=>state.app.showPostPropertyBtn);

  return (
    <div className='navbar-section'>
      <div className="left-box">
        Riseacre<span style={{ fontSize: '1.2rem' }}>.in</span>
      </div>
      <div className="right-box">
        {!isPostPropertyPage && <Link to={'/postProperty'} className='link'>
          <div className="posting-btn" >
            <b>Post property</b> <div className="free" style={{border:'0.1rem solid #049804'}}>FREE</div>
          </div>
        </Link>}
        <div className="user-icon" onClick={()=>dispatch(handleShowUser(showUser))}>
          <FontAwesomeIcon icon={faUser} size="sm" style={{ color: "#055CB4" }} />
        </div>
      </div>
    </div>
  )
}

export default PropertiesNavBar
