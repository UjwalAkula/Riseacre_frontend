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

/* ======================================================
   STATE ABBREVIATION MAP (ONLY STATES)
====================================================== */
const STATE_ABBREVIATION_MAP = {
  'ap': 'andhra pradesh',
  'ar': 'arunachal pradesh',
  'as': 'assam',
  'br': 'bihar',
  'cg': 'chhattisgarh',
  'ch': 'chandigarh',
  'ct': 'chhattisgarh',
  'dd': 'daman and diu',
  'dl': 'delhi',
  'dn': 'dadra and nagar haveli',
  'ga': 'goa',
  'gj': 'gujarat',
  'hr': 'haryana',
  'hp': 'himachal pradesh',
  'jk': 'jammu and kashmir',
  'jh': 'jharkhand',
  'ka': 'karnataka',
  'kl': 'kerala',
  'la': 'ladakh',
  'ld': 'lakshadweep',
  'mh': 'maharashtra',
  'ml': 'meghalaya',
  'mn': 'manipur',
  'mp': 'madhya pradesh',
  'mz': 'mizoram',
  'nl': 'nagaland',
  'or': 'odisha',
  'ol': 'odisha',
  'pb': 'punjab',
  'py': 'puducherry',
  'rj': 'rajasthan',
  'sk': 'sikkim',
  'tg': 'telangana',
  'tr': 'tripura',
  'up': 'uttar pradesh',
  'ut': 'uttarakhand',
  'wb': 'west bengal'
};

/* ======================================================
   NORMALIZE ONLY STATE ABBREVIATIONS IN SEARCH
   Example: "mumbai,mh,india" → "mumbai,maharashtra,india"
====================================================== */
const normalizeOnlyStates = (searchString) => {
  if (!searchString) return searchString;
  
  let normalized = searchString.toLowerCase();
  
  // Only replace state abbreviations
  Object.entries(STATE_ABBREVIATION_MAP).forEach(([abbr, fullName]) => {
    // Replace as whole word (surrounded by commas or at boundaries)
    normalized = normalized.replace(new RegExp(`\\b${abbr}\\b`, 'g'), fullName);
  });
  
  return normalized;
};

/* ======================================================
   SMART SIMILARITY MATCH (LEVENSHTEIN DISTANCE)
====================================================== */
function similarity(a, b) {
  if (!a || !b) return 0;
  a = a.toLowerCase();
  b = b.toLowerCase();

  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  const longerLength = longer.length;
  if (longerLength === 0) return 1.0;

  let costs = [];
  for (let i = 0; i <= shorter.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= longer.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (shorter[i - 1] !== longer[j - 1]) {
          newValue = Math.min(newValue, lastValue, costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[longer.length] = lastValue;
  }

  return (longerLength - costs[longer.length]) / longerLength;
}

/* ======================================================
   MAIN COMPONENT
====================================================== */
const Properties = () => {
  const dispatch = useDispatch();
  const page_location = useLocation();

  const { searchString } = useSelector((state) => state.search);
  const { showUser, showAuth } = useSelector((state) => state.app);
  const { purpose, category, propertyType, status, bhkType } = useSelector(
    (state) => state.filters
  );

  const [properties, setProperties] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchString || '');
  const [showphoneId, setShowphoneId] = useState(null);

  /* Sync search string with global store */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setSearchString(searchInput));
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchInput, dispatch]);

  /* Fetch Properties */
  const getProperties = async () => {
    try {
      const response = await fetch(`${API_URL}/listings/get-all-properties`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data.properties);
      } else {
        setError('Something went wrong while fetching properties');
      }
    } catch {
      setError('Failed to fetch properties.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  /* ======================================================
     FILTER WITH STATE ABBREVIATION NORMALIZATION ONLY
  ====================================================== */
  const filteredProperties = properties.filter((item) => {
    // Build full address from database
    const fullAddress = `${item.nearbyLandmarks}, ${item.locality}, ${item.city}, ${item.state}, India`
      .toLowerCase();

    // Split address into tokens
    const addressTokens = fullAddress
      .replace(/,/g, ' ')
      .split(' ')
      .filter(Boolean);

    // ✅ ONLY normalize state abbreviations (e.g., "mh" → "maharashtra")
    // Keep everything else as-is (e.g., "mumbai" stays "mumbai")
    const normalizedInput = normalizeOnlyStates(searchInput);

    // Split normalized search into parts
    const searchParts = (normalizedInput || '')
      .toLowerCase()
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);

    // Check if every search part matches at least one address token
    const matchesAddress = searchParts.every((searchPart) =>
      addressTokens.some(
        (token) =>
          token.includes(searchPart) ||      // substring match
          searchPart.includes(token) ||      // reverse substring
          similarity(token, searchPart) > 0.6 // fuzzy match
      )
    );

    // Apply filter constraints
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

      {/* Mobile user icon */}
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

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-1 md:px-0">
        <div className="mt-4">
          {results !== null && (
            <h3 className="sm:pl-4 text-lg md:text-xl font-semibold">
              {results} results
            </h3>
          )}

          {isLoading ? (
            <p className="text-center py-8 text-gray-600 text-base md:text-lg">Loading...</p>
          ) : error ? (
            <p className="text-center py-8 text-red-500 text-base md:text-lg">{error}</p>
          ) : filteredProperties.length === 0 ? (
            <p className="text-center py-8 text-gray-600 text-base md:text-lg">
              No properties available.
            </p>
          ) : (
            <div className="mt-4 space-y-6">
              {filteredProperties.map((item) => (
                <div
                  className="bg-white rounded-lg shadow-xs border border-gray-200 p-4 flex flex-col lg:flex-row gap-4"
                  key={item._id}
                >
                  <Link
                    to={`/propertyinfo/${item._id}`}
                    className="w-full h-48 lg:w-80 lg:h-80 border border-gray-300 rounded-lg overflow-hidden"
                  >
                    {item.photos?.[0] ? (
                      <img
                        src={`${API_URL}/listings/uploads/${item.photos[0]}`}
                        className="w-full h-full object-cover"
                        alt="Property"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                        No image available
                      </div>
                    )}
                  </Link>

                  <div className="p-1.5 flex-1 flex flex-col justify-between">
                    <div className="flex justify-end gap-4 text-gray-400 text-lg">
                      <FontAwesomeIcon icon={faBookmark} />
                      <FontAwesomeIcon icon={faShare} />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                      <Link
                        to={`/propertyinfo/${item._id}`}
                        className="text-primary"
                        style={{ textDecoration: 'none' }}
                      >
                        <h2 className="text-xl font-bold">{item.propertyName}</h2>
                      </Link>

                      {renderBuilderCertifications(item.builderCertifications)}
                    </div>

                    <span className="text-base text-gray-600">
                      {item.category} / {item.propertyType}
                    </span>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm pt-2">
                      <div>
                        <p className="text-gray-500 text-xs">Price</p>
                        <p className="font-semibold">
                          {item.expectedPrice ? `₹${item.expectedPrice}` : 'N/A'}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-xs">Carpet Area</p>
                        <p className="font-semibold">
                          {item.carpetArea ? `${item.carpetArea} sqft` : 'N/A'}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-xs">Configuration</p>
                        <p className="font-semibold">
                          {item.bhkConfiguration?.length
                            ? item.bhkConfiguration.join('/')
                            : 'N/A'}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500 text-xs">Status</p>
                        <p className="font-semibold">{item.constructionType || 'N/A'}</p>
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-gray-800">
                        {item.builderCompany || 'No Builder Info'}
                      </span>

                      <div className="flex gap-3">
                        <button
                          className="px-3 py-2 text-blue-600 bg-blue-50 rounded"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowphoneId(item._id);
                          }}
                        >
                          View Phone
                        </button>

                        {showphoneId === item._id && (
                          <div className="absolute bg-white p-3 border rounded shadow w-64">
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="absolute top-1 right-2 text-gray-400 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowphoneId(null);
                              }}
                            />
                            <h5 className="font-semibold mb-1 text-gray-700">Phone number</h5>
                            <p className="text-black">{String(item.listerPhoneNumber).slice(2)}</p>
                          </div>
                        )}

                        <button className="px-4 py-2 bg-primary text-white rounded">
                          <FontAwesomeIcon icon={faPhone} className="mr-2" />
                          Contact
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