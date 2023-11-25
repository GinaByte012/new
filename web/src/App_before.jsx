import './App.css';
import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from "./Login";
import Main from "./Main";
import IdPw from "./IdPw";
import NewPasswd from "./NewPasswd";
import Myinfo from "./Myinfo";
import PasswdAuth from "./PasswdAuth";
import Logout from "./Logout";
import User from "./User";
import UserDetail from './UserDetail';
import QnA from "./QnA";
import QnADetail from "./QnADetail";
import Manual from "./Manual";
import NewManual from './NewManual';
import ManualDetail from './ManualDetail';
import Trashcan from "./Trashcan";
import NewTrashcan from "./NewTrashcan";
import TrashcanDetail from "./TrashcanDetail";
import AI from "./AI";
import Admin from "./Admin";
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.png';

export const LoginContext = React.createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn) {
    return (
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          {/* 조건문: 로그인O => 보여주기..! 근데, 다른 쪽에서만!!!
          ==> isLoggedIn 변수 : 외부에서도 참조 가능하도록 ==> 아마 props?
        */}
          <div className="onlyForAdmin">
            <div className="topbar bg-black">
              {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
              <div className="header">
                {/* <div className="container-fluid"> */}
                <div className="navbar-brand">
                  <div className="-logo bg-black">
                    <img src={logo} alt="로고" />
                  </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/myinfo">내 정보 수정</Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout">로그아웃</Link>
                    </li>
                  </ul>
                </div>
                {/* <Link className="navbar-brand" to="/main"><img src={logo} alt="로고" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/myinfo">내 정보 수정</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout">로그아웃</Link>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
            <div className='sidebar bg-dark'>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/users">회원 관리</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/qna">회원 문의 관리</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/manual">분리배출 매뉴얼 관리</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/trashcan">공공쓰레기통 위치 관리</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/ai">AI 관리</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/admins">관리자 정보관리</Link>
                </li>
              </ul>
            </div>
            <div className="main-content-inner">
              <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/idPw" element={<IdPw />} />
                <Route path="/newPasswd" element={<NewPasswd />} />
                <Route path="/main" element={<Main />} />
                <Route path="/myinfo" element={<Myinfo />} />
                <Route path="/passwdAuth" element={<PasswdAuth />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/users" element={<User />} />
                <Route path="/users/:userNum" element={<UserDetail />} />
                <Route path="/qna" element={<QnA />} />
                <Route path="/qna/:qna_num" element={<QnADetail />} />
                <Route path="/manual" element={<Manual />} />
                <Route path="/manual/newManual" element={<NewManual />} />
                <Route path="/manual/:manual_num" element={<ManualDetail />} />
                <Route path="/trashcan" element={<Trashcan />} />
                <Route path="/newtrashcan" element={<NewTrashcan />} />
                <Route path="/trashcan/:trashcan_num" element={<TrashcanDetail />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/admins" element={<Admin />} />
                <Route path="/newpasswd" element={<NewPasswd />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </LoginContext.Provider >
    );
  }
  else {
    return (
      <div className="LoginPage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/idPw" element={<IdPw />} />
              <Route path="/newPasswd" element={<NewPasswd />} />
              <Route path="/main" element={<Main />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </div>
    );
  }
}


export default App;
