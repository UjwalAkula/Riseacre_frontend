import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Step 1 - Basic Property Details
  purpose: '',
  propertyType: '',
  propertyName: '',
  category: '',
  constructionType: '',
  bhkConfig: '',
  locality: '',
  nearbyLandmarks: '',
  pinCode: '',
  city: '',
  state: '',
  carpetArea: null,
  buildupArea: null,
  floorNumber: null,
  totalFloors: null,
  propertyAge: null,

  // Step 2 - Property Features & Pricing
  amenities: [],
  connectivity: {
    metro: null,
    airport: null,
    busStation: null,
    railwayStation: null,
    school: null,
    hospital: null,
  },
  balcony: false,
  bedrooms: null,
  bathrooms: null,
  halls: null,
  expectedPrice: null,
  monthlyRent: null,
  priceNegotiable: false,
  maintenanceCharges: null,
  bookingAmount: null,
  description: '',

  // Step 3 - Lister Info & Photos
  listerType: '',
  listingType: '',
  listerName: '',
  listerPhone: '', // Storing phone as string to handle leading zeros
  listerEmail: '',
  builderCompany: '',
  builderCertifications: '',
  photos: [],

  currentStep: 1, // To handle navigation between steps
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    handleStepChange: (state, action) => {
      state.currentStep = action.payload;
    },

    // Step 1 reducers
    setPurpose: (state, action) => {
      state.purpose = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setPropertyName: (state, action) => {
      state.propertyName = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setConstructionType: (state, action) => {
      state.constructionType = action.payload;
    },
    setBhkConfig: (state, action) => {
      state.bhkConfig = action.payload;
    },
    setLocality: (state, action) => {
      state.locality = action.payload;
    },
    setNearbyLandmarks: (state, action) => {
      state.nearbyLandmarks = action.payload;
    },
    setPinCode: (state, action) => {
      state.pinCode = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCarpetArea: (state, action) => {
      state.carpetArea = action.payload ? Number(action.payload) : null;
    },
    setBuildupArea: (state, action) => {
      state.buildupArea = action.payload ? Number(action.payload) : null;
    },
    setFloorNumber: (state, action) => {
      state.floorNumber = action.payload ? Number(action.payload) : null;
    },
    setTotalFloors: (state, action) => {
      state.totalFloors = action.payload ? Number(action.payload) : null;
    },
    setPropertyAge: (state, action) => {
      state.propertyAge = action.payload ? Number(action.payload) : null;
    },

    // Step 2 reducers
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    setConnectivity: (state, action) => {
      state.connectivity = { ...state.connectivity, ...action.payload };
    },
    setBalcony: (state, action) => {
      state.balcony = action.payload === 'Yes' || action.payload === true;
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload ? Number(action.payload) : null;
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload ? Number(action.payload) : null;
    },
    setHalls: (state, action) => {
      state.halls = action.payload ? Number(action.payload) : null;
    },
    setExpectedPrice: (state, action) => {
      state.expectedPrice = action.payload ? Number(action.payload) : null;
    },
    setMonthlyRent: (state, action) => {
      state.monthlyRent = action.payload ? Number(action.payload) : null;
    },
    setPriceNegotiable: (state, action) => {
      state.priceNegotiable = action.payload === 'Yes' || action.payload === true;
    },
    setMaintenanceCharges: (state, action) => {
      state.maintenanceCharges = action.payload ? Number(action.payload) : null;
    },
    setBookingAmount: (state, action) => {
      state.bookingAmount = action.payload ? Number(action.payload) : null;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },

    // Step 3 reducers
    setListerType: (state, action) => {
      const validListerTypes = ["Owner", "Broker", "Builder"]; // Adjust as needed
      state.listerType = validListerTypes.includes(action.payload) ? action.payload : "";
    },
    setListingType: (state, action) => {
      const validListingTypes = ["Basic", "Premium","Featured"]; // Adjust as needed
      state.listingType = validListingTypes.includes(action.payload) ? action.payload : "";
    },
    setListerName: (state, action) => {
      state.listerName = action.payload;
    },
    setListerPhone: (state, action) => {
      state.listerPhone = action.payload;
    },
    setListerEmail: (state, action) => {
      state.listerEmail = action.payload;
    },
    setBuilderCompany: (state, action) => {
      state.builderCompany = action.payload;
    },
    setBuilderCertifications: (state, action) => {
      state.builderCertifications = action.payload;
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },

    // Reset the form data to initial state
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  handleStepChange,
  setPurpose,
  setPropertyType,
  setPropertyName,
  setCategory,
  setConstructionType,
  setBhkConfig,
  setLocality,
  setNearbyLandmarks,
  setPinCode,
  setCity,
  setState,
  setCarpetArea,
  setBuildupArea,
  setFloorNumber,
  setTotalFloors,
  setPropertyAge,
  setAmenities,
  setConnectivity,
  setBalcony,
  setBedrooms,
  setBathrooms,
  setHalls,
  setExpectedPrice,
  setMonthlyRent,
  setPriceNegotiable,
  setMaintenanceCharges,
  setBookingAmount,
  setDescription,
  setListerType,
  setListingType,
  setListerName,
  setListerPhone,
  setListerEmail,
  setBuilderCompany,
  setBuilderCertifications,
  setPhotos,
  resetForm,
} = listingSlice.actions;

export default listingSlice.reducer;
