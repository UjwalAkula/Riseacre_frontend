
import React from 'react'
import {useState} from 'react';
import './PropertyStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faHeart,faHouseLaptop, faArrowRightToBracket, faCircleLeft, faCircleXmark, faXmark} from '@fortawesome/free-solid-svg-icons';


const Viewphone = ({property,setShowphone}) => {

  const phoneno= property.listerPhoneNumber || "Not Available";

  return (
    <div className='vp-section'>
      <span className='cross-btn'><FontAwesomeIcon icon={faXmark} size="xl" style={{color: "#a6a6a6",}} onClick={()=> setShowphone(false)}/></span>
      <h3>Phone number</h3>
      <p className='phone-number'>{phoneno}</p>
    </div>
  )
}

export default Viewphone
