import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSwimmingPool,
  faDumbbell,
  faTree,
  faParking,
  faElevator,
  faBolt,
  faFan,
  faSun,
  faTint,
  faPhoneAlt,
  faPaw,
  faBuilding,
  faCogs,
  faBed,
  faTshirt,
  faUtensils,
  faBox,
  faStore,
  faUniversity,
  faBriefcase,
  faUsersCog,
  faTableTennis,
  faBasketballBall,
  faRunning,
  faChild,
  faShieldAlt,
  faVideoCamera,
  faFireExtinguisher,
  faExclamationTriangle,
  faHome,
  faSolarPanel,
  faCloudRain,
  faGasPump,
  faLandmark,
  faHotTub,
  faFire,
  faBook,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';

const amenityIcons = {
  'Swimming Pool': faSwimmingPool,
  Gym: faDumbbell,
  Park: faTree,
  Parking: faParking,
  Lift: faElevator,
  'Power Backup': faBolt,
  'Air Conditioning': faFan,
  'Central Heating': faSun,
  'Water Supply': faTint,
  Intercom: faPhoneAlt,
  'Pet-Friendly': faPaw,
  Clubhouse: faBuilding,
  'Banquet Hall': faCogs,
  'Community Hall': faUsersCog,
  'Guest Room': faBed,
  'Laundry Service': faTshirt,
  'Modular Kitchen': faUtensils,
  'Walk-in Closet': faBox,
  'Retail Shops': faStore,
  ATM: faUniversity,
  'Business Center': faBriefcase,
  'Conference Room': faBuilding,
  'Multi-Purpose Hall': faUsersCog,
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
  Sauna: faHotTub,
  'Barbecue Area': faFire,
  Library: faBook,
  'Terrace Garden': faTree,
  'Cycling Track': faRunning,
  Helipad: faLandmark,
  Wifi: faWifi,
};

const Amenities = ({ property }) => {
  const list = Array.isArray(property?.amenities) ? property.amenities : [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 p-3 sm:p-6 bg-white rounded-lg shadow">
      {list.map((item, idx) => (
        <div key={`${item}-${idx}`} className="flex flex-col items-center p-2 sm:p-4 border rounded-md min-h-[80px] sm:min-h-[100px]">
          <FontAwesomeIcon 
            icon={amenityIcons[item] || faHome} 
            className="text-gray-600 text-lg sm:text-2xl mb-1 sm:mb-2 flex-shrink-0" 
          />
          <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Amenities;