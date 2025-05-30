import React, { useState } from 'react';
import './PostPropertyStyles.css';
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
    if (validateForm()) {
      dispatch(handleShowStep_3());
    }
  };

  const handleMultiSelectChange = (e) => {
    const value = e.target.value;
    const newAmenities = e.target.checked
      ? [...amenities, value]
      : amenities.filter((item) => item !== value);
    dispatch(setAmenities(newAmenities));
    console.log('amenities:',amenities); // Should log an array
  };

  return (
    <div className="propertyFeatures-section">
      <div className="form-details">
        <h3>Property Features & Pricing</h3>

        <div className="amenities-section">
          <h4>Amenities</h4>
          <div className="amenity-grid">
            {amenityOptions.map((amenity, index) => (
              <div className="amenity" key={index}>
                <input
                  type="checkbox"
                  value={amenity}
                  checked={amenities.includes(amenity)}
                  onChange={handleMultiSelectChange}
                />
                <label>{amenity}</label>
              </div>
            ))}
          </div>
          {errors.amenities && <span className="error">{errors.amenities}</span>}
        </div>

        <div className="connectivity-section">
          <h4>Connectivity</h4>
          <div className="connectivity-box">
            {['metro', 'airport', 'busStation', 'railwayStation', 'school', 'hospital'].map((key) => (
              <div className="connectivity-item" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)} (in km)</label>
                <br />
                <input
                  type="number"
                  min="0"
                  value={connectivity[key] || ''}
                  onChange={(e) =>
                    dispatch(
                      setConnectivity({
                        ...connectivity,
                        [key]: e.target.value ? parseFloat(e.target.value) : null,
                      })
                    )
                  }
                  placeholder="Enter distance"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="balcony">
          <label>Balcony</label>
          <br />
          <select
            className="dropdowns"
            value={balcony ? 'Yes' : 'No'}
            onChange={(e) => dispatch(setBalcony(e.target.value === 'Yes'))}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {[
          { label: 'No. of Bedrooms', value: bedrooms, action: setBedrooms },
          { label: 'No. of Bathrooms', value: bathrooms, action: setBathrooms },
          { label: 'No. of Halls', value: halls, action: setHalls },
        ].map(({ label, value, action }, idx) => (
          <div className="number-input" key={idx}>
            <label>{label}</label>
            <br />
            <select
              className="dropdowns"
              value={value || ''}
              onChange={(e) => dispatch(action(e.target.value ? parseInt(e.target.value) : null))}
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            {errors[label.toLowerCase().replace('no. of ', '')] && (
              <span className="error">{errors[label.toLowerCase().replace('no. of ', '')]}</span>
            )}
          </div>
        ))}

        {[
          { label: 'Expected Price', value: expectedPrice, action: setExpectedPrice },
          { label: 'Monthly Rent', value: monthlyRent, action: setMonthlyRent },
        ].map(({ label, value, action }, idx) => (
          <div className="number-input" key={idx}>
            <label>{label} ({purpose === 'Sell' && label === 'Expected Price' ? 'required' : purpose === 'Lease' && label === 'Monthly Rent' ? 'required' : 'optional'})</label>
            <br />
            <input
              type="number"
              min="0"
              value={value || ''}
              onChange={(e) => dispatch(action(e.target.value ? parseInt(e.target.value) : null))}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {errors[label.toLowerCase().replace(' ', '')] && (
              <span className="error">{errors[label.toLowerCase().replace(' ', '')]}</span>
            )}
          </div>
        ))}

        <div className="price-negotiable">
          <label>Price Negotiable</label>
          <br />
          <select
            className="dropdowns"
            value={priceNegotiable ? 'Yes' : 'No'}
            onChange={(e) => dispatch(setPriceNegotiable(e.target.value === 'Yes'))}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {[
          { label: 'Maintenance Charges', value: maintenanceCharges, action: setMaintenanceCharges },
          { label: 'Booking Amount', value: bookingAmount, action: setBookingAmount },
        ].map(({ label, value, action }, idx) => (
          <div className="number-input" key={idx}>
            <label>{label} (optional)</label>
            <br />
            <input
              type="number"
              min="0"
              value={value || ''}
              onChange={(e) => dispatch(action(e.target.value ? parseInt(e.target.value) : null))}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        ))}

        <div className="description">
          <label>Description</label>
          <br />
          <textarea
            value={description || ''}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            placeholder="Enter a brief description"
          />
        </div>

        <div className="btn-section">
          <button className="prev-btn" onClick={() => dispatch(handleShowStep_1())}>
            Previous
          </button>
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStep_2;