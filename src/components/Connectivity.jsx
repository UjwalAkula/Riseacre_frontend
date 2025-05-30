import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPlane, faTrain, faSubway, faBus, faLandmark } from '@fortawesome/free-solid-svg-icons';
import './PropertyStyle.css';

const Connectivity = ({ property }) => {
  return (
    <div className='locality-connectivity'>
      <div className='locality'>
        <div className='nearbylandmark'>
          <strong style={{color:'#44659e'}}>Nearby Landmarks :</strong> {property.nearbyLandmarks}.
        </div>
        <div className="prop-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" style={{ color: "#055CB4",paddingRight:'0.6rem'}} /> 
          {property.locality}, {property.city}, {property.state}, {property.PINcode}.
        </div>
      </div>
      <div className="connectivity-container ">
        <div className="location-item highlight-item">
          <div className="icon-div">
            <FontAwesomeIcon icon={faSubway} size="lg" style={{ color: "#055CB4" }} />
          </div>
          <div className="info-div">
            <span className="label prop">Metro</span>
            <span className="value">{property.connectivity.metro} km</span>
          </div>
        </div>

        <div className="location-item highlight-item">
          <div className="icon-div">
            <FontAwesomeIcon icon={faPlane} size="lg" style={{ color: "#055CB4" }} />
          </div>
          <div className="info-div">
            <span className="label prop">Airport</span>
            <span className="value">{property.connectivity.airport} km</span>
          </div>
        </div>

        <div className="location-item highlight-item">
          <div className="icon-div">
            <FontAwesomeIcon icon={faTrain} size="lg" style={{ color: "#055CB4" }} />
          </div>
          <div className="info-div">
            <span className="label prop">Railway Station</span>
            <span className="value">{property.connectivity.railwayStation} km</span>
          </div>
        </div>

        <div className="location-item highlight-item">
          <div className="icon-div">
            <FontAwesomeIcon icon={faBus} size="lg" style={{ color: "#055CB4" }} />
          </div>
          <div className="info-div">
            <span className="label prop">Bus Station</span>
            <span className="value">{property.connectivity.busStation} km</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connectivity;

