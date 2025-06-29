import React, { useState } from 'react';
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

  const {
    purpose, propertyType, propertyName, category, constructionType, bhkConfig,
    pinCode, locality, nearbyLandmarks, city, state,
    carpetArea, buildupArea, floorNumber, totalFloors, propertyAge,
  } = useSelector((state) => state.listing);

  const validateForm = () => {
    const newErrors = {};
    if (!purpose) newErrors.purpose = 'Purpose is required';
    if (!propertyType) newErrors.propertyType = 'Property type is required';
    if (!propertyName) newErrors.propertyName = 'Property name is required';
    if (!category) newErrors.category = 'Category is required';
    if (!constructionType) newErrors.constructionType = 'Construction type is required';
    if (!locality) newErrors.locality = 'Locality is required';
    if (!pinCode || !/^[0-9]{6}$/.test(String(pinCode))) newErrors.pinCode = 'Valid 6-digit PIN code required';
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

  const handleChange = (setter, key) => (e) => {
    const value = e.target.value;
    dispatch(setter(value));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleNumberChange = (setter, key) => (e) => {
    const value = e.target.value ? Number(e.target.value) : '';
    dispatch(setter(value));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const renderInput = (label, value, setter, placeholder, type = 'text', errorKey) => (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={type === 'number' ? handleNumberChange(setter, errorKey) : handleChange(setter, errorKey)}
        className={`w-full border ${errors[errorKey] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-3 sm:py-2 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
      />
      {errors[errorKey] && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors[errorKey]}</p>}
    </div>
  );

  const renderSelect = (label, value, setter, options, errorKey) => (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">{label}</label>
      <select
        value={value}
        onChange={handleChange(setter, errorKey)}
        className={`w-full border ${errors[errorKey] ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-3 sm:py-2 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white`}
      >
        <option value="" disabled>Select {label}</option>
        {options.map((item, idx) => (
          <option key={idx} value={item}>{item}</option>
        ))}
      </select>
      {errors[errorKey] && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors[errorKey]}</p>}
    </div>
  );

  const propertyTypes = [
    'Flat/Apartment', 'Independent House/Villa', 'Plot/Land', 'Farmhouse', 'Office',
    'Retail/Shop', 'Storage/Warehouse', 'Industry/Factory', 'Hospitality', 'Others'
  ];
  const categories = ['Residential', 'Commercial'];
  const constructionTypes = ['Ready to Move', 'Under Construction'];
  const bhkConfigurations = ['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Penthouse'];

  return (
    <div className="w-full">
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-6">Basic Property Details</h2>

        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Property Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderSelect("Purpose", purpose, setPurpose, ["Sell", "Lease"], "purpose")}
            {renderSelect("Property Type", propertyType, setPropertyType, propertyTypes, "propertyType")}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderInput("Property Name", propertyName, setPropertyName, "Enter property name", "text", "propertyName")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderSelect("Category", category, setCategory, categories, "category")}
            {renderSelect("Construction Type", constructionType, setConstructionType, constructionTypes, "constructionType")}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderSelect("Configuration", bhkConfig, setBhkConfig, bhkConfigurations, "")}
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Location Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderInput("PIN Code", pinCode, setPinCode, "Enter PIN", "number", "pinCode")}
            {renderInput("City", city, setCity, "Enter city", "text", "city")}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderInput("Locality", locality, setLocality, "Enter locality", "text", "locality")}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderInput("Nearby Landmarks", nearbyLandmarks, setNearbyLandmarks, "Enter landmarks")}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderInput("State", state, setState, "Enter state", "text", "state")}
          </div>
        </div>

        {/* Property Details Section */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Property Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderInput("Carpet Area (sqft)", carpetArea, setCarpetArea, "Enter carpet area", "number", "carpetArea")}
            {renderInput("Buildup Area (sqft)", buildupArea, setBuildupArea, "Enter buildup area", "number")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderInput("Floor Number", floorNumber, setFloorNumber, "Enter floor number", "number")}
            {renderInput("Total Floors", totalFloors, setTotalFloors, "Enter total floors", "number")}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {renderInput("Property Age (years)", propertyAge, setPropertyAge, "Enter property age", "number")}
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-4 sm:pt-6">
          <button
            className="w-full sm:w-auto sm:ml-auto block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 sm:py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
            onClick={handleNext}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStep_1;