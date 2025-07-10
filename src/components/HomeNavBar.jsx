import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass, faHome, faBuilding, faMap, faKey } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../data/Apipath';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPurpose,
  setCategory,
  setPropertyType,
} from '../../Redux/FiltersSlice';
import { setSearchString } from '../../Redux/SearchSlice';
import { handleShowUser } from '../../Redux/AppSlice';

const HomeNavBar = () => {
  const { showUser } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchString = useSelector((state) => state.search.searchString);
  const [navbtnactive, setNavbtnactive] = useState('Buy');
  const [placePredictions, setPlacePredictions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timeoutIdRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const getPlacePredictions = async () => {
    if (!searchString.trim()) {
      setPlacePredictions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/listings/get-auto-complete/${searchString}`);
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      if (response.ok && data.possiblePredictions) {
        console.log('Predictions:', data.possiblePredictions); // Debug log
        setPlacePredictions(data.possiblePredictions);
        setShowSuggestions(data.possiblePredictions.length > 0);
      } else {
        setPlacePredictions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Autocomplete error:', error);
      setPlacePredictions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    dispatch(setSearchString(val));
    
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    
    if (val.trim()) {
      timeoutIdRef.current = setTimeout(() => getPlacePredictions(), 300);
    } else {
      setPlacePredictions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelect = (desc) => {
    dispatch(setSearchString(desc));
    setShowSuggestions(false);
    navigate(`/properties/${desc}`);
  };

  const handleInputFocus = () => {
    if (searchString.trim() && placePredictions.length > 0) {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  const navOptions = [
    { label: 'Buy', icon: faHome, action: () => dispatch(setPurpose('Buy')) },
    { label: 'Rent/Lease', icon: faKey, action: () => dispatch(setPurpose('Lease')) },
    { label: 'Commercial', icon: faBuilding, action: () => dispatch(setCategory('Commercial')) },
    { label: 'Plots/Land', icon: faMap, action: () => dispatch(setPropertyType('Plots/Land')) },
  ];

  return (
    <div className="w-full min-h-[55vh] bg-gradient-to-b from-blue-50 to-white relative">
      {/* Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center bg-white shadow-sm z-50 fixed top-0 left-0 right-0">
        <div className="text-blue-600 font-semibold text-xl sm:text-2xl lg:text-3xl">
          Riseacre<span className="text-gray-500 text-base sm:text-lg lg:text-xl">.in</span>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/postProperty" style={{ textDecoration: 'none' }}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200">
              <span className="hidden sm:inline">Post Property</span>
              <span className="sm:hidden">Post</span>
            </button>
          </Link>

          <button
            className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200"
            onClick={() => dispatch(handleShowUser(showUser))}
          >
            <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-18">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Find Your Dream Property
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto">
            Search thousands of properties across your city with our smart search
          </p>
        </div>

        {/* Search Container */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-100 overflow-visible">
          {/* Property Type Tabs */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {navOptions.map(({ label, icon, action }) => (
              <button
                key={label}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 ${
                  navbtnactive === label
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => {
                  action();
                  setNavbtnactive(label);
                }}
              >
                <FontAwesomeIcon icon={icon} className="text-sm" />
                {label}
              </button>
            ))}
          </div>

          {/* Search Section */}
          <div className="p-4 sm:p-6 relative" ref={wrapperRef}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchString}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  placeholder="Search by location (Eg : HYDERABAD, MUMBAI)"
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg py-3 sm:py-3.5 px-4 sm:px-5 text-base outline-none transition-all duration-200"
                />

                {/* Suggestion Dropdown - Fixed positioning and z-index */}
                {showSuggestions && placePredictions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-[9999] mt-1">
                    <ul className="bg-white shadow-2xl border border-gray-200 rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                      {placePredictions.map((item, idx) => (
                        <li
                          key={`${item.description}-${idx}`}
                          onClick={() => handleSelect(item.description)}
                          className="px-4 sm:px-5 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 text-gray-700 hover:text-blue-600 border-b border-gray-100 last:border-b-0 flex items-center"
                        >
                          <FontAwesomeIcon icon={faMap} className="mr-3 text-gray-400 text-sm flex-shrink-0" />
                          <span className="truncate">{item.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link to={`/properties/${searchString}`} className="sm:w-auto" style={{ textDecoration: 'none' }}>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-base font-medium flex items-center justify-center gap-2 transition-colors duration-200 min-w-[120px]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-2xl">
          {[
            { icon: faMagnifyingGlass, title: 'Smart Search', desc: 'Auto location suggestions' },
            { icon: faMap, title: 'Live Updates', desc: 'Real-time property listings' },
            { icon: faHome, title: 'Best Deals', desc: 'Curated property matches' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <FontAwesomeIcon icon={icon} className="text-blue-600 text-xl mb-2" />
              <div className="text-sm font-medium text-gray-800">{title}</div>
              <div className="text-xs text-gray-600">{desc}</div>
            </div>
          ))}
        </div>

        {/* Developer Credit */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Developed by <span className="font-medium text-blue-600">Ujwalakula</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;