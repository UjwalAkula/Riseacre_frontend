import React, { createContext, useState, useContext } from 'react';

const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bhkType,setBhkType]=useState('');
  const [status,setStatus]=useState('');

  return (
    <PropertyContext.Provider value={{ searchInput, setSearchInput,purpose, setPurpose, category, setCategory, propertyType, setPropertyType,status,setStatus,bhkType,setBhkType }}>
      {children}
    </PropertyContext.Provider>
  );
};

