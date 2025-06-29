import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { API_URL } from '../data/Apipath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faAngleLeft, 
  faAngleRight, 
  faPhone, 
  faHeart,
  faShare,
  faMapMarkerAlt,
  faBuilding,
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import PropertyHighlights from './PropertyHighlights';
import Connectivity from './Connectivity';
import Amenities from './Amenities';
import ListerandEngage from './ListerandEngage';
import PropertiesNavBar from './PropertiesNavBar';
import UserActivity from './UserActivity';
import Authentication from './Authentication';
import Viewphone from './Viewphone';
import { useSelector } from 'react-redux';

const PropertyInfo = () => {
  const { showUser, showAuth } = useSelector((state) => state.app);
  const page_location = useLocation();
  const { propertyId } = useParams();

  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [activeSection, setActiveSection] = useState("propertyHighlight");
  const [showphone, setShowphone] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getProperty = async () => {
    try {
      const response = await fetch(`${API_URL}/listings/get-property/${propertyId}`);
      if (response.ok) {
        const data = await response.json();
        setProperty(data.property);
      } else {
        setError('Something went wrong while fetching property.');
      }
    } catch (error) {
      setError('Failed to fetch property.');
      console.error(error);
    }
  };

  useEffect(() => {
    getProperty();
  }, [propertyId]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Property Details</h3>
          <p className="text-gray-600 text-sm">Please wait while we fetch the information...</p>
        </div>
      </div>
    );
  }

  const renderBuilderCertifications = (certifications) => {
    return certifications && certifications !== 'NA' && (
      <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
        <FontAwesomeIcon icon={faCheck} className="mr-1 text-xs" />
        <span>Certified Builder</span>
      </div>
    );
  };

  const previousImage = () => count > 0 && setCount(count - 1);
  const nextImage = () => count < property.photos.length - 1 && setCount(count + 1);
  const isPropertyInfoPage = page_location.pathname === `/propertyinfo/${propertyId}`;

  const sections = [
    { id: "propertyHighlight", label: "Highlights", icon: faBuilding },
    { id: "locationConnectivity", label: "Location", icon: faMapMarkerAlt },
    { id: "amenitiesFeatures", label: "Amenities", icon: faCheck },
    { id: "listerEngagement", label: "Contact", icon: faPhone }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50">
      {showAuth && isPropertyInfoPage && <Authentication />}
      {showUser && isPropertyInfoPage && <UserActivity />}

      <PropertiesNavBar />

      {/* Main Content */}
      <div className="pt-18 sm:pt-22 pb-6">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
          
          {/* Property Header */}
          <div className="bg-white rounded-t-2xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Title and Certification */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    {property.propertyName}
                  </h1>
                  {renderBuilderCertifications(property.builderCertifications)}
                </div>
                
                {/* Action Buttons - Desktop */}
                <div className="relative hidden sm:flex items-center gap-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className='p-3 rounded-full border-2 transition-all duration-200 bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500'
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-lg" />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-300 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-500 transition-all duration-200">
                    <FontAwesomeIcon icon={faShare} className="text-lg" />
                  </button>
                </div>

              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="space-y-2 text-sm sm:text-base text-gray-600">
                  {property.builderCompany && (
                    <p className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faBuilding} className="text-blue-600 text-sm" />
                      <span><strong>Builder:</strong> {property.builderCompany}</span>
                    </p>
                  )}
                  {property.propertyType && property.purpose && (
                    <p className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-600 text-sm" />
                      <span>{property.propertyType} for {property.purpose}</span>
                    </p>
                  )}
                  {property.category && property.constructionType && (
                    <p className="text-gray-500">
                      {property.category} • {property.constructionType}
                    </p>
                  )}
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <button
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-3 md:h-12 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 text-sm sm:text-base"
                    onClick={() => setShowphone(true)}
                  >
                    View Phone
                  </button>
                  <button className="flex-1 sm:flex-none px-4 sm:px-6 py-3 md:h-12 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Contact Now</span>
                  </button>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex sm:hidden justify-center gap-4 mb-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className='flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
                >
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="text-sm">Save</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-all duration-200">
                  <FontAwesomeIcon icon={faShare} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 overflow-hidden">
              {property.photos?.length > 0 ? (
                <>
                  <img
                    loading="lazy"
                    src={`${API_URL}/listings/uploads/${property.photos[count]}`}
                    alt={`${property.propertyName} - Image ${count + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {property.photos.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        disabled={count === 0}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
                      </button>
                      <button
                        onClick={nextImage}
                        disabled={count === property.photos.length - 1}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 sm:p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <FontAwesomeIcon icon={faAngleRight} className="text-lg" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <FontAwesomeIcon icon={faCamera} className="text-xs" />
                    <span>{count + 1}/{property.photos.length}</span>
                  </div>

                  {/* Image Dots */}
                  {property.photos.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {property.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCount(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === count ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCamera} className="text-4xl mb-2" />
                    <p>No images available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white shadow-lg">
            <div className="flex overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base font-medium transition-all duration-200 border-b-2 ${
                    activeSection === section.id
                      ? 'text-blue-600 border-blue-600 bg-blue-50'
                      : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-200'
                  }`}
                >
                  <FontAwesomeIcon icon={section.icon} className="text-sm" />
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Content */}
          <div className="bg-white rounded-b-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            {activeSection === "propertyHighlight" && <PropertyHighlights property={property} />}
            {activeSection === "locationConnectivity" && <Connectivity property={property} />}
            {activeSection === "amenitiesFeatures" && <Amenities property={property} />}
            {activeSection === "listerEngagement" && <ListerandEngage property={property} />}
          </div>
        </div>
      </div>
      
      {showphone && (
      <div className="fixed bottom-6 right-6 sm:right-10 z-50">
        <Viewphone property={property} setShowphone={setShowphone} />
      </div>
      )}
      
    </div>
  );
};

export default PropertyInfo;