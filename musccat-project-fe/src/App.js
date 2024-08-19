import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  BrowserRouter as
  Router,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import { AuthProvider } from './component/contexts/AuthContext';
import styled from 'styled-components';

//Pages
import Login from './component/page/Login';
import Register from './component/page/Register';
import MainPage from './component/page/MainPage';
import EntireScholar from './component/page/EntireScholar';
import RecomScholar from './component/page/RecomScholar';
import Notice from './component/page/Notice';
import MyPage from './component/page/MyPage';
import MemInfo from './component/page/MemInfo';
import MemInfoFirst from './component/page/MemInfoFirst';
import BenefitInfo from './component/page/BenefitInfo';
import BeneInfoRegister from './component/page/BeneInfoRegister';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;

`;


function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
      <AuthProvider>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/users/mypage" element={<MyPage />} />
          <Route path="/meminfo" element={<MemInfo />}/>
          <Route path="/meminfofirst" element={<MemInfoFirst />}/>
          <Route path="/entirescholar" element={<EntireScholar />} />
          <Route path="/recomscholar" element={<RecomScholar />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/benefitinfo/:id" element={<BenefitInfo />} />
          <Route path="/beneinforegister" element={<BeneInfoRegister />} />
        </Routes>
        </AuthProvider>
        </div>
    </Router>
  );
}

export default App;
