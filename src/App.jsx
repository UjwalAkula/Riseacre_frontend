import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Landingpage from './components/Landingpage';
import Properties from './components/Properties';
import PropertyInfo from './components/PropertyInfo';
import PostProperty from './components/PostProperty';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landingpage />} />
      <Route path='/properties/:searchInput' element={<Properties />} />
      <Route path='/propertyinfo/:propertyId' element={<PropertyInfo />} />
      <Route path='/postProperty' element={<PostProperty/>} />
    </Routes>
  );
};

export default App;
