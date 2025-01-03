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
import RecomScholarDate from './component/page/RecomScholarDate';
import RecomScholar from './component/page/RecomScholar';
import Notice from './component/page/Notice';
import MyPage from './component/page/MyPage';
import MemInfo from './component/page/MemInfo';
import MyInterest from './component/page/MyInterest';
import BenefitInfo from './component/page/BenefitInfo';
import BeneInfoRegister from './component/page/BeneInfoRegister';
import AddScholar from './component/page/AddScholar';
import Points from './component/page/Points';


function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
      <AuthProvider>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="/users/login" element={<Login />} /> {/*로그인 페이지 */}
          <Route path="/users/register" element={<Register />} /> {/*회원가입 페이지 */}
          <Route path="/main" element={<MainPage />} /> {/*메인 페이지 */}
          <Route path="/users/mypage" element={<MyPage />} /> {/*마이 페이지 */}
          <Route path="/users/meminfo" element={<MemInfo />}/> {/*개인정보 신규 입력 페이지 */}
          <Route path="/users/myinterest" element={<MyInterest />}/> {/*나의 관심목록 페이지 */} 
          <Route path="/entirescholar" element={<EntireScholar />} /> {/*전체 장학금 목록 페이지 */}
          <Route path="/recomscholar" element={<RecomScholar />} /> {/*추천 장학금 목록 페이지 */}
          <Route path="/recomscholardate" element={<RecomScholarDate />} /> {/*추천 장학금 목록 기한 설정 페이지 */}
          <Route path="/notice/:product_id" element={<Notice />} /> {/*장학금 공고 페이지 */}
          <Route path="/reviews/view/:product_id" element={<BenefitInfo />} /> {/*이전 수혜자 정보 페이지 */}
          <Route path="/reviews" element={<BeneInfoRegister />} /> {/*이전 수혜자 정보 입력 페이지 */}
          <Route path="/addscholar" element={<AddScholar />} /> {/*장학금 등록 페이지 */}
          <Route path="/points" element={<Points />} /> {/*포인트 상세 페이지 */}
        </Routes>
        </AuthProvider>
        </div>
    </Router>
  );
}

export default App;
