import React from "react";
import "./Main.css";
import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';



function Main() {
  return (
    <div>
      {/* 홈 */}
      <div className="nav_main_brand">
        {/* <h3>메인화면</h3> */}
        <img src={"logo.png"} alt="로고" style={{ width: '100%', marginBottom: '2rem', marginLeft: '1rem' }} />
      </div>
    </div>
  );
}

export default Main;
