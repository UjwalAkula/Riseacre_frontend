import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPlane,
  faTrain,
  faSubway,
  faBus,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons';

const Connectivity = ({ property }) => {
  const { locality, city, state, PINcode, nearbyLandmarks, connectivity = {} } = property || {};

  return (
    <div className="p-3 sm:p-6 space-y-3 sm:space-y-4 bg-white rounded-lg shadow">
      <div>
        <div className="font-medium text-blue-700 text-sm sm:text-base">Nearby Landmarks:</div>
        <p className="text-gray-700 text-sm sm:text-base mt-1">{nearbyLandmarks}</p>
      </div>
      
      <div className="flex items-start sm:items-center space-x-2">
        <FontAwesomeIcon 
          icon={faMapMarkerAlt} 
          className="text-blue-600 text-sm sm:text-base mt-1 sm:mt-0 flex-shrink-0" 
        />
        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {locality}, {city}, {state}, {PINcode}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
        {[
          { label: 'Metro', icon: faSubway, value: connectivity.metro },
          { label: 'Airport', icon: faPlane, value: connectivity.airport },
          { label: 'Railway Station', icon: faTrain, value: connectivity.railwayStation },
          { label: 'Bus Station', icon: faBus, value: connectivity.busStation },
        ].map(({ label, icon, value }) => (
          <div key={label} className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg">
            <FontAwesomeIcon 
              icon={icon} 
              className="text-blue-600 text-lg sm:text-xl flex-shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <div className="text-gray-600 text-xs sm:text-sm">{label}</div>
              <div className="font-semibold text-sm sm:text-base truncate">
                {value != null ? `${value} km` : 'N/A'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connectivity;