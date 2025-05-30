import React, { useState, useEffect, useRef } from 'react';
import './HomeStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser ,faKey} from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../data/Apipath'; // Ensure API_URL is properly set
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPurpose, setCategory, setPropertyType } from '../../Redux/FiltersSlice';
import { setSearchString } from '../../Redux/SearchSlice';
import { handleShowUser } from '../../Redux/AppSlice';

const HomeNavBar = () => {

  const {showUser,showAuth}=useSelector((state)=>state.app);

  const [navbtnactive, setNavbtnactive] = useState('Buy');
  const [placePredictions, setPlacePredictions] = useState([]);
  const timeoutIdRef = useRef(null); // Using useRef for timeout ID

  const dispatch = useDispatch();

  // Access Redux states
  const searchString = useSelector((state) => state.search.searchString); // Corrected searchString access
  const { purpose, category, propertyType } = useSelector((state) => state.filters);

  // Fetch place predictions based on search input
  const getPlacePredictions = async () => {
    if (!searchString.trim()) {
      setPlacePredictions([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/listings/get-auto-complete/${searchString}`);
      const data = await response.json();

      if (response.ok) {
        setPlacePredictions(data.possiblePredictions || []);
      } else {
        console.error('API Error:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
    }
  };

  // Debounced search input handling
  const handleSearch = (e) => {
    const input = e.target.value;
    dispatch(setSearchString(input)); // Immediately update search string in Redux

    // Clear existing timeout if any
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set new timeout to fetch predictions after delay
    timeoutIdRef.current = setTimeout(() => {
      getPlacePredictions();
    }, 500);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  // Handle option selection from predictions
  const handleOptionClick = (option) => {
    dispatch(setSearchString(option));
    setPlacePredictions([]);
  };

  return (
    <div className="nav-section">
      <div className="nav-header">
        <div className="brand">Riseacre<span style={{ fontSize: '1.5rem' }}>.in</span></div>
        <div className="navigation">
          <Link to={'/postProperty'} className='link'>
            <div className="post-btn">
              <b>Post property</b> <div className="free-label">FREE</div>
            </div>
          </Link>
          <div className="user" onClick={()=>dispatch(handleShowUser(showUser))}>
            <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "white" }} />
          </div>
        </div>
      </div>

      <div className="image-left-home">
        <img src='/house2-img.png' alt='house' />
      </div>

      <div className="nav-description">
        Affordable Connections , Endless Possibilities , Rise with Riseacre.
      </div>

      <div className="image-right-home">
        <img src='/house-image.png' alt='house' />
      </div>

      <div className="search-section">
        <div className="search-navigation">
          <div
            className={`buy-nav search-nav ${navbtnactive === 'Buy' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setPurpose('Buy')); setNavbtnactive('Buy'); }}
            role="button"
            aria-label="Buy properties"
          >
            Buy
          </div>
          <div
            className={`rent-nav search-nav ${navbtnactive === 'Rent/Lease' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setPurpose('Lease')); setNavbtnactive('Rent/Lease'); }}
            role="button"
            aria-label="Rent or lease properties"
          >
            Rent/Lease
          </div>
          <div
            className={`commercial-nav search-nav ${navbtnactive === 'Commercial' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setCategory('Commercial')); setNavbtnactive('Commercial'); }}
            role="button"
            aria-label="Find commercial properties"
          >
            Commercial
          </div>
          <div
            className={`plots-nav search-nav ${navbtnactive === 'Plots/Land' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setPropertyType('Plots/Land')); setNavbtnactive('Plots/Land'); }}
            role="button"
            aria-label="Find plots or land"
          >
            Plots/Land
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            name="search"
            placeholder="Search Properties by Locality or Address"
            value={searchString}
            onChange={handleSearch}
            aria-label="Search properties"
          />
          <Link to={`/properties/${searchString}`} className="link">
            <button className="search-btn">Search</button>
          </Link>
        </div>

        {/* Autocomplete suggestions */}
        {placePredictions.length > 0 && searchString.trim() && (
          <div className="autocomplete-section">
            <div className="place-selection">
              {placePredictions.map((prediction, index) => (
                <div
                  key={index}
                  className="place-option"
                  onClick={() => handleOptionClick(prediction.description)}
                  role="option"
                  aria-label={prediction.description}
                >
                  {prediction.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNavBar;
