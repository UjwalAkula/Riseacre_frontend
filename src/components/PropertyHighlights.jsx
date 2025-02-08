import React from 'react';
import './PropertyStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRulerCombined, faBed, faBath, faCouch, faBuilding,faDoorOpen, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const PropertyHighlights = ({ property }) => {
  return (
    <div className="property-highlights">
      {/* BHK Configuration */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faHouse} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>BHK Configuration</span>
          <span className="value">{property.bhkConfiguration.join("/")}</span>
        </div>
      </div>

      {/* Carpet Area */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faRulerCombined} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Carpet Area</span>
          <span className="value">{property.carpetArea} sq. ft.</span>
        </div>
      </div>

      {/* Built-up Area */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faRulerCombined} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Built-up Area</span>
          <span className="value">{property.buildupArea} sq. ft.</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faBed} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Bedrooms</span>
          <span className="value">{property.noOfBedrooms ? property.noOfBedrooms : 'N/A'}</span>
        </div>
      </div>

      {/* Bathrooms */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faBath} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Bathrooms</span>
          <span className="value">{property.noOfBathrooms ? property.noOfBathrooms : 'N/A'}</span>
        </div>
      </div>

      {/* Halls */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faCouch} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Halls</span>
          <span className="value">{property.noOfHalls ? property.noOfHalls : 'N/A'}</span>
        </div>
      </div>

      {/* Balcony */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faDoorOpen} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Balcony</span>
          <span className="value">{property.balcony ? "Yes" : "No"}</span>
        </div>
      </div>

      {/* Floor Details */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faBuilding} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Floor Details</span>
          <span className="value">{property.floorNumber && property.totalFloors ? `${property.floorNumber} of ${property.totalFloors} floors` : 'N/A'}</span>
        </div>
      </div>

      {/* Property Age */}
      <div className='highlight-item'>
        <div className="icon-div">
          <FontAwesomeIcon icon={faCalendarAlt} size="lg" style={{ color: "#055CB4" }} />
        </div>
        <div className="info-div">
          <span className='prop'>Property Age</span>
          <span className="value">{property.propertyAge ? `${property.propertyAge} years old` : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyHighlights;
