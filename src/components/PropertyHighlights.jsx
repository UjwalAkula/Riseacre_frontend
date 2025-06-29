import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faRulerCombined,
  faBed,
  faBath,
  faCouch,
  faBuilding,
  faDoorOpen,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

const PropertyHighlights = ({ property }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-3 sm:px-4 py-6 sm:py-8">
      {/* Highlight Item */}
      {[
        {
          icon: faHouse,
          label: 'BHK Configuration',
          value: property.bhkConfiguration?.join('/') || 'N/A',
        },
        {
          icon: faRulerCombined,
          label: 'Carpet Area',
          value: `${property.carpetArea || 'N/A'} sq. ft.`,
        },
        {
          icon: faRulerCombined,
          label: 'Built-up Area',
          value: `${property.buildupArea || 'N/A'} sq. ft.`,
        },
        {
          icon: faBed,
          label: 'Bedrooms',
          value: property.noOfBedrooms ?? 'N/A',
        },
        {
          icon: faBath,
          label: 'Bathrooms',
          value: property.noOfBathrooms ?? 'N/A',
        },
        {
          icon: faCouch,
          label: 'Halls',
          value: property.noOfHalls ?? 'N/A',
        },
        {
          icon: faDoorOpen,
          label: 'Balcony',
          value: property.balcony ? 'Yes' : 'No',
        },
        {
          icon: faBuilding,
          label: 'Floor Details',
          value:
            property.floorNumber && property.totalFloors
              ? `${property.floorNumber} of ${property.totalFloors} floors`
              : 'N/A',
        },
        {
          icon: faCalendarAlt,
          label: 'Property Age',
          value: property.propertyAge ? `${property.propertyAge} years old` : 'N/A',
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border border-gray-400 rounded px-3 py-3 sm:px-4 sm:py-2 w-full h-20 sm:h-28 lg:h-auto lg:max-w-xs"
        >
          <div className="text-blue-600 flex-shrink-0">
            <FontAwesomeIcon icon={item.icon} size="lg" className="text-lg sm:text-xl" />
          </div>
          <div className="flex flex-col items-center w-4/5 text-center gap-1">
            <span className="text-gray-600 text-xs sm:text-sm font-medium leading-tight">
              {item.label}
            </span>
            <span className="text-black font-semibold text-sm sm:text-base leading-tight">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyHighlights;