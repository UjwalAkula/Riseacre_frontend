import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showStep_1: true,
  showStep_2: false,
  showStep_3: false
};


export const PostingSlice=createSlice({
  name:'posting',
  initialState,
  reducers:{
    handleShowStep_1:(state)=>{
      state.showStep_1=true;
      state.showStep_2=false;
      state.showStep_3=false; 
    },
    handleShowStep_2:(state)=>{
      state.showStep_2=true;
      state.showStep_1=false;
      state.showStep_3=false;
    },
    handleShowStep_3:(state)=>{
      state.showStep_3=true;
      state.showStep_1=false;
      state.showStep_2=false;
    }
  }
});

export const {handleShowStep_1,handleShowStep_2,handleShowStep_3}=PostingSlice.actions;

export default PostingSlice.reducer;