import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, Navigate, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContext } from './App';
import "./All.css";

function LoginForm() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://ceprj.gachon.ac.kr:60001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Who': 'Admin'
      },
      body: JSON.stringify({ id, passwd })
    });
    if (response.ok) {
      // 로그인 성공
      // App의 props뭐시기 상태 ==> true 변경
      setIsLoggedIn(!isLoggedIn);
      navigate('/main');
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className='loginPage'>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={"logo.png"} alt="로고" style={{ width: '50%', marginBottom: '2rem' }} />
        <label htmlFor="username" style={{ fontSize: '1.2rem' }}>아이디:</label>
        <input type="text" id="username" value={id} onChange={(e) => setId(e.target.value)} name="id" style={{ fontSize: '1.2rem', padding: '0.5rem', marginBottom: '1rem', textAlign: 'center' }} />
        <label htmlFor="password" style={{ fontSize: '1.2rem' }}>Password:</label>
        <input type="password" id="password" value={passwd} onChange={(e) => setPasswd(e.target.value)} name="passwd" style={{ fontSize: '1.2rem', padding: '0.5rem', marginBottom: '1rem', textAlign: 'center' }} />
        <button type="submit" style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', backgroundColor: 'lightgreen', border: 'none', borderRadius: '0.5rem' }}>로그인</button>
        <Link to="/idPw">아이디/비번 찾기</Link>

      </form>
    </div>
  );
}
export default LoginForm;
