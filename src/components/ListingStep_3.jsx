import React, { useState } from 'react';
import './PostPropertyStyles.css';
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

  const {
    purpose,
    propertyType,
    propertyName,
    category,
    constructionType,
    bhkConfig,
    locality,
    nearbyLandmarks,
    pinCode,
    city,
    state,
    carpetArea,
    buildupArea,
    floorNumber,
    totalFloors,
    propertyAge,
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
    listerType,
    listingType,
    listerName,
    listerPhone,
    listerEmail,
    builderCompany,
    builderCertifications,
    photos,
  } = useSelector((state) => state.listing);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + localPhotos.length > 5) {
      alert('You can upload a maximum of 5 photos total.');
      return;
    }

    const validFiles = selectedFiles.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB limit
      if (!isImage) alert(`${file.name} is not an image`);
      if (!isSizeValid) alert(`${file.name} exceeds 5MB limit`);
      return isImage && isSizeValid;
    });

    setLocalPhotos(prev => [...prev, ...validFiles]);
    dispatch(setPhotos([...photos, ...validFiles.map(file => file.name)]));
  };

  const removePhoto = (index) => {
    setLocalPhotos(prev => prev.filter((_, i) => i !== index));
    dispatch(setPhotos(photos.filter((_, i) => i !== index)));
  };

  const handleListerTypeChange = (e) => {
    const value = e.target.value;
    dispatch(setListerType(value));
    if (value !== 'Builder') {
      dispatch(setBuilderCompany(''));
      dispatch(setBuilderCertifications(''));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!listerType) newErrors.listerType = 'Lister type is required';
    if (!listerName) newErrors.listerName = 'Lister name is required';
    if (!listerPhone || !/^\d{10}$/.test(listerPhone)) 
      newErrors.listerPhone = 'Valid 10-digit phone number required';
    if (!listerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(listerEmail)) 
      newErrors.listerEmail = 'Valid email is required';
    if (listerType === 'Builder' && !builderCompany) 
      newErrors.builderCompany = 'Builder company is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const formData = new FormData();

    localPhotos.forEach((photo) => {
      formData.append('photos', photo);
    });

    const appendField = (key, value) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    };

    appendField('purpose', purpose);
    appendField('category', category);
    appendField('propertyType', propertyType);
    appendField('propertyName', propertyName);
    appendField('constructionType', constructionType);
    appendField('locality', locality);
    appendField('city', city);
    appendField('state', state);
    appendField('PINcode', pinCode);
    appendField('carpetArea', carpetArea);
    appendField('buildupArea', buildupArea);
    amenities.forEach((amenity, index) => {
      formData.append(`amenities[${index}]`, amenity);
    });
    Object.entries(connectivity).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(`connectivity[${key}]`, value);
      }
    });
    appendField('expectedPrice', expectedPrice);
    appendField('monthlyRent', monthlyRent);
    appendField('priceNegotiable', priceNegotiable);
    appendField('maintenanceCharges', maintenanceCharges);
    appendField('bookingAmount', bookingAmount);
    appendField('description', description);
    appendField('listerType', listerType);
    appendField('builderCompany', builderCompany);
    appendField('builderCertifications', builderCertifications);
    appendField('listingType', listingType);
    appendField('listerName', listerName);
    appendField('listerPhoneNumber', listerPhone);
    appendField('listerEmail', listerEmail);
    appendField('userId', userId);
    appendField('bhkConfiguration', bhkConfig);
    appendField('floorNumber', floorNumber);
    appendField('totalFloors', totalFloors);
    appendField('noOfBedrooms', bedrooms);
    appendField('noOfBathrooms', bathrooms);
    appendField('noOfHalls', halls);
    appendField('balcony', balcony);
    appendField('propertyAge', propertyAge);
    appendField('nearbyLandmarks', nearbyLandmarks);

    try {
      const response = await fetch(`${API_URL}/listings/post-property`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.responsefromserver || 'Submission failed');
      }

      await response.json();
      alert('Property listed successfully!');
      dispatch(resetForm());
      setLocalPhotos([]);
    } catch (error) {
      console.error('Error in listing property:', error);
      alert(`Failed to list property: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="propertyFeatures-section">
      <div className="form-details">
        <h3>Lister Info & Photos</h3>

        <div className="lister-type">
          <label>Lister Type</label><br />
          <select className="dropdowns" value={listerType ?? ''} onChange={handleListerTypeChange}>
            <option value="" disabled>Select</option>
            <option value="Owner">Owner</option>
            <option value="Broker">Broker</option>
            <option value="Builder">Builder</option>
          </select>
          {errors.listerType && <span className="error">{errors.listerType}</span>}
        </div>

        <div className="lister-type">
          <label>Listing Type</label><br />
          <select
            className="dropdowns"
            value={listingType ?? ''}
            onChange={(e) => dispatch(setListingType(e.target.value))}
          >
            <option value="" disabled>Select</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Featured">Featured</option>
          </select>
        </div>

        <div className="lister-name listers-details">
          <label>Lister Name</label><br />
          <input
            type="text"
            value={listerName ?? ''}
            onChange={(e) => dispatch(setListerName(e.target.value))}
            placeholder="Enter your name"
          />
          {errors.listerName && <span className="error">{errors.listerName}</span>}
        </div>

        <div className="lister-phone listers-details">
          <label>Lister Phone Number</label><br />
          <input
            type="tel"
            value={listerPhone ?? ''}
            onChange={(e) => dispatch(setListerPhone(e.target.value))}
            placeholder="Enter your phone number"
          />
          {errors.listerPhone && <span className="error">{errors.listerPhone}</span>}
        </div>

        <div className="lister-email listers-details">
          <label>Lister Email</label><br />
          <input
            type="email"
            value={listerEmail ?? ''}
            onChange={(e) => dispatch(setListerEmail(e.target.value))}
            placeholder="Enter your email"
          />
          {errors.listerEmail && <span className="error">{errors.listerEmail}</span>}
        </div>

        {listerType === 'Builder' && (
          <>
            <div className="builder-company listers-details">
              <label>Builder Company</label><br />
              <input
                type="text"
                value={builderCompany ?? ''}
                onChange={(e) => dispatch(setBuilderCompany(e.target.value))}
                placeholder="Enter builder company name"
              />
              {errors.builderCompany && <span className="error">{errors.builderCompany}</span>}
            </div>

            <div className="builder-certifications listers-details">
              <label>Builder Certifications</label><br />
              <input
                type="text"
                value={builderCertifications ?? ''}
                onChange={(e) => dispatch(setBuilderCertifications(e.target.value))}
                placeholder="Enter builder certifications"
              />
            </div>
          </>
        )}

        <div className="photos-upload">
          <label>Photos (Max 5)</label><br />
          <input type="file" accept="image/*" multiple onChange={handleFileChange} />
          {/*<div className="photos-preview">
            {localPhotos.map((photo, index) => (
              <div key={index} className="photo-preview">
                <img src={URL.createObjectURL(photo)} alt={`Preview ${index}`} />
                <button onClick={() => removePhoto(index)}>×</button>
                <p>{photo.name}</p>
              </div>
            ))}
          </div>*/}
        </div>

        <div className="btn-section">
          <button className="prev-btn" onClick={() => dispatch(handleShowStep_2())}>
            Previous
          </button>
          <button 
            className="next-btn" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingStep_3;