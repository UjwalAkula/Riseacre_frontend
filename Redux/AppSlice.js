import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPostPropertyBtn: true,
  showUser: false,
  showAuth:false,
  showSignUp:false,
  loggedIn:false,
};

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleShowPostPropertyBtn: (state) => {
      state.showPostPropertyBtn = false;
    },
    handleShowUser: (state, action) => {
      if (action.payload===false) {
        state.showUser = true;
      } else {
        state.showUser = false;
      }
    },
    handleshowAuth:(state,action)=>{
      if(action.payload===false){
        state.showAuth=true;
        state.showUser=false;
      }else{
        state.showAuth=false;
        state.showSignUp=false;
      }
    },

    handleShowSignUp:(state,action)=>{
      if (action.payload===false) {
        state.showSignUp = true;
      } else {
        state.showSignUp = false;
      }
    },

    handleLoggedIn:(state,action)=>{
      if(action.payload==false){
        state.loggedIn=true;

      }else{
        state.loggedIn=false;
      }
    },

    handleSignOut: (state, action) => {
      const confirmLogout = window.confirm("Are you sure you want to sign out?");
      if (confirmLogout) {
        state.loggedIn = false;
        localStorage.clear();
        window.location.href = '/';
      }
    }
  }
});

export const { 
  handleShowPostPropertyBtn,
  handleShowUser ,
  handleshowAuth,
  handleShowSignUp,
  handleLoggedIn ,
  handleSignOut
} = AppSlice.actions;

export default AppSlice.reducer;
