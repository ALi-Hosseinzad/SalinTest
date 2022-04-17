import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducer/Login/loginReducer';
import toast from '../reducer/Toast/toastReducer';
import profile  from '../reducer/Profile/profileReducer';


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    login: loginReducer,
    toast,
    profile
  },
});
