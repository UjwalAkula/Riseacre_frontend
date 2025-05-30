import React, { useState, useEffect } from 'react';
import './PropertiesStyle.css';
import { API_URL } from '../data/Apipath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPhone, faBookmark, faShare, faAngleLeft, faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import PropertiesNavBar from './PropertiesNavBar';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchString } from '../../Redux/SearchSlice';
import UserActivity from './UserActivity';
import Authentication from './Authentication';

const Properties = () => {
  const dispatch = useDispatch();
  const page_location = useLocation();

  const { searchString } = useSelector((state) => state.search);
  const { showUser, showAuth } = useSelector((state) => state.app);

  const {
    purpose,
    category,
    propertyType,
    status,
    bhkType,
    price,
    buildUpArea,
  } = useSelector((state) => state.filters);

  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchString);
  const [showphoneId, setShowphoneId] = useState(null); // Per property control

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchString(searchInput));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, dispatch]);

  const getProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/listings/get-all-properties`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
      } else {
        setError('Something went wrong while fetching properties');
      }
    } catch (error) {
      setError('Failed to fetch properties.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const renderBuilderCertifications = (certifications) => {
    if (certifications && certifications !== 'NA') {
      return (
        <span className="certificate" style={{ color: '#28A745' }}>
          <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#218838' }} /> {certifications}
        </span>
      );
    }
    return null;
  };

  const filteredProperties = properties.filter((item) => {
    const fullAddress = `${item.nearbyLandmarks}, ${item.locality}, ${item.city}, ${item.state}, India`.toLowerCase();
    const searchingLocationParts = searchInput.split(',').map((part) => part.trim().toLowerCase());

    const doesMatch = searchingLocationParts.every((part) => fullAddress.includes(part));
    const matchesPurpose = purpose === '' || item.purpose === purpose;
    const matchesCategory = category === '' || item.category === category;
    const matchesPropertyType = propertyType === '' || item.propertyType === propertyType;
    const matchesStatus = status === '' || item.constructionType === status;
    const matchesBhkType = bhkType === '' || item.bhkConfiguration.includes(bhkType);

    return doesMatch && matchesPurpose && matchesCategory && matchesPropertyType && matchesStatus && matchesBhkType;
  });

  useEffect(() => {
    setResults(filteredProperties.length);
  }, [filteredProperties, purpose, category, propertyType, status, bhkType]);

  const isPropertiesPage = page_location.pathname === `/properties/${searchString}`;

  return (
    <div className="properties-page">
      {showAuth && isPropertiesPage && <Authentication />}
      {showUser && isPropertiesPage && <div className="user-page"><UserActivity /></div>}

      <PropertiesNavBar />
      <Filters />

      <div className="properties-container">
        <div className="properties-section">
          {results !== null && <h3>{results} results</h3>}
          {isLoading ? <p>Loading...</p> : error && <p style={{ color: 'red' }}>{error}</p>}

          {filteredProperties.length === 0 ? (
            <p>No properties available.</p>
          ) : (
            <div className="properties-list">
              {filteredProperties.map((item) => (
                <div className="property-card" key={item._id}>
                  <Link to={`/propertyinfo/${item._id}`} key={item._id} className="link">
                    <div className="property-images">
                      {item.photos && item.photos.length > 0 ? (
                        <img
                          src={`${API_URL}/listings/uploads/${item.photos[0]}`}
                          alt="Property"
                          className="property-image"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                  </Link>

                  <div className="property-content">
                    <div className="save-share">
                      <FontAwesomeIcon icon={faBookmark} size="xl" style={{ color: '#d9d9d9' }} />
                      <FontAwesomeIcon icon={faShare} size="xl" style={{ color: '#d9d9d9' }} />
                    </div>

                    <div className="card-header">
                      <Link to={`/propertyinfo/${item._id}`} className="link">
                        <h3 style={{ color: '#333333', fontWeight: '700' }}>{item.propertyName}</h3>
                      </Link>
                      {renderBuilderCertifications(item.builderCertifications)}
                    </div>

                    <span style={{ color: '#333333' }}>{item.category} / {item.propertyType}</span>

                    <div className="property-details">
                      <div className="price-details detail-item">
                        <strong style={{ color: '#777777' }}>Price</strong>
                        <span>{item.expectedPrice ? `₹${item.expectedPrice}` : 'N/A'}</span>
                      </div>
                      <div className="carpet-area detail-item" style={{ borderLeft: '1px solid #777777', paddingLeft: '1%' }}>
                        <strong style={{ color: '#777777' }}>Carpet-Area</strong>
                        <span>{item.carpetArea ? `${item.carpetArea} sqft` : 'N/A'}</span>
                      </div>
                      <div className="configuration detail-item" style={{ borderLeft: '1px solid #777777', paddingLeft: '1%' }}>
                        <strong style={{ color: '#777777' }}>Configuration</strong>
                        <span>{item.bhkConfiguration?.length > 0 ? item.bhkConfiguration.join('/') : 'N/A'}</span>
                      </div>
                      <div className="construction-type detail-item" style={{ borderLeft: '1px solid #777777', paddingLeft: '1%' }}>
                        <strong style={{ color: '#777777' }}>Property Status</strong>
                        <span>{item.constructionType || 'N/A'}</span>
                      </div>
                    </div>

                    {item.description && <p style={{ color: '#777777' }}>{item.description}</p>}

                    <div className="builder-info">
                      <span>{item.builderCompany || 'No Builder Info'}</span>

                      <div className="contact-buttons">
                        <button
                          style={{ backgroundColor: '#ebf4fc', color: '#055CB4' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setShowphoneId(item._id);
                          }}
                        >
                          <b>View Phone</b>
                        </button>

                        {showphoneId === item._id && (
                          <div className="phone-section">
                            <FontAwesomeIcon
                              icon={faXmark}
                              size="xl"
                              style={{ color: '#a6a6a6' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setShowphoneId(null);
                              }}
                            />
                            <h3>Phone number</h3>
                            <p>{item.listerPhoneNumber}</p>
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            // Add contact logic
                          }}
                        >
                          <FontAwesomeIcon icon={faPhone} size="sm" style={{ color: 'white' }} /> <b>Contact</b>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
