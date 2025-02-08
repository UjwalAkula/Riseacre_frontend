import React from 'react';
import './PropertyStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus,faHome,faShieldAlt,faCircleExclamation} from '@fortawesome/free-solid-svg-icons';

const ListerandEngage = ({ property }) => {
  // Masking phone number partially for privacy
  const maskedPhone = property.listerPhoneNumber
    ? property.listerPhoneNumber.toString().replace(/(\d{4})(\d{4})(\d{4})/, '$1XXXXXX$3')
    : 'N/A';

  return (
    <>
    <div className="Lister-engagement">
      <div className="lister-details">
        <div className="lister-item">
          <strong>Lister Type :</strong> {property.listerType || 'N/A'}
        </div>
        <div className="lister-item">
          <strong>Name :</strong> {property.listerName || 'N/A'}
        </div>
        <div className="lister-item">
          <strong>Phone Number :</strong> {maskedPhone || 'N/A'}
        </div>
        {property.builderCompany && (
          <div className="lister-item">
            <strong>Builder Company :</strong> {property.builderCompany}
          </div>
        )}
      </div>
    </div>
    <div className="rating-section">
    <h3>Ratings based on features <FontAwesomeIcon icon={faCircleExclamation} size="sm" style={{color: "#919191",}} /></h3>
    <div className="rating-icons">
      <div className="rating">
        <span className='rate-icon'><FontAwesomeIcon icon={faBus} size="2xl" style={{ color: "#055CB4" }} /></span>
        <span className='rate-value'>{property.connectivityRating}/5</span>
        <span>Connectivity</span>
      </div>
      <div className="rating">
        <span className='rate-icon'><FontAwesomeIcon icon={faHome} size="2xl" style={{ color: "#055CB4" }} /></span>
        <span className='rate-value'>{property.livabilityRating}/5</span>
        <span>Livability</span>
      </div>
      <div className="rating">
        <span className='rate-icon'><FontAwesomeIcon icon={faShieldAlt} size="2xl" style={{ color: "#055CB4" }} /></span>
        <span className='rate-value'>{property.safetyRating}/5</span>
        <span>Safety</span>
      </div>
    </div>
  </div>
  </>
  );
};

export default ListerandEngage;
