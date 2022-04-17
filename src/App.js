import React from 'react';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import Toast from './components/Toast';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Active from './pages/Active/Active';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import Missing from './pages/Missing/Missing';
import Profile from './pages/Profile/Profile';
import Homepage from './pages/Home/Home';
import RequireAuth from './components/RequireAuth';
import MainLayout from './components/MainLayout';
import './App.css';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App({ className }) {
  const toastNotification = useSelector((state) => state.toast.toastData);

  return (
    <div className={`${className}`}>
      {toastNotification && <Toast message={toastNotification?.message} type={toastNotification?.type} time={toastNotification?.time} />}
      <Routes>
        <Route element={<MainLayout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="active" element={<Active />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path='forgot-password' element={<ForgotPassword />} />

          <Route path="/" element={<Homepage />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
