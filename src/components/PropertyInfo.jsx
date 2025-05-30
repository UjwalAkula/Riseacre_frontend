import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../data/Apipath';
import './PropertyStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faAngleLeft,faAngleRight,faPhone} from '@fortawesome/free-solid-svg-icons';
import PropertyHighlights from './PropertyHighlights';
import Connectivity from './Connectivity';
import Amenities from './Amenities';
import ListerandEngage from './ListerandEngage';
import PropertiesNavBar from './PropertiesNavBar';
import { useLocation } from 'react-router-dom';
import UserActivity from './UserActivity';
import { useSelector } from 'react-redux';
import Authentication from './Authentication';
import Viewphone from './Viewphone';

const PropertyInfo = () => {

  const {showUser,showAuth}=useSelector((state)=>state.app);
  const page_location=useLocation();

  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [count,setCount]=useState(0);
  const [propertyHighlight, setPropertyHighlight] = useState(true);
  const [locationConnectivity, setLocationConnectivity] = useState(false);
  const [amenitiesFeatures, setAmenitiesFeatures] = useState(false);
  const [listerEngagement, setListerEngagement] = useState(false);
  const [activeSection, setActiveSection] = useState("propertyHighlight");
  const [showphone, setShowphone] = useState(false);



  const { propertyId } = useParams(); // Correct usage of useParams

  const getProperty = async () => {
    try {
      const response = await fetch(`${API_URL}/listings/get-property/${propertyId}`); // Await fetch response
      if (response.ok) {
        const data = await response.json();
        setProperty(data.property);
      } else {
        setError('Something went wrong while fetching property.');
      }
    } catch (error) {
      setError('Failed to fetch property.');
      console.error(error);
    }
  };

  const handlePropertyHighlights = () => {
    setActiveSection("propertyHighlight");
    setPropertyHighlight(true);
    setLocationConnectivity(false);
    setAmenitiesFeatures(false);
    setListerEngagement(false);
  };
  
  const handleLocationConnectivity = () => {
    setActiveSection("locationConnectivity");
    setPropertyHighlight(false);
    setLocationConnectivity(true);
    setAmenitiesFeatures(false);
    setListerEngagement(false);
  };
  
  const handleAmenitiesFeatures = () => {
    setActiveSection("amenitiesFeatures");
    setPropertyHighlight(false);
    setLocationConnectivity(false);
    setAmenitiesFeatures(true);
    setListerEngagement(false);
  };
  
  const handleListerEngagement = () => {
    setActiveSection("listerEngagement");
    setPropertyHighlight(false);
    setLocationConnectivity(false);
    setAmenitiesFeatures(false);
    setListerEngagement(true);
  };
  
  

  // Call the getProperty function when the component mounts or when propertyId changes
  useEffect(() => {
    getProperty();
  }, [propertyId]);

  // Display error if there's any
  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  // Display loading state if property is not available yet
  if (!property) {
    return (
      <div className="loading">
        <p>Loading property details...</p>
      </div>
    );
  }

  const renderBuilderCertifications = (certifications) => {
    if (certifications && certifications!=='NA') {
      return (
        <span className='certificate' style={{color:'#28A745'}} >
          <FontAwesomeIcon icon={faCheck} size="lg" style={{color: "#28A745",}}/> {certifications}
        </span>
      );
    }
  };

  const previousImage=()=>{
    if(count>0){
      setCount(count - 1);
    }
  }

  const nextImage=()=>{
    if(count<property.photos.length-1){
      setCount(count + 1);
    }
  }


  const isPropertyInfoPage=page_location.pathname===`/propertyinfo/${propertyId}`;


  return (
    <div className='property-page'>
      {showAuth && isPropertyInfoPage && <Authentication/>}
      { showUser && isPropertyInfoPage &&<div className="user-page">
        <UserActivity/>
      </div>}
      <PropertiesNavBar/>
      <div className='property-info-container'>
      <div className="property-section">
        <div className="header">
          <div className="property-title">
            <h2>{property.propertyName}</h2>
            <span>{renderBuilderCertifications(property.builderCertifications)}</span>
          </div>
          <div className="header-content">
            <div className='basic-info'>
              {property.builderCompany && <p style={{fontWeight:'bold',color:'#777777'}}>By {property.builderCompany}</p>}
              {property.propertyType  && property.purpose && <p>{property.propertyType} for {property.purpose}</p>}
              {property.category && property.constructionType && <p>{property.category} | {property.constructionType}</p>}
            </div>
            <div className="btn-container">
              <button style={{backgroundColor:'white',color:'#055CB4'}} onClick={()=>{setShowphone(true)}}><b>View Phone</b></button>
              { showphone && <Viewphone property={property} setShowphone={setShowphone}/>}
              <button><FontAwesomeIcon icon={faPhone} size='sm' style={{color: "white",}} />  <b>Contact</b></button>
            </div>
          </div>
        </div>
        <div className="image-section" >
          <span className='left-arrow' onClick={previousImage}><FontAwesomeIcon icon={faAngleLeft} size="2xl" style={{color: "#858585",}} />
          </span>
          {property.photos && property.photos.length>0 && <img src={`${API_URL}/listings/uploads/${property.photos[count]}`} alt={property.photos[count]}/>}
          <span className='right-arrow' onClick={nextImage} ><FontAwesomeIcon icon={faAngleRight} size="2xl" style={{color: "#858585",}} />
          </span>
        </div>

        <div className="details-section">
          <div className="info-nav">
            <div className={`detail-header ${activeSection === "propertyHighlight" ? "active-button" : ""}`} onClick={handlePropertyHighlights} >Property Highlights</div>
            <div className={`detail-header ${activeSection === "locationConnectivity" ? "active-button" : ""}`} onClick={handleLocationConnectivity } >Location and Connectivity</div>
            <div className={`detail-header ${activeSection === "amenitiesFeatures" ? "active-button" : ""}`} onClick={handleAmenitiesFeatures} >Amenities and Features</div>
            <div className={`detail-header ${activeSection === "listerEngagement" ? "active-button" : ""}`} onClick={handleListerEngagement} >Lister and Engagement</div>
          </div>
          {propertyHighlight && <PropertyHighlights property={property}/>}
          {locationConnectivity && <Connectivity property={property}/>}
          {amenitiesFeatures && <Amenities property={property} />}
          {listerEngagement && <ListerandEngage property={property} />}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyInfo;
