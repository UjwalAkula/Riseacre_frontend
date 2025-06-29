import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Viewphone = ({ property, setShowphone }) => {
  const phoneno = property.listerPhoneNumber || 'Not Available';

  return (
    <div className="w-64 sm:w-72 border border-gray-300 text-base p-4 rounded-xl shadow-lg bg-white relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => setShowphone(false)}
      >
        <FontAwesomeIcon icon={faXmark} size="lg" />
      </button>
      <h3 className="text-lg font-semibold text-gray-800 mt-4">Phone number</h3>
      <p className="text-lg font-medium text-gray-700 mt-2">{phoneno}</p>
    </div>
  );
};

export default Viewphone;
