import React, { useState } from 'react';
import './PropertiesNavBarStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPurpose,
  setCategory,
  setPropertyType,
  setStatus,
  setBhkType,
  setPrice,
  setBuildUpArea,
  clearFilters
} from '../../Redux/FiltersSlice'; // Import Redux actions

const Filters = () => {
  const dispatch = useDispatch();
  let {
    purpose,
    category,
    propertyType,
    status,
    bhkType,
    price,
    buildUpArea
  } = useSelector((state) => state.filters); // Get filter values from Redux

  // Local state to manage active button and display states
  const [activebtn, setActivebtn] = useState('');
  const [categorydisplay, setCategorydisplay] = useState(false);
  const [propertytypedisplay, setPropertytypedisplay] = useState(false);
  const [statusdisplay, setStatusdisplay] = useState(false);
  const [pricedisplay, setPricedisplay] = useState(false);
  const [bhkdisplay, setBhkdisplay] = useState(false);
  const [buildupareadisplay, setBuildupareadisplay] = useState(false);

  const handleCategory = () => {
    if (categorydisplay) {
      setCategorydisplay(false);
      setActivebtn('');
    } else {
      setCategorydisplay(true);
      setActivebtn('category');
      setPropertytypedisplay(false);
      setStatusdisplay(false);
      setPricedisplay(false);
      setBhkdisplay(false);
      setBuildupareadisplay(false);
    }
  };
  
  const handlePropertyType = () => {
    if (propertytypedisplay) {
      setPropertytypedisplay(false);
      setActivebtn('');
    } else {
      setPropertytypedisplay(true);
      setActivebtn('propertytype');
      setCategorydisplay(false);
      setStatusdisplay(false);
      setPricedisplay(false);
      setBhkdisplay(false);
      setBuildupareadisplay(false);
    }
  };
  
  const handleStatus = () => {
    if (statusdisplay) {
      setStatusdisplay(false);
      setActivebtn('');
    } else {
      setStatusdisplay(true);
      setActivebtn('status');
      setCategorydisplay(false);
      setPropertytypedisplay(false);
      setPricedisplay(false);
      setBhkdisplay(false);
      setBuildupareadisplay(false);
    }
  };
  
  const handlePrice = () => {
    if (pricedisplay) {
      setPricedisplay(false);
      setActivebtn('');
    } else {
      setPricedisplay(true);
      setActivebtn('price');
      setCategorydisplay(false);
      setPropertytypedisplay(false);
      setStatusdisplay(false);
      setBhkdisplay(false);
      setBuildupareadisplay(false);
    }
  };
  
  const handleBhkType = () => {
    if (bhkdisplay) {
      setBhkdisplay(false);
      setActivebtn('');
    } else {
      setBhkdisplay(true);
      setActivebtn('bhktype');
      setCategorydisplay(false);
      setPropertytypedisplay(false);
      setStatusdisplay(false);
      setPricedisplay(false);
      setBuildupareadisplay(false);
    }
  };
  
  const handleBuildUpArea = () => {
    if (buildupareadisplay) {
      setBuildupareadisplay(false);
      setActivebtn('');
    } else {
      setBuildupareadisplay(true);
      setActivebtn('builduparea');
      setCategorydisplay(false);
      setPropertytypedisplay(false);
      setStatusdisplay(false);
      setPricedisplay(false);
      setBhkdisplay(false);
    }
  };
  
  

  const handleClearFilters = () => {
    dispatch(clearFilters()); // Clear all filters
  };

  return (
    <div className="filters-section">
      <div className="filter-box">
        <div
          className={`filter-btn category-btn ${activebtn === 'category' ? 'active' : ''}`}
          onClick={handleCategory}
        >
          Category
        </div>
        <div
          className={`filter-btn propertytype-btn ${activebtn === 'propertytype' ? 'active' : ''}`}
          onClick={handlePropertyType}
        >
          Property Type
        </div>
        <div
          className={`filter-btn status-btn ${activebtn === 'status' ? 'active' : ''}`}
          onClick={handleStatus}
        >
          Status
        </div>
        <div
          className={`filter-btn price-btn ${activebtn === 'price' ? 'active' : ''}`}
          onClick={handlePrice}
        >
          Price
        </div>
        <div
          className={`filter-btn bhktype-btn ${activebtn === 'bhktype' ? 'active' : ''}`}
          onClick={handleBhkType}
        >
          BHK Type
        </div>
        <div
          className={`filter-btn builduparea-btn ${activebtn === 'builduparea' ? 'active' : ''}`}
          onClick={handleBuildUpArea}
        >
          Build-up-Area
        </div>
        <div
          className={`filter-btn clearfilter-btn ${activebtn === 'builduparea' ? '' : ''}`}
          onClick={handleClearFilters} // Clear filters when clicked
        >
          Clear Filters
        </div>
      </div>

      {/* Render filter options based on the active button */}
      {categorydisplay && (
        <div className="category-card">
          <div
            className={`category-in-btn ${category === 'Residential' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setCategory('Residential'))}
          >
            Residential
          </div>
          <div
            className={`category-in-btn ${category === 'Commercial' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setCategory('Commercial'))}
          >
            Commercial
          </div>
        </div>
      )}

      {propertytypedisplay && (
        <div className="propertytype-card">
          <div
            className={`property-in-btn ${propertyType === 'Flat/Apartment' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Flat/Apartment'))}
          >
            Flat/Apartment
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Independent House/Villa' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Independent House/Villa'))}
          >
            Independent House/Villa
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Plot/Land' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Plot/Land'))}
          >
            Plot/Land
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Farmhouse' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Farmhouse'))}
          >
            Farmhouse
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Office' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Office'))}
          >
            Office
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Retail/Shop' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Retail/Shop'))}
          >
            Retail/Shop
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Storage/Warehouse' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Storage/Warehouse'))}
          >
            Storage/Warehouse
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Industry/Factory' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Industry/Factory'))}
          >
            Industry/Factory
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Hospitality' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Hospitality'))}
          >
            Hospitality
          </div>
          <div
            className={`property-in-btn ${propertyType === 'Others' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setPropertyType('Others'))}
          >
            Others
          </div>
        </div>
      )}

      {statusdisplay && (
        <div className="status-card">
          <div
            className={`status-in-btn ${status === 'Ready to Move' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setStatus('Ready to Move'))}
          >
            Ready to Move
          </div>
          <div
            className={`status-in-btn ${status === 'Under Construction' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setStatus('Under Construction'))}
          >
            Under Construction
          </div>
        </div>
      )}

      {bhkdisplay && (
        <div className="bhk-card">
          <div
            className={`bhk-in-btn ${bhkType === 'Studio' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('Studio'))}
          >
            Studio
          </div>
          <div
            className={`bhk-in-btn ${bhkType === '1BHK' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('1BHK'))}
          >
            1BHK
          </div>
          <div
            className={`bhk-in-btn ${bhkType === '2BHK' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('2BHK'))}
          >
            2BHK
          </div>
          <div
            className={`bhk-in-btn ${bhkType === '3BHK' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('3BHK'))}
          >
            3BHK
          </div>
          <div
            className={`bhk-in-btn ${bhkType === '4BHK' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('4BHK'))}
          >
            4BHK
          </div>
          <div
            className={`bhk-in-btn ${bhkType === '5BHK' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('5BHK'))}
          >
            5BHK
          </div>
          <div
            className={`bhk-in-btn ${bhkType === 'Penthouse' ? 'active-in-btn' : ''}`}
            onClick={() => dispatch(setBhkType('Penthouse'))}
          >
            Penthouse
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
