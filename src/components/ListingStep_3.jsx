import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowStep_2 } from '../../Redux/PostingSlice';
import {
  setListerType,
  setListingType,
  setListerName,
  setListerPhone,
  setListerEmail,
  setBuilderCompany,
  setBuilderCertifications,
  setPhotos,
  resetForm,
} from '../../Redux/ListingSlice';
import { API_URL } from '../data/Apipath';

const ListingStep_3 = () => {
  const dispatch = useDispatch();
  const [localPhotos, setLocalPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const listing = useSelector((state) => state.listing);
  const {
    amenities, connectivity, builderCertifications, builderCompany,
    listerType, listingType, listerName, listerPhone, listerEmail,
    photos, purpose, propertyType, propertyName, category, constructionType, bhkConfig,
    locality, nearbyLandmarks, pinCode, city, state, carpetArea, buildupArea, floorNumber,
    totalFloors, propertyAge, balcony, bedrooms, bathrooms, halls, expectedPrice,
    monthlyRent, priceNegotiable, maintenanceCharges, bookingAmount, description,
  } = listing;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + localPhotos.length > 5) {
      alert('You can upload a maximum of 5 photos total.');
      return;
    }
    const validFiles = selectedFiles.filter(file => file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024);
    setLocalPhotos(prev => [...prev, ...validFiles]);
    dispatch(setPhotos([...photos, ...validFiles.map(f => f.name)]));
  };

  const removePhoto = (index) => {
    const newLocalPhotos = localPhotos.filter((_, i) => i !== index);
    setLocalPhotos(newLocalPhotos);
    dispatch(setPhotos(newLocalPhotos.map(f => f.name)));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!listerType) newErrors.listerType = 'Lister type is required';
    if (!listerName) newErrors.listerName = 'Lister name is required';
    if (!/^\d{10}$/.test(listerPhone)) newErrors.listerPhone = 'Valid 10-digit phone number required';
    if (!/^\S+@\S+\.\S+$/.test(listerEmail)) newErrors.listerEmail = 'Valid email is required';
    if (listerType === 'Builder' && !builderCompany) newErrors.builderCompany = 'Builder company is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    const formData = new FormData();
    localPhotos.forEach(photo => formData.append('photos', photo));
    const appendField = (k, v) => v && formData.append(k, v);

    // Add all necessary fields
    [
      ['purpose', purpose], ['propertyType', propertyType], ['propertyName', propertyName], ['category', category],
      ['constructionType', constructionType], ['bhkConfiguration', bhkConfig], ['locality', locality],
      ['city', city], ['state', state], ['PINcode', pinCode], ['carpetArea', carpetArea],
      ['buildupArea', buildupArea], ['expectedPrice', expectedPrice], ['monthlyRent', monthlyRent],
      ['priceNegotiable', priceNegotiable], ['maintenanceCharges', maintenanceCharges],
      ['bookingAmount', bookingAmount], ['description', description], ['listerType', listerType],
      ['builderCompany', builderCompany], ['builderCertifications', builderCertifications],
      ['listingType', listingType], ['listerName', listerName], ['listerPhoneNumber', listerPhone],
      ['listerEmail', listerEmail], ['userId', localStorage.getItem('userId')], ['floorNumber', floorNumber],
      ['totalFloors', totalFloors], ['noOfBedrooms', bedrooms], ['noOfBathrooms', bathrooms],
      ['noOfHalls', halls], ['balcony', balcony], ['propertyAge', propertyAge],
      ['nearbyLandmarks', nearbyLandmarks]
    ].forEach(([k, v]) => appendField(k, v));

    amenities.forEach((item, i) => formData.append(`amenities[${i}]`, item));
    Object.entries(connectivity).forEach(([k, v]) => v && formData.append(`connectivity[${k}]`, v));

    try {
      const res = await fetch(`${API_URL}/listings/post-property`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });
      if (!res.ok) throw new Error((await res.json()).responsefromserver || 'Submission failed');
      alert('Property listed successfully!');
      dispatch(resetForm());
      setLocalPhotos([]);
    } catch (err) {
      alert('Failed to list property: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-4 px-4 sm:py-6 md:py-8">
      <div className="w-full max-w-4xl bg-white  rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 text-center">
          Lister Info & Photos
        </h3>

        {/* Lister Type & Listing Type - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block font-medium text-blue-900 text-sm sm:text-base">
              Lister Type <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={listerType || ''}
              onChange={(e) => {
                dispatch(setListerType(e.target.value));
                if (e.target.value !== 'Builder') {
                  dispatch(setBuilderCompany(''));
                  dispatch(setBuilderCertifications(''));
                }
              }}
            >
              <option value="">Select Lister Type</option>
              <option>Owner</option>
              <option>Broker</option>
              <option>Builder</option>
            </select>
            {errors.listerType && (
              <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.listerType}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-blue-900 text-sm sm:text-base">
              Listing Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={listingType || ''}
              onChange={(e) => dispatch(setListingType(e.target.value))}
            >
              <option value="">Select Listing Type</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Featured</option>
            </select>
          </div>
        </div>

        {/* Contact Information - Grid Layout */}
        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Contact Information
          </h4>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {[
              ['Lister Name', listerName, setListerName, 'listerName', 'text'],
              ['Phone Number', listerPhone, setListerPhone, 'listerPhone', 'tel'],
              ['Email Address', listerEmail, setListerEmail, 'listerEmail', 'email'],
            ].map(([label, value, action, errorKey, inputType], i) => (
              <div key={i} className="space-y-2">
                <label className="block font-medium text-blue-900 text-sm sm:text-base">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={inputType}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={value || ''}
                  onChange={(e) => dispatch(action(e.target.value))}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
                {errors[errorKey] && (
                  <p className="text-red-600 text-xs sm:text-sm mt-1">{errors[errorKey]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Builder Information (Conditional) */}
        {listerType === 'Builder' && (
          <div className="space-y-4 bg-blue-50 p-4 sm:p-6 rounded-lg">
            <h4 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-blue-200 pb-2">
              Builder Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                ['Builder Company', builderCompany, setBuilderCompany, 'builderCompany'],
                ['Builder Certifications', builderCertifications, setBuilderCertifications],
              ].map(([label, value, action, errorKey], i) => (
                <div key={i} className="space-y-2">
                  <label className="block font-medium text-blue-900 text-sm sm:text-base">
                    {label} {errorKey && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    value={value || ''}
                    onChange={(e) => dispatch(action(e.target.value))}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                  {errorKey && errors[errorKey] && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1">{errors[errorKey]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Section */}
        <div className="space-y-4">
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Property Photos
          </h4>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="block font-medium text-blue-900 text-sm sm:text-base">
                Upload Photos (Max 5, up to 5MB each)
              </label>
              <span className="text-xs text-gray-500">
                {localPhotos.length}/5 photos uploaded
              </span>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                disabled={localPhotos.length >= 5}
              />
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPG, PNG, GIF. Maximum size: 5MB per image.
              </p>
            </div>

            {/* Photo Preview */}
            {localPhotos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {localPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {photo.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 active:bg-gray-400 transition-colors duration-200 order-2 sm:order-1"
            onClick={() => dispatch(handleShowStep_2())}
            disabled={isSubmitting}
          >
            Previous
          </button>
          <button
            className="w-full sm:w-auto px-8 py-3 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 active:bg-blue-950 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Listing'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStep_3;