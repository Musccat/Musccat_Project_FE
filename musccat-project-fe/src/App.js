import React from 'react';
import {
  BrowserRouter as
  Router,
  Routes,
  Route
} from "react-router-dom";
import { AuthProvider } from './component/contexts/AuthContext';
import styled from 'styled-components';

//Pages
import Login from './component/page/Login';
import MainPage from './component/page/MainPage';




function App(props) {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="main" element={<MainPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
