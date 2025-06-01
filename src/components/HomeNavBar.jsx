import React, { useState, useEffect, useRef } from 'react';
import './HomeStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../data/Apipath';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPurpose, setCategory, setPropertyType } from '../../Redux/FiltersSlice';
import { setSearchString } from '../../Redux/SearchSlice';
import { handleShowUser } from '../../Redux/AppSlice';

import { Autocomplete, TextField } from '@mui/material'; // MUI Components

const HomeNavBar = () => {
  const { showUser } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const searchString = useSelector((state) => state.search.searchString);
  const [navbtnactive, setNavbtnactive] = useState('Buy');
  const [placePredictions, setPlacePredictions] = useState([]);
  const timeoutIdRef = useRef(null);

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

  const handleInputChange = (event, newInputValue) => {
    dispatch(setSearchString(newInputValue));
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    timeoutIdRef.current = setTimeout(() => {
      getPlacePredictions();
    }, 500);
  };

  const handleOptionSelect = (event, newValue) => {
    if (newValue) {
      dispatch(setSearchString(newValue));
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

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
          <div className="user" onClick={() => dispatch(handleShowUser(showUser))}>
            <FontAwesomeIcon icon={faUser} size="lg" style={{ color: "white" }} />
          </div>
        </div>
      </div>

      <div className="image-left-home">
        <img src='/house2-img.png' alt='house' />
      </div>

      <div className="nav-description">
        Affordable Connections, Endless Possibilities, Rise with Riseacre.
      </div>

      <div className="image-right-home">
        <img src='/house-image.png' alt='house' />
      </div>

      <div className="search-section">
        <div className="search-navigation">
          <div
            className={`buy-nav search-nav ${navbtnactive === 'Buy' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setPurpose('Buy')); setNavbtnactive('Buy'); }}
          >
            Buy
          </div>
          <div
            className={`rent-nav search-nav ${navbtnactive === 'Rent/Lease' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setPurpose('Lease')); setNavbtnactive('Rent/Lease'); }}
          >
            Rent/Lease
          </div>
          <div
            className={`commercial-nav search-nav ${navbtnactive === 'Commercial' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setCategory('Commercial')); setNavbtnactive('Commercial'); }}
          >
            Commercial
          </div>
          <div
            className={`plots-nav search-nav ${navbtnactive === 'Plots/Land' ? 'btnactive' : ''}`}
            onClick={() => { dispatch(setPropertyType('Plots/Land')); setNavbtnactive('Plots/Land'); }}
          >
            Plots/Land
          </div>
        </div>

        <div className="search-box" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Autocomplete
            freeSolo
            options={placePredictions.map((p) => p.description)}
            inputValue={searchString}
            onInputChange={handleInputChange}
            onChange={handleOptionSelect}
            sx={{ width: 400, backgroundColor: 'white', borderRadius: '4px' ,border:'none'}}
            renderInput={(params) => (
              <TextField {...params} label="Search Properties by Locality or Address" size='small' variant="outlined" sx={{border:'none'}} />
            )}
          />

          <Link to={`/properties/${searchString}`} className="link">
            <button className="search-btn">Search</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;
