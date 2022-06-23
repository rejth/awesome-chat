import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignUpPage from '../pages/SignUp';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import ChatPage from '../pages/Chat';
import NotFound from '../components/NotFound';
import AccessControl from '../components/AccessControl';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/chat" element={<AccessControl><ChatPage /></AccessControl>} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
