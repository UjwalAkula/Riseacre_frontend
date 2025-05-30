import React,{useState,useEffect} from 'react'
import { API_URL } from '../data/Apipath'
import './UserActivityStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faHeart,faHouseLaptop, faArrowRightToBracket, faCircleLeft, faCircleXmark, faXmark} from '@fortawesome/free-solid-svg-icons';
import { useDispatch,useSelector } from 'react-redux';
import { handleShowUser,handleshowAuth,handleSignOut } from '../../Redux/AppSlice';


const UserActivity = () => {

  const dispatch=useDispatch();
  const {showUser,showAuth,loggedIn}=useSelector((state)=>state.app);

  const [user,setUser]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [email,setEmail]=useState('');

  const userinfo=async()=>{
    const userId=localStorage.getItem('userId');
    try{
      const response=await fetch(`${API_URL}/user/get-user/${userId}`);

      const data=await response.json();
      if(response.ok){
        setUser(data.user.userName);
        setPhoneNumber(data.user.phoneNumber);
        setEmail(data.user.userEmail);
      }else{
        console.log("Error fetching user info");
      }

    }catch(error){
      console.error(error);
      console.log("Error fetching user info");
    }
  };

  useEffect(() => {
    userinfo();
  }, [])

  return (
    <div className='user-activity-container'>
      <div className="user-activity-section">
        <div className="close-btn-section">
          <div className="close-btn">
            <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#a6a6a6",}} onClick={()=> dispatch(handleShowUser(showUser))}/>
          </div>
          <h2>Riseacre</h2>
        </div>
        <div className="user-info-section">
          <span>User : </span> {user}<br/>
          <span>Phone Number : </span> {phoneNumber}<br/>
          <span>E-mail : </span> {email}<br/>
        </div>

        <div className="my-activity-container">
          <h3>My Activity</h3>
          <div className="my-activity-btn-section">

            <div className="activity-btn">
              <div className="activity-icon">
                <FontAwesomeIcon icon={faPhone} size="lg" style={{ color: '#055CB4' }} />
              </div>
              Contacted <br/> Properties
            </div>

            <div className="activity-btn">
              <div className="activity-icon">
                <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: '#055CB4' }} />
              </div>
              Saved <br/> Properties
            </div>

            <div className="activity-btn">
              <div className="activity-icon">
                <FontAwesomeIcon icon={faHouseLaptop} size="lg" style={{ color: '#055CB4' }} />
              </div>
              Listed <br/> Properties
            </div>

          </div>
        </div>

        <div className="activity-properties-container">
            will update soon...
        </div>

        {!loggedIn && <div className="log-btn-section" onClick={()=>dispatch(handleshowAuth(showAuth))}>
          <div className="log-icon" >
            <FontAwesomeIcon icon={faArrowRightToBracket} size="lg" style={{ color: '#055CB4' }} />
          </div>
          Log In
        </div>}

        {loggedIn && <div className="log-btn-section" onClick={()=>dispatch(handleSignOut())}>
          <div className="log-icon">
            <FontAwesomeIcon icon={faCircleLeft} size="lg" style={{ color: '#055CB4' }} />
          </div>
          Log Out
        </div>}
         
      </div>
    </div>
  )
}

export default UserActivity
