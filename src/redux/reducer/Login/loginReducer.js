import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import cookie from 'js-cookie';
import { Navigate, Route } from 'react-router-dom';

const getToken = cookie.get('token');

const initialStateValue = { userName: '', token: getToken, isLoggedIn: !!getToken, prevPath: '', expireIn: '', };
export const loginSlice = createSlice({
  name: 'login',
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    logout: (state, action) => {
      cookie.remove('token');
      state.value = { ...state.value, token: '', isLoggedIn: false, prevPath: action.payload?.prevPath };
      <Route render={() => <Navigate to="/login" replace />} />;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
