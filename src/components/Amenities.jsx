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
  faSoap, faExclamationTriangle, faGasPump, faFire, faHamburger, faHome,
  faTree, faTshirt, faBook  // Added icons for Park, Laundry Service, and Library
} from '@fortawesome/free-solid-svg-icons'; 

const amenityIcons = {
  'Swimming Pool': faSwimmingPool,
  'Gym': faDumbbell,
  'Park': faTree, // Updated icon
  'Parking': faParking,
  'Lift': faElevator, // Added icon for Lift
  'Power Backup': faBolt,
  'Air Conditioning': faFan,
  'Central Heating': faSun,
  'Water Supply': faTint,
  'Intercom': faPhoneAlt,
  'Pet-Friendly': faPaw,
  'Clubhouse': faBuilding,
  'Banquet Hall': faCogs,
  'Community Hall': faUsersCog,
  'Guest Room': faBed,
  'Laundry Service': faTshirt, // Updated icon
  'Modular Kitchen': faUtensils,
  'Walk-in Closet': faBox,
  'Retail Shops': faStore,
  'ATM': faUniversity,
  'Business Center': faBriefcase,
  'Conference Room': faBuilding,
  'Multi-Purpose Hall': faUsers,
  'Tennis Court': faTableTennis,
  'Basketball Court': faBasketballBall,
  'Jogging Track': faRunning,
  'Yoga Center': faChild,
  '24/7 Security': faShieldAlt,
  'CCTV Surveillance': faVideoCamera,
  'Fire Safety Systems': faFireExtinguisher,
  'Security Alarm': faExclamationTriangle,
  'Smart Home Features': faHome,
  'Solar Panels': faSolarPanel,
  'Rain Water Harvesting': faCloudRain,
  'Gas Pipeline': faGasPump,
  'Vastu Compliant': faLandmark,
  'Sauna': faHotTub,
  'Barbecue Area': faFire,
  'Library': faBook, // Added icon for Library
  'Terrace Garden': faLeaf,
  'Cycling Track': faBicycle,
  'Helipad': faHelicopter
};

const Amenities = ({ property }) => {
  return (
    <div className="AmenitiesGrid">
      {property.amenities.map((item, index) => (
        <div className="feature" key={index}>
          <div className="feature-icon">
            {amenityIcons[item] && <FontAwesomeIcon icon={amenityIcons[item]} size="2xl" style={{ color: "#858585" }} />}
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