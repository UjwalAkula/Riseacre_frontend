import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBus,
  faHome,
  faShieldAlt,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';

const ListerandEngage = ({ property }) => {
  const maskedPhone = property.listerPhoneNumber
    ? property.listerPhoneNumber.toString().replace(/(\d{4})(\d{4})(\d{4})/, '$1XXXXXX$3')
    : 'N/A';

  return (
    <>
      {/* Lister Details */}
      <div className="p-3 sm:p-6 bg-white rounded-md shadow mb-4 sm:mb-6">
        <div className="space-y-2 sm:space-y-2 text-gray-700 text-sm sm:text-base font-medium">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <strong className="text-gray-800 text-sm sm:text-base min-w-0 sm:min-w-[140px]">
              Lister Type :
            </strong> 
            <span className="mt-1 sm:mt-0 sm:ml-2">{property.listerType || 'N/A'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <strong className="text-gray-800 text-sm sm:text-base min-w-0 sm:min-w-[140px]">
              Name :
            </strong> 
            <span className="mt-1 sm:mt-0 sm:ml-2">{property.listerName || 'N/A'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <strong className="text-gray-800 text-sm sm:text-base min-w-0 sm:min-w-[140px]">
              Phone Number :
            </strong> 
            <span className="mt-1 sm:mt-0 sm:ml-2">{maskedPhone}</span>
          </div>
          {property.builderCompany && (
            <div className="flex flex-col sm:flex-row sm:items-center">
              <strong className="text-gray-800 text-sm sm:text-base min-w-0 sm:min-w-[140px]">
                Builder Company :
              </strong> 
              <span className="mt-1 sm:mt-0 sm:ml-2">{property.builderCompany}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ratings Section */}
      <div className="bg-white rounded-md shadow p-3 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
          <span>Ratings based on features</span>
          <FontAwesomeIcon icon={faCircleExclamation} className="text-gray-400 text-sm" />
        </h3>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          {[
            { icon: faBus, label: 'Connectivity', rating: property.connectivityRating },
            { icon: faHome, label: 'Livability', rating: property.livabilityRating },
            { icon: faShieldAlt, label: 'Safety', rating: property.safetyRating },
          ].map(({ icon, label, rating }) => (
            <div key={label} className="flex items-center sm:flex-col sm:items-center space-x-3 sm:space-x-0 sm:space-y-2 flex-1 p-2 sm:p-0">
              <div className="p-2 sm:p-3 rounded-full border border-gray-300 flex-shrink-0">
                <FontAwesomeIcon icon={icon} className="text-blue-600 text-lg sm:text-2xl" />
              </div>
              <div className="flex flex-col sm:items-center">
                <div className="text-base sm:text-lg font-semibold text-gray-800">{rating}/5</div>
                <div className="text-xs sm:text-sm text-gray-600">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListerandEngage;