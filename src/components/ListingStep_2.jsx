import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowStep_1, handleShowStep_3 } from '../../Redux/PostingSlice';
import {
  setAmenities,
  setConnectivity,
  setBalcony,
  setBedrooms,
  setBathrooms,
  setHalls,
  setExpectedPrice,
  setMonthlyRent,
  setPriceNegotiable,
  setMaintenanceCharges,
  setBookingAmount,
  setDescription,
} from '../../Redux/ListingSlice';

const ListingStep_2 = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const {
    amenities,
    connectivity,
    balcony,
    bedrooms,
    bathrooms,
    halls,
    expectedPrice,
    monthlyRent,
    priceNegotiable,
    maintenanceCharges,
    bookingAmount,
    description,
    purpose,
  } = useSelector((state) => state.listing);

  const amenityOptions = [
    'Swimming Pool', 'Gym', 'Park', 'Lift', 'Power Backup', 'Parking', 'Air Conditioning',
    'Central Heating', 'Water Supply', 'Intercom', 'Pet-Friendly', 'Clubhouse', 'Banquet Hall',
    'Community Hall', 'Guest Room', 'Laundry Service', 'Modular Kitchen', 'Walk-in Closet',
    'Retail Shops', 'ATM', 'Business Center', 'Conference Room', 'Multi-Purpose Hall',
    'Tennis Court', 'Basketball Court', 'Jogging Track', 'Yoga Center', '24/7 Security',
    'CCTV Surveillance', 'Fire Safety Systems', 'Security Alarm', 'Smart Home Features',
    'Solar Panels', 'Rain Water Harvesting', 'Gas Pipeline', 'Vastu Compliant', 'Sauna',
    'Barbecue Area', 'Library', 'Terrace Garden', 'Cycling Track', 'Helipad',
  ];

  const validateForm = () => {
    const newErrors = {};
    if (amenities.length === 0) newErrors.amenities = 'At least one amenity is required';
    if (purpose === 'Sell' && (!expectedPrice || expectedPrice <= 0)) 
      newErrors.expectedPrice = 'Valid expected price is required for sale';
    if (purpose === 'Lease' && (!monthlyRent || monthlyRent <= 0)) 
      newErrors.monthlyRent = 'Valid monthly rent is required for lease';
    if (bedrooms === null) newErrors.bedrooms = 'Number of bedrooms is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) dispatch(handleShowStep_3());
  };

  const handleMultiSelectChange = (e) => {
    const value = e.target.value;
    const newAmenities = e.target.checked
      ? [...amenities, value]
      : amenities.filter((item) => item !== value);
    dispatch(setAmenities(newAmenities));
  };

  return (
    <div className="flex justify-center w-full py-4 px-4 sm:py-6 md:py-10">
      <div className="w-full max-w-4xl bg-white rounded-lg  px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 text-center sm:text-left">
          Property Features & Pricing
        </h3>

        {/* Amenities Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base sm:text-lg mb-3">Amenities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
            {amenityOptions.map((amenity, index) => (
              <label key={index} className="flex items-center gap-2 text-sm sm:text-base p-1 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  value={amenity}
                  checked={amenities.includes(amenity)}
                  onChange={handleMultiSelectChange}
                  className="flex-shrink-0 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
          {errors.amenities && <p className="text-red-600 text-sm mt-2">{errors.amenities}</p>}
        </div>

        {/* Connectivity Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-base sm:text-lg mb-3">Connectivity (in km)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {['metro', 'airport', 'busStation', 'railwayStation', 'school', 'hospital'].map((key) => (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={connectivity[key] || ''}
                  onChange={(e) =>
                    dispatch(
                      setConnectivity({
                        ...connectivity,
                        [key]: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    )
                  }
                  placeholder="Distance"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Balcony */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 text-sm sm:text-base">Balcony</label>
            <select
              value={balcony ? 'Yes' : 'No'}
              onChange={(e) => dispatch(setBalcony(e.target.value === 'Yes'))}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* Room Details */}
          {[
            { label: 'Bedrooms', value: bedrooms, action: setBedrooms, key: 'bedrooms' },
            { label: 'Bathrooms', value: bathrooms, action: setBathrooms },
            { label: 'Halls', value: halls, action: setHalls }
          ].map(({ label, value, action, key }) => (
            <div key={label} className="space-y-2">
              <label className="block font-medium text-gray-700 text-sm sm:text-base">
                No. of {label}
              </label>
              <select
                value={value || ''}
                onChange={(e) => dispatch(action(e.target.value ? parseInt(e.target.value) : null))}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              {errors[key || label.toLowerCase()] && (
                <p className="text-red-600 text-xs sm:text-sm">{errors[key || label.toLowerCase()]}</p>
              )}
            </div>
          ))}

          {/* Price Negotiable */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-700 text-sm sm:text-base">Price Negotiable</label>
            <select
              value={priceNegotiable ? 'Yes' : 'No'}
              onChange={(e) => dispatch(setPriceNegotiable(e.target.value === 'Yes'))}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>

        {/* Price Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { label: 'Expected Price', value: expectedPrice, action: setExpectedPrice },
            { label: 'Monthly Rent', value: monthlyRent, action: setMonthlyRent }
          ].map(({ label, value, action }) => (
            <div key={label} className="space-y-2">
              <label className="block font-medium text-gray-700 text-sm sm:text-base">{label}</label>
              <input
                type="number"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                value={value || ''}
                onChange={(e) => dispatch(action(e.target.value ? parseInt(e.target.value) : null))}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              {errors[label.toLowerCase().replace(' ', '')] && (
                <p className="text-red-600 text-xs sm:text-sm">{errors[label.toLowerCase().replace(' ', '')]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            { label: 'Maintenance Charges', value: maintenanceCharges, action: setMaintenanceCharges },
            { label: 'Booking Amount', value: bookingAmount, action: setBookingAmount }
          ].map(({ label, value, action }) => (
            <div key={label} className="space-y-2">
              <label className="block font-medium text-gray-700 text-sm sm:text-base">
                {label} <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                value={value || ''}
                onChange={(e) => dispatch(action(e.target.value ? parseInt(e.target.value) : null))}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm sm:text-base">Description</label>
          <textarea
            rows={4}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
            value={description || ''}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            placeholder="Enter a brief description of your property..."
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={() => dispatch(handleShowStep_1())}
            className="w-full sm:w-auto px-6 py-3 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-md text-sm font-medium transition-colors duration-200 order-2 sm:order-1"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 bg-blue-800 hover:bg-blue-900 active:bg-blue-950 text-white rounded-md text-sm font-medium transition-colors duration-200 order-1 sm:order-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStep_2;