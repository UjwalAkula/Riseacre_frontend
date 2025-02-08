import React, { useState, useEffect } from 'react';
import './PropertiesStyle.css';
import { API_URL } from '../data/Apipath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPhone, faBookmark, faShare,faAngleLeft,faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropertiesNavBar from './PropertiesNavBar';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchString } from '../../Redux/SearchSlice';


const Properties = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { searchString } = useSelector((state) => state.search);

  const {
      purpose,
      category,
      propertyType,
      status,
      bhkType,
      price,
      buildUpArea
    } = useSelector((state) => state.filters); // Get filter values from Redux
  

  // States to hold properties, results count, and error
  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [searchInput, setSearchInput] = useState(searchString); // Search input for filtering
  const [imageno,setImageno]=useState(0);

  // Timeout handler for search input delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchString(searchInput)); // Update search string in Redux
    }, 500); // Delay of 500ms

    return () => clearTimeout(timeoutId); // Cleanup timeout on each change
  }, [searchInput, dispatch]);

  // Fetching properties from the API
  const getProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/listings/get-all-properties`);
      if (response.ok) {
        const data = await response.json();
        console.log('Properties fetched successfully');
        setProperties(data.properties);
      } else {
        setError('Something went wrong while fetching properties');
      }
    } catch (error) {
      setError('Failed to fetch properties.');
      console.error('Failed to fetch properties:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the API call finishes
    }
  };

  // Call the getProperties function when the component mounts
  useEffect(() => {
    getProperties();
  }, []);

  // Render builder certifications (if available)
  const renderBuilderCertifications = (certifications) => {
    if (certifications && certifications !== 'NA') {
      return (
        <span className="certificate" style={{ color: '#28A745' }}>
          <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: '#218838' }} /> {certifications}
        </span>
      );
    }
    return null; // Return null if no certification
  };

 {/*} //Handling Images
  const previousImage=()=>{
    if(imageno>0){
      setCount(imageno - 1);
    }
  }

  const nextImage=()=>{
    if(imageno<property.photos.length-1){
      setCount(imageno + 1);
    }
  }*/}

  // Filtering properties based on search location
  const filteredProperties = properties.filter((item) => {
    const fullAddress = `${item.nearbyLandmarks}, ${item.locality}, ${item.city}, ${item.state}, India`.toLowerCase();
  
    // Normalize the search location input
    const searchingLocationParts = searchInput.split(',').map((part) => part.trim().toLowerCase());
  
    // Check for matching locality and city together
    const doesMatch = searchingLocationParts.every((part) => fullAddress.includes(part));
  
    // Apply other filters
    const matchesPurpose = purpose === '' || item.purpose === purpose;
    const matchesCategory = category === '' || item.category === category;
    const matchesPropertyType = propertyType === '' || item.propertyType === propertyType;
    const matchesStatus = status === '' || item.constructionType === status;
    const matchesBhkType = bhkType === '' || item.bhkConfiguration.includes(bhkType);
  
    return doesMatch && matchesPurpose && matchesCategory && matchesPropertyType && matchesStatus && matchesBhkType;
  });
  


  useEffect(() => {
    setResults(filteredProperties.length);
    console.log(filteredProperties);
  }, [filteredProperties,purpose,category,propertyType,status,bhkType]);

  return (
    <div className="properties-page">
      <PropertiesNavBar />
      <Filters />
      <div className="properties-container">
        <div className="properties-section">
          {/* Display total results */}
          {results !== null && <h3>{results} results</h3>}

          {/* Show loading message if data is being fetched */}
          {isLoading ? <p>Loading...</p> : error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Render the properties if available */}
          {filteredProperties.length === 0 ? (
            <p>No properties available.</p>
          ) : (
            <div className="properties-list">
              {filteredProperties.map((item) => (
                <Link to={`/propertyinfo/${item._id}`} key={item._id} className="link">
                  <div className="property-card">
                    {/* Rendering images */}
                    <div className="property-images">
                    {/*<span className='left-arrow' onClick={previousImage}><FontAwesomeIcon icon={faAngleLeft} size="2xl" style={{color: "#055CB4",}} /></span>*/}
                      {item.photos && item.photos.length > 0 ? (
                        <img
                          src={`${API_URL}/listings/uploads/${item.photos[imageno]}`}
                          alt="Property"
                          className="property-image"
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                      {/*<span className='right-arrow' onClick={nextImage} ><FontAwesomeIcon icon={faAngleRight} size="2xl" style={{color: "#858585",}} /></span>*/}
                    </div>

                    <div className="property-content">
                      <div className="save-share">
                        <FontAwesomeIcon icon={faBookmark} size="xl" style={{ color: '#d9d9d9' }} />
                        <FontAwesomeIcon icon={faShare} size="xl" style={{ color: '#d9d9d9' }} />
                      </div>
                      <div className="card-header">
                        <h3 style={{ color: '#333333', fontWeight: '700' }}>{item.propertyName}</h3>
                        {renderBuilderCertifications(item.builderCertifications)}
                      </div>
                      <span style={{ color: '#333333' }}>
                        {item.category} / {item.propertyType}
                      </span>

                      <div className="property-details">
                        <div className="price-details detail-item">
                          <strong style={{ color: '#777777' }}>Price</strong>
                          <span>{item.expectedPrice ? `₹${item.expectedPrice}` : 'N/A'}</span>
                        </div>
                        <div
                          className="carpet-area detail-item"
                          style={{ borderLeft: '1px solid #777777', paddingLeft: '1%' }}
                        >
                          <strong style={{ color: '#777777' }}>Carpet-Area</strong>
                          <span>{item.carpetArea ? `${item.carpetArea} sqft` : 'N/A'}</span>
                        </div>
                        <div
                          className="configuration detail-item"
                          style={{ borderLeft: '1px solid #777777', paddingLeft: '1%' }}
                        >
                          <strong style={{ color: '#777777' }}>Configuration</strong>
                          <span>{item.bhkConfiguration && item.bhkConfiguration.length > 0 ? item.bhkConfiguration.join('/') : 'N/A'}</span>
                        </div>
                        <div
                          className="construction-type detail-item"
                          style={{ borderLeft: '1px solid #777777', paddingLeft: '1%' }}
                        >
                          <strong style={{ color: '#777777' }}>Property Status</strong>
                          <span>{item.constructionType ? item.constructionType : 'N/A'}</span>
                        </div>
                      </div>

                      {item.description && <p style={{ color: '#777777' }}>{item.description}</p>}

                      <div className="builder-info">
                        <span>{item.builderCompany ? item.builderCompany : 'No Builder Info'}</span>
                        <div className="contact-buttons">
                          <button style={{ backgroundColor: '#ebf4fc', color: '#055CB4' }}>
                            <b>View Phone</b>
                          </button>
                          <button>
                            <FontAwesomeIcon icon={faPhone} size="sm" style={{ color: 'white' }} /> <b>Contact</b>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
