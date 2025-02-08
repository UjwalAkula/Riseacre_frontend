import React from 'react';
import './PropertyStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSwimmingPool, faDumbbell, faParking, faElevator, faWifi, faBolt, 
  faFan, faSun, faShieldAlt, faVideoCamera, faFireExtinguisher, faTint, 
  faPhoneAlt, faPaw, faBuilding, faChild, faCloudRain, faCogs, faRunning, 
  faLeaf, faStore, faUniversity, faUsers, faBriefcase, faHotTub, faBell, 
  faSolarPanel, faUtensils, faBox, faBed, faUsersCog, faTableTennis, 
  faBasketballBall, faBicycle, faHelicopter, faMapMarkerAlt, faLandmark, 
  faSoap, faExclamationTriangle, faGasPump, faFire, faHamburger, faHome  // Updated import
} from '@fortawesome/free-solid-svg-icons'; 

const Amenities = ({ property }) => {
  return (
    <div className="AmenitiesGrid">
      {property.amenities.map((item, index) => (
        <div className="feature" key={index}>
          <div className="feature-icon">
            {item === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Gym' && <FontAwesomeIcon icon={faDumbbell} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Parking' && <FontAwesomeIcon icon={faParking} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Elevator' && <FontAwesomeIcon icon={faElevator} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Wi-Fi' && <FontAwesomeIcon icon={faWifi} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Power Backup' && <FontAwesomeIcon icon={faBolt} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Air Conditioning' && <FontAwesomeIcon icon={faFan} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Central Heating' && <FontAwesomeIcon icon={faSun} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Water Supply' && <FontAwesomeIcon icon={faTint} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Intercom' && <FontAwesomeIcon icon={faPhoneAlt} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Pet-Friendly' && <FontAwesomeIcon icon={faPaw} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Clubhouse' && <FontAwesomeIcon icon={faBuilding} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Banquet Hall' && <FontAwesomeIcon icon={faCogs} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Community Hall' && <FontAwesomeIcon icon={faUsersCog} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Guest Room' && <FontAwesomeIcon icon={faBed} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Laundry Service' && <FontAwesomeIcon icon={faSoap} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Modular Kitchen' && <FontAwesomeIcon icon={faUtensils} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Walk-in Closet' && <FontAwesomeIcon icon={faBox} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Retail Shops' && <FontAwesomeIcon icon={faStore} size="2xl" style={{ color: "#858585" }} />}
            {item === 'ATM' && <FontAwesomeIcon icon={faUniversity} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Business Center' && <FontAwesomeIcon icon={faBriefcase} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Conference Room' && <FontAwesomeIcon icon={faBuilding} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Multi-Purpose Hall' && <FontAwesomeIcon icon={faUsers} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Tennis Court' && <FontAwesomeIcon icon={faTableTennis} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Basketball Court' && <FontAwesomeIcon icon={faBasketballBall} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Jogging Track' && <FontAwesomeIcon icon={faRunning} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Yoga Center' && <FontAwesomeIcon icon={faChild} size="2xl" style={{ color: "#858585" }} />}
            {item === '24/7 Security' && <FontAwesomeIcon icon={faShieldAlt} size="2xl" style={{ color: "#858585" }} />}
            {item === 'CCTV Surveillance' && <FontAwesomeIcon icon={faVideoCamera} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Fire Safety Systems' && <FontAwesomeIcon icon={faFireExtinguisher} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Security Alarm' && <FontAwesomeIcon icon={faExclamationTriangle} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Smart Home Features' && <FontAwesomeIcon icon={faHome} size="2xl" style={{ color: "#858585" }} />} {/* Updated icon */}
            {item === 'Solar Panels' && <FontAwesomeIcon icon={faSolarPanel} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Rain Water Harvesting' && <FontAwesomeIcon icon={faCloudRain} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Gas Pipeline' && <FontAwesomeIcon icon={faGasPump} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Vastu Compliant' && <FontAwesomeIcon icon={faLandmark} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Sauna' && <FontAwesomeIcon icon={faHotTub} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Barbecue Area' && <FontAwesomeIcon icon={faFire} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Library' && <FontAwesomeIcon icon={faChild} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Terrace Garden' && <FontAwesomeIcon icon={faLeaf} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Cycling Track' && <FontAwesomeIcon icon={faBicycle} size="2xl" style={{ color: "#858585" }} />}
            {item === 'Helipad' && <FontAwesomeIcon icon={faHelicopter} size="2xl" style={{ color: "#858585" }} />}
          </div>
          <div className="amenity-name">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
