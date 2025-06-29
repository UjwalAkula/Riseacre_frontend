import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategory,
  setPropertyType,
  setStatus,
  setBhkType,
  clearFilters,
} from '../../Redux/FiltersSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const { category, propertyType, status, bhkType } = useSelector((state) => state.filters);

  const [activebtn, setActivebtn] = useState('');
  const [dropdown, setDropdown] = useState('');
  const [showFilters, setShowFilters] = useState(false); // mobile toggle

  const handleDropdown = (key) => {
    setDropdown(dropdown === key ? '' : key);
    setActivebtn(activebtn === key ? '' : key);
  };

  const getDropdownPositionClass = (key, index) => {
    // Desktop positioning (unchanged)
    const desktopPositions = {
      category: 'left-0',
      propertyType: 'left-[8.5rem]',
      status: 'left-[18rem]',
      bhkType: 'left-[27rem]'
    };

    // Mobile/tablet positioning - stack vertically or use responsive positioning
    const mobilePositions = {
      category: 'left-0',
      propertyType: 'left-0 sm:left-[8.5rem]',
      status: 'left-0 sm:left-[18rem]',
      bhkType: 'left-0 sm:left-[27rem]'
    };

    return `${mobilePositions[key]} lg:${desktopPositions[key]}`;
  };

  return (
    <div className="w-full bg-white shadow-xs px-4 mt-6 md:!mt-16 relative py-2 border rounded-sm">
      
      {/* Header Row: Filters title + toggle */}
      <div className="md:hidden flex items-center justify-between mb-2 md:mb-0">
        <h2 className="text-3xl md:text-base font-semibold text-blue-800">Filters</h2>
        <button
          className=" text-blue-600 border border-blue-600 px-3 py-1 rounded text-bold text-3xl md:text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter buttons (responsive) */}
      <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-wrap gap-2 py-3`}>
        {[
          { label: 'Category', key: 'category' },
          { label: 'Property Type', key: 'propertyType' },
          { label: 'Status', key: 'status' },
          { label: 'BHK Type', key: 'bhkType' },
        ].map(({ label, key }) => (
          <button
            key={key}
            className={`w-full md:w-40 max-h-10 border rounded px-3 py-1 text-md font-bold transition ${
              activebtn === key
                ? 'text-blue-700 bg-blue-50 border-blue-700'
                : 'text-gray-600 border-gray-400'
            }`}
            onClick={() => handleDropdown(key)}
          >
            {label}
          </button>
        ))}

        <button
          className="w-full md:w-32 border border-red-500 text-red-500 hover:bg-red-50 rounded px-3 py-1 text-sm font-medium"
          onClick={() => {
            dispatch(clearFilters());
            setActivebtn('');
            setDropdown('');
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Dropdowns */}
      <div className="absolute top-full left-4 mt-2 z-50 space-y-4">
        {dropdown === 'category' && (
          <div className="absolute left-0 flex flex-col gap-2 p-3 border rounded bg-white shadow w-full md:w-52 max-w-sm">
            {['Residential', 'Commercial'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setCategory(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-1 border text-sm ${
                  category === type
                    ? 'bg-blue-50 text-blue-700 border-blue-700'
                    : 'text-gray-600 border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {dropdown === 'propertyType' && (
          <div className="absolute left-0 md:left-[8.5rem] flex flex-col gap-2 p-3 border rounded bg-white shadow w-full md:w-64 max-w-sm">
            {[
              'Flat/Apartment',
              'Independent House/Villa',
              'Plot/Land',
              'Farmhouse',
              'Office',
              'Retail/Shop',
              'Storage/Warehouse',
              'Industry/Factory',
              'Hospitality',
              'Others',
            ].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setPropertyType(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-1 border text-sm ${
                  propertyType === type
                    ? 'bg-blue-50 text-blue-700 border-blue-700'
                    : 'text-gray-600 border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {dropdown === 'status' && (
          <div className="absolute left-0 md:left-[18rem] flex flex-col gap-2 p-3 border rounded bg-white shadow w-full md:w-52 max-w-sm">
            {['Ready to Move', 'Under Construction'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setStatus(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-1 border text-sm ${
                  status === type
                    ? 'bg-blue-50 text-blue-700 border-blue-700'
                    : 'text-gray-600 border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {dropdown === 'bhkType' && (
          <div className="absolute left-0 md:left-[27rem] flex flex-col gap-2 p-3 border rounded bg-white shadow w-full md:w-52 max-w-sm">
            {['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Penthouse'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setBhkType(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-1 border text-sm ${
                  bhkType === type
                    ? 'bg-blue-50 text-blue-700 border-blue-700'
                    : 'text-gray-600 border-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;