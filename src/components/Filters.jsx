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

  return (
    <div className="w-full bg-white shadow-xs px-4 mt-6 md:!mt-20 relative py-2 md:py-1 border rounded-sm">
      
      {/* Header Row: Filters title + toggle */}
      <div className="md:hidden flex items-center justify-between mb-2 md:mb-0">
        <h2 className="text-lg font-semibold text-blue-800">Filters</h2>
        <button
          className="text-blue-600 border border-blue-600 px-3 py-1 rounded text-sm font-medium"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter buttons (responsive) */}
      <div className={`${showFilters ? 'block' : 'hidden'} md:flex md:flex-wrap md:gap-2 py-3 space-y-2 md:space-y-0`}>
        {[
          { label: 'Category', key: 'category' },
          { label: 'Property Type', key: 'propertyType' },
          { label: 'Status', key: 'status' },
          { label: 'BHK Type', key: 'bhkType' },
        ].map(({ label, key }) => (
          <div key={key} className="relative">
            <button
              className={`w-full md:w-40 max-h-10 border rounded px-3 py-2 text-sm font-medium transition ${
                activebtn === key
                  ? 'text-blue-700 bg-blue-50 border-blue-700'
                  : 'text-gray-600 border-gray-400'
              }`}
              onClick={() => handleDropdown(key)}
            >
              {label}
            </button>

            {/* Mobile: Dropdown directly below button */}
            {dropdown === key && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-1 z-50 flex flex-col gap-2 p-3 border rounded bg-white shadow-lg max-h-60 overflow-y-auto">
                {key === 'category' && ['Residential', 'Commercial'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      dispatch(setCategory(type));
                      setDropdown('');
                      setActivebtn('');
                    }}
                    className={`rounded-full px-4 py-2 border text-sm ${
                      category === type
                        ? 'bg-blue-50 text-blue-700 border-blue-700'
                        : 'text-gray-600 border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}

                {key === 'propertyType' && [
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
                    className={`rounded-full px-4 py-2 border text-sm ${
                      propertyType === type
                        ? 'bg-blue-50 text-blue-700 border-blue-700'
                        : 'text-gray-600 border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}

                {key === 'status' && ['Ready to Move', 'Under Construction'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      dispatch(setStatus(type));
                      setDropdown('');
                      setActivebtn('');
                    }}
                    className={`rounded-full px-4 py-2 border text-sm ${
                      status === type
                        ? 'bg-blue-50 text-blue-700 border-blue-700'
                        : 'text-gray-600 border-gray-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}

                {key === 'bhkType' && ['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Penthouse'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      dispatch(setBhkType(type));
                      setDropdown('');
                      setActivebtn('');
                    }}
                    className={`rounded-full px-4 py-2 border text-sm ${
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
        ))}

        <button
          className="w-full md:w-32 border border-red-500 text-red-500 hover:bg-red-50 rounded px-3 py-2 text-sm font-medium"
          onClick={() => {
            dispatch(clearFilters());
            setActivebtn('');
            setDropdown('');
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Desktop Dropdowns - positioned absolutely */}
      <div className="hidden md:block">
        {dropdown === 'category' && (
          <div className="absolute top-full left-4 mt-2 z-50 flex flex-col gap-2 p-3 border rounded bg-white shadow-lg w-52">
            {['Residential', 'Commercial'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setCategory(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-2 border text-sm ${
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
          <div className="absolute top-full left-[8.5rem] mt-2 z-50 flex flex-col gap-2 p-3 border rounded bg-white shadow-lg w-64">
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
                className={`rounded-full px-4 py-2 border text-sm ${
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
          <div className="absolute top-full left-[18rem] mt-2 z-50 flex flex-col gap-2 p-3 border rounded bg-white shadow-lg w-52">
            {['Ready to Move', 'Under Construction'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setStatus(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-2 border text-sm ${
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
          <div className="absolute top-full left-[27rem] mt-2 z-50 flex flex-col gap-2 p-3 border rounded bg-white shadow-lg w-52">
            {['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Penthouse'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  dispatch(setBhkType(type));
                  setDropdown('');
                  setActivebtn('');
                }}
                className={`rounded-full px-4 py-2 border text-sm ${
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