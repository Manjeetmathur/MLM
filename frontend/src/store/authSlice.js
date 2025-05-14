import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
       name: 'auth',
       initialState: {
              isAuthenticated: false,
              token: null,
              user:"",
              isAdmin:false
       },
       reducers: {
              login: (state, action) => {
                     state.isAuthenticated = true;
                     state.token = action.payload.token;
                     if(action.payload.admin){
                            state.isAdmin=true
                     }else{
                            state.isAdmin=false
                     }
              },
              userData: (state, action) => {
                     state.user = action.payload;
              },
              logout: (state) => {
                     state.isAuthenticated = false;
                     state.token = null;
              },
       },
});

export const { login, logout ,userData} = authSlice.actions;
export default authSlice.reducer;