import './App.css';
import React, { useState, useContext } from 'react';
import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from "./FirstPage";
import LoginForm from "./Login";
import Main from "./Main";
import IdPw from "./IdPw";
import NewPasswd from "./NewPasswd";
import Myinfo from "./Myinfo";
import PasswdAuth from "./PasswdAuth";
import Logout from "./Logout";
import User from "./User";
import UserDetail from './UserDetail';
import TrashHis from './TrashHis';
import QnA from "./QnA";
import QnADetail from "./QnADetail";
import QnAReply from "./QnAReply";
import Manual from "./Manual";
import NewManual from './NewManual';
import ManualDetail from './ManualDetail';
import ManualUpdate from './ManualUpdate';
import Trashcan from "./Trashcan";
import NewTrashcan from "./NewTrashcan";
import TrashcanDetail from "./TrashcanDetail";
import Feedback from "./Feedback";
import AI from "./AI";
import Admin from "./Admin";
import AdminDetail from './AdminDetail';
import NewAdmin from "./NewAdmin";
import AdminUpdate from "./AdminUpdate";
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.png';

export const LoginContext = React.createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (isLoggedIn) {
    return (
      <div className="all_css_inApp">
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <BrowserRouter>
            {/* 조건문: 로그인O => 보여주기..! 근데, 다른 쪽에서만!!!
          ==> isLoggedIn 변수 : 외부에서도 참조 가능하도록 ==> 아마 props?
        */}
            <div className="onlyForAdmin">
              <div className="topbar">
                {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
                <div className="header">
                  {/* <div className="container-fluid"> */}
                  {/* <div className="navbar-brand">
                  <div className="-logo bg-black"> */}
                  <Link to="/main">
                    <img src={logo} alt="로고" className="logo" />
                  </Link>
                  {/* </div>
                </div> */}
                  <div className='buttons'>
                    <Link to="/myinfo"><button className="myinfoedition">내 정보 수정</button></Link>
                    <Link to="/logout"><button className="logtoutedition">로그아웃</button></Link>
                  </div>
                  {/* <img src={"./logo.png"} alt="로고" classNmae='logo' /> */}
                  {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button> */}
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
              <div className="sidebarcontainer">
                <div className='sidebar'>
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
                      <Link className="nav-link text-success" to="/feedback">AI 분류 결과 및 피드백</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-success" to="/aiManage">AI 버전 관리 및 훈련</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-success" to="/admins">관리자 정보관리</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="main-container-back">
                <div className="main-content-inner">
                  <Routes>
                    <Route path="/" element={<FirstPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/idPw" element={<IdPw />} />
                    <Route path="/newPasswd" element={<NewPasswd />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/myinfo" element={<Myinfo />} />
                    <Route path="/passwdAuth" element={<PasswdAuth />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/users/:user_num" element={<UserDetail />} />
                    <Route path="/users/:user_num/trashHis" element={<TrashHis />} />
                    <Route path="/qna" element={<QnA />} />
                    <Route path="/qna/:qna_num" element={<QnADetail />} />
                    <Route path="/qna/:qna_num/reply" element={<QnAReply />} />
                    <Route path="/manual" element={<Manual />} />
                    <Route path="/manual/newManual" element={<NewManual />} />
                    <Route path="/manual/:manual_num" element={<ManualDetail />} />
                    <Route path="/manual/:manual_num/editing" element={<ManualUpdate />} />
                    <Route path="/trashcan" element={<Trashcan />} />
                    <Route path="/trashcan/newTrashcan" element={<NewTrashcan />} />
                    <Route path="/trashcan/:town_num" element={<TrashcanDetail />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/aiManage" element={<AI />} />
                    <Route path="/admins" element={<Admin />} />
                    <Route path="/admins/newAdmin" element={<NewAdmin />} />
                    <Route path="/admins/:admin_num" element={<AdminDetail />} />
                    <Route path="/admins/:admin_num/editing" element={<AdminUpdate />} />
                    <Route path="/newadmin" element={<NewAdmin />} />
                    <Route path="/newpasswd" element={<NewPasswd />} />
                  </Routes>
                </div>
              </div>
            </div>
          </BrowserRouter>
        </LoginContext.Provider >
        <footer className="footer">
          <h6>2023-2 졸업 프로젝트 1팀 10분</h6>
        </footer>
      </div>
    );
  }
  else {
    return (
      <div clssName="all_css_inApp">
        <div className="LoginPage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<FirstPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/idPw" element={<IdPw />} />
                <Route path="/newPasswd" element={<NewPasswd />} />
                <Route path="/main" element={<Main />} />
              </Routes>
            </BrowserRouter>
          </LoginContext.Provider>
        </div>
        <footer className="footer">
          <h6>2023-2 졸업 프로젝트 1팀 책거리 북클럽</h6>
        </footer>
      </div>
    );
  }
}


export default App;
