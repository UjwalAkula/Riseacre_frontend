import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/Apipath';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPhone,
  faBookmark,
  faShare,
  faXmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import PropertiesNavBar from './PropertiesNavBar';
import Filters from './Filters';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchString } from '../../Redux/SearchSlice';
import { handleShowUser } from '../../Redux/AppSlice';
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
  } = useSelector((state) => state.filters);

  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchString);
  const [showphoneId, setShowphoneId] = useState(null);

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

  const filteredProperties = properties.filter((item) => {
    const fullAddress = `${item.nearbyLandmarks}, ${item.locality}, ${item.city}, ${item.state}, India`.toLowerCase();
    const searchParts = searchInput.split(',').map((part) => part.trim().toLowerCase());
    const matchesAddress = searchParts.every((part) => fullAddress.includes(part));
    const matchesFilters =
      (purpose === '' || item.purpose === purpose) &&
      (category === '' || item.category === category) &&
      (propertyType === '' || item.propertyType === propertyType) &&
      (status === '' || item.constructionType === status) &&
      (bhkType === '' || item.bhkConfiguration.includes(bhkType));
    return matchesAddress && matchesFilters;
  });

  useEffect(() => {
    setResults(filteredProperties.length);
  }, [filteredProperties]);

  const isPropertiesPage = page_location.pathname.startsWith('/properties');

  const renderBuilderCertifications = (certifications) => {
    return certifications && certifications !== 'NA' ? (
      <span className="text-sm md:text-sm font-medium flex justify-center items-center gap-1 text-green-700 ">
        <FontAwesomeIcon icon={faCheck} className="text-green-700 text-xs md:text-sm" />
        {certifications}
      </span>
    ) : null;
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-2 md:px-6 lg:px-8 font-roboto">
      {showAuth && isPropertiesPage && <Authentication />}
      {showUser && isPropertiesPage && (
        <div className="mt-2">
          <UserActivity />
        </div>
      )}

      {/* User Icon - Mobile only */}
      <div className="flex justify-end items-center mt-4 md:hidden">
        <button
          onClick={() => dispatch(handleShowUser(!showUser))}
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FontAwesomeIcon icon={faUser} className="text-lg" />
        </button>
      </div>

      <PropertiesNavBar />
      <Filters />

      {/* Main content wrapper - restored original laptop styling */}
      <div className="max-w-screen-xl mx-auto px-1 md:px-0">
        <div className="mt-4">
          {results !== null && (
            <h3 className="sm:pl-4 text-lg md:text-xl font-semibold">{results} results</h3>
          )}
          {isLoading ? (
            <p className="text-center py-8 text-gray-600 text-base md:text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center py-8 text-red-500 text-base md:text-lg">{error}</p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-center py-8 text-gray-600 text-base md:text-lg">No properties available.</p>
          ) : (
            <div className="mt-4 space-y-6">
              {filteredProperties.map((item) => (
                <div
                  className="bg-white rounded-lg shadow-xs border border-gray-200 p-4 flex flex-col lg:flex-row gap-4 w-full lg:w-[100%] lg:mx-auto"
                  key={item._id}
                >
                  {/* Property Image - better tablet sizing */}
                  <Link
                    to={`/propertyinfo/${item._id}`}
                    className="w-full h-48 lg:w-80 lg:h-80 border border-gray-300 rounded-lg overflow-hidden flex-shrink-0"
                    style={{ textDecoration: 'none' }}
                  >
                    {item.photos?.[0] ? (
                      <img
                        src={`${API_URL}/listings/uploads/${item.photos[0]}`}
                        alt="Property"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                        No image available
                      </div>
                    )}
                  </Link>

                  {/* Property Details - better tablet layout */}
                  <div className="p-1.5 flex-1 flex flex-col justify-between gap-2">
                    {/* Bookmark and Share Icons */}
                    <div className="flex justify-end gap-4 text-gray-400 text-lg lg:text-xl">
                      <FontAwesomeIcon icon={faBookmark} className="cursor-pointer" />
                      <FontAwesomeIcon icon={faShare} className="cursor-pointer" />
                    </div>

                    {/* Property Name and Certifications */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start lg:flex-row lg:justify-between lg:items-center gap-2">
                      <Link
                        to={`/propertyinfo/${item._id}`}
                        style={{ textDecoration: 'none', color: '#055CB4' }}
                        className="text-gray-800 hover:text-primary"
                      >
                        <h2 className="text-xl lg:text-lg lg:font-bold font-bold text-primary">
                          {item.propertyName}
                        </h2>
                      </Link>
                      {renderBuilderCertifications(item.builderCertifications)}
                    </div>

                    {/* Property Category */}
                    <span className="text-base md:text-base lg:text-lg text-gray-600">
                      {item.category} / {item.propertyType}
                    </span>

                    {/* Property Details - improved tablet grid */}
                    <div className="grid grid-cols-2 md:grid md:grid-cols-4 lg:flex lg:flex-wrap gap-3 md:gap-2 lg:gap-4 pt-2 text-sm lg:text-sm text-gray-600 font-medium lg:font-medium">
                      <div className="min-w-0">
                        <p className="text-gray-500 text-xs">Price</p>
                        <p className="text-sm md:text-sm lg:text-lg font-semibold text-black truncate">
                          {item.expectedPrice ? `₹${item.expectedPrice}` : 'N/A'}
                        </p>
                      </div>
                      <div className="min-w-0 lg:border-l lg:pl-4">
                        <p className="text-gray-500 text-xs">Carpet-Area</p>
                        <p className="text-sm md:text-sm lg:text-lg font-semibold text-black truncate">
                          {item.carpetArea ? `${item.carpetArea} sqft` : 'N/A'}
                        </p>
                      </div>
                      <div className="min-w-0 lg:border-l lg:pl-4">
                        <p className="text-gray-500 text-xs">Configuration</p>
                        <p className="text-sm md:text-sm lg:text-lg font-semibold text-black truncate">
                          {item.bhkConfiguration?.length > 0
                            ? item.bhkConfiguration.join('/')
                            : 'N/A'}
                        </p>
                      </div>
                      <div className="min-w-0 lg:border-l lg:pl-4">
                        <p className="text-gray-500 text-xs">Property Status</p>
                        <p className="text-sm md:text-sm lg:text-lg font-semibold text-black truncate">
                          {item.constructionType || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-gray-600 text-sm md:text-sm lg:text-lg mt-1 line-clamp-2 lg:line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    {/* Builder Info and Action Buttons */}
                    <div className="relative flex flex-col md:flex-row md:justify-between md:items-center lg:flex-row lg:justify-between lg:items-center mt-3 gap-3">
                      <span className="text-base md:text-base lg:text-lg font-bold text-gray-800 truncate">
                        {item.builderCompany || 'No Builder Info'}
                      </span>

                      <div className="relative flex flex-col md:flex-row lg:flex-row gap-2 md:gap-2 lg:gap-3 w-full md:w-auto lg:w-auto">
                        <button
                          className="text-xs md:text-xs lg:text-sm px-3 md:px-3 lg:px-4 py-2 text-blue-600 bg-blue-50 font-semibold rounded hover:bg-blue-100 transition flex-1 md:flex-none"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowphoneId(item._id);
                          }}
                        >
                          View Phone
                        </button>

                        {showphoneId === item._id && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 border border-gray-300 bg-white p-3 rounded shadow w-64 md:w-52 lg:w-56">
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="absolute top-1 right-2 text-gray-400 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowphoneId(null);
                              }}
                            />
                            <h5 className="text-gray-700 font-semibold text-sm mb-1">
                              Phone number
                            </h5>
                            <p className="text-black text-base md:text-base lg:text-lg">
                              {String(item.listerPhoneNumber).slice(2)}
                            </p>
                          </div>
                        )}

                        <button
                          className="py-2 px-3 md:px-3 lg:px-4 bg-primary text-white font-semibold rounded hover:bg-primary transition text-xs md:text-xs lg:text-sm flex-1 md:flex-none"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add contact functionality here
                          }}
                        >
                          <FontAwesomeIcon icon={faPhone} className="mr-1 md:mr-1 lg:mr-2" /> Contact
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