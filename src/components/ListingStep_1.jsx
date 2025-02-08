import React from 'react'
import './PostPropertyStyles.css'

const ListingStep_1 = () => {
  // List of property types
  const propertyTypes = [
    'Flat/Apartment', 
    'Independent House/Villa', 
    'Plot/Land', 
    'Farmhouse',
    'Office', 
    'Retail/Shop', 
    'Storage/Warehouse', 
    'Industry/Factory',
    'Hospitality', 
    'Others'
  ];

  const bhkconfiguration=['Studio', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK', 'Penthouse'];

  return (
    <div className='propertyBasics-section'>
      <h3>Basic Property Details</h3>
      
      <div className="form-details">
        {/* Purpose Dropdown */}
      <div className="purpose">
        <select className='purpose-dropdown dropdowns'>
          <option disabled selected className='labeling'>Purpose</option>
          <option>Sell</option>
          <option>Rent/Lease</option>
        </select>
      </div>
      
      {/* Property Type Dropdown */}
      <div className="property-type">
        <select className='property-type-dropdown dropdowns'>
          <option disabled selected className='labeling'>Property Type</option>
          {/* Dynamically populate property types */}
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* BHk configuration */}
      <div className="bhkconfiguration">
        <select className='bhkconfiguration-dropdown dropdowns'>
          <option disabled selected className='labeling'>Configuration</option>
          {bhkconfiguration.map((item,index)=>{
            return (<option key={index}>{item}</option>)
          })}
        </select>

        {/* PIN code*/}
        <div className="pincode-section">
          <label className='labeling'>PIN Code</label>
          <br/>
          <input type='number' placeholder='enter pin code'></input>
        </div>
      </div>   
    </div>
    </div>
  );
}

export default ListingStep_1;
