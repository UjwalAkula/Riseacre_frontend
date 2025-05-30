import React, { useState } from 'react';
import './PostPropertyStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowStep_2 } from '../../Redux/PostingSlice';
import {
  setPurpose,
  setPropertyType,
  setPropertyName,
  setCategory,
  setConstructionType,
  setBhkConfig,
  setLocality,
  setNearbyLandmarks,
  setPinCode,
  setCity,
  setState,
  setCarpetArea,
  setBuildupArea,
  setFloorNumber,
  setTotalFloors,
  setPropertyAge,
} from '../../Redux/ListingSlice';

const ListingStep_1 = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const propertyTypes = [
    'Flat/Apartment',
    'Independent House/Villa',
    'Plot/Land',
    'Farmhouse',
    'Office',
    'Retail/Shop',
    'Storage/Warehouse',
    'Industry/Factory',
    'Hospitality',
    'Others',
  ];

  const categories = ['Residential', 'Commercial'];
  const constructionTypes = ['Ready to Move', 'Under Construction'];
  const bhkConfigurations = ['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Penthouse'];

  const {
    purpose,
    propertyType,
    propertyName,
    category,
    constructionType,
    bhkConfig,
    pinCode,
    locality,
    nearbyLandmarks,
    city,
    state,
    carpetArea,
    buildupArea,
    floorNumber,
    totalFloors,
    propertyAge,
  } = useSelector((state) => state.listing);

  const validateForm = () => {
    const newErrors = {};
    if (!purpose) newErrors.purpose = 'Purpose is required';
    if (!propertyType) newErrors.propertyType = 'Property type is required';
    if (!propertyName) newErrors.propertyName = 'Property name is required';
    if (!category) newErrors.category = 'Category is required';
    if (!constructionType) newErrors.constructionType = 'Construction type is required';
    if (!locality) newErrors.locality = 'Locality is required';
    if (!pinCode || !/^\d{6}$/.test(pinCode)) newErrors.pinCode = 'Valid 6-digit PIN code required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!carpetArea || carpetArea <= 0) newErrors.carpetArea = 'Valid carpet area required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      dispatch(handleShowStep_2());
    }
  };

  return (
    <div className="propertyBasics-section">
      <div className="form-details">
        <h3>Basic Property Details</h3>

        <div className="purpose">
          <select
            className="purpose-dropdown dropdowns"
            value={purpose}
            onChange={(e) => dispatch(setPurpose(e.target.value))}
          >
            <option value="" disabled>
              Select Purpose
            </option>
            <option value="Sell">Sell</option>
            <option value="Lease">Lease</option>
          </select>
          {errors.purpose && <span className="error">{errors.purpose}</span>}
        </div>

        <div className="property-type">
          <select
            className="property-type-dropdown dropdowns"
            value={propertyType}
            onChange={(e) => dispatch(setPropertyType(e.target.value))}
          >
            <option value="" disabled>
              Select Property Type
            </option>
            {propertyTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && <span className="error">{errors.propertyType}</span>}
        </div>

        <div className="address-section">
          <label className="labeling">Property Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter Property name"
            value={propertyName}
            onChange={(e) => dispatch(setPropertyName(e.target.value))}
          />
          {errors.propertyName && <span className="error">{errors.propertyName}</span>}
        </div>

        <div className="category">
          <select
            className="category-dropdown dropdowns"
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="construction-type">
          <select
            className="construction-type-dropdown dropdowns"
            value={constructionType}
            onChange={(e) => dispatch(setConstructionType(e.target.value))}
          >
            <option value="" disabled>
              Select Construction Type
            </option>
            {constructionTypes.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.constructionType && <span className="error">{errors.constructionType}</span>}
        </div>

        <div className="bhkconfiguration">
          <select
            className="bhkconfiguration-dropdown dropdowns"
            value={bhkConfig || ''}
            onChange={(e) => dispatch(setBhkConfig(e.target.value))}
          >
            <option value="" disabled>
              Select Configuration
            </option>
            {bhkConfigurations.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="address-section">
          <label className="labeling">PIN Code</label>
          <br />
          <input
            type="number"
            placeholder="Enter PIN code"
            value={pinCode || ''}
            onChange={(e) => dispatch(setPinCode(e.target.value ? Number(e.target.value) : ''))}
          />
          {errors.pinCode && <span className="error">{errors.pinCode}</span>}
        </div>

        <div className="address-section">
          <label className="labeling">Locality</label>
          <br />
          <input
            type="text"
            placeholder="Enter locality"
            value={locality}
            onChange={(e) => dispatch(setLocality(e.target.value))}
          />
          {errors.locality && <span className="error">{errors.locality}</span>}
        </div>

        <div className="address-section">
          <label className="labeling">Nearby Landmarks</label>
          <br />
          <input
            type="text"
            placeholder="Enter nearby landmarks"
            value={nearbyLandmarks}
            onChange={(e) => dispatch(setNearbyLandmarks(e.target.value))}
          />
        </div>

        <div className="address-section">
          <label className="labeling">City</label>
          <br />
          <input
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div className="address-section">
          <label className="labeling">State</label>
          <br />
          <input
            type="text"
            placeholder="Enter your state"
            value={state}
            onChange={(e) => dispatch(setState(e.target.value))}
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        <div className="property-details-section">
          <label className="labeling">Carpet Area (sq. ft.)</label>
          <br />
          <input
            type="number"
            placeholder="Enter Carpet Area"
            value={carpetArea || ''}
            onChange={(e) => dispatch(setCarpetArea(e.target.value ? Number(e.target.value) : null))}
          />
          {errors.carpetArea && <span className="error">{errors.carpetArea}</span>}
        </div>

        <div className="property-details-section">
          <label className="labeling">Buildup Area (sq. ft.)</label>
          <br />
          <input
            type="number"
            placeholder="Enter Buildup Area"
            value={buildupArea || ''}
            onChange={(e) => dispatch(setBuildupArea(e.target.value ? Number(e.target.value) : null))}
          />
        </div>

        <div className="property-details-section">
          <label className="labeling">Floor Number</label>
          <br />
          <input
            type="number"
            placeholder="Enter Floor Number"
            value={floorNumber || ''}
            onChange={(e) => dispatch(setFloorNumber(e.target.value ? Number(e.target.value) : null))}
          />
        </div>

        <div className="property-details-section">
          <label className="labeling">Total Floors</label>
          <br />
          <input
            type="number"
            placeholder="Enter Total Floors"
            value={totalFloors || ''}
            onChange={(e) => dispatch(setTotalFloors(e.target.value ? Number(e.target.value) : null))}
          />
        </div>

        <div className="property-details-section">
          <label className="labeling">Property Age (years)</label>
          <br />
          <input
            type="number"
            placeholder="Enter Property Age"
            value={propertyAge || ''}
            onChange={(e) => dispatch(setPropertyAge(e.target.value ? Number(e.target.value) : null))}
          />
        </div>

        <div className="next-btn-section">
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStep_1;