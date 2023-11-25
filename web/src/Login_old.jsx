import { useState } from 'react';
import { useNavigate, BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';
import IdPw from './IdPw';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Who': 'Admin'
      },
      body: JSON.stringify({ id, password })
    });
    const data = await response.json();
    if (data.name) {
      setUserData(data);
      navigate('/main', { state: { user: data }, headers: { Who: 'Admin' } });
    } else {
      alert('Invalid ID or password');
    }
  };

  const handleFindIdPw = async () => {
    const response = await fetch('/idPw', {
      method: 'GET',
      headers: {
        'Who': 'Admin'
      }
    });
    if (response.status === 200) {
      navigate('/idPw');
    } else {
      alert('Failed to retrieve ID/PW');
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
          <label>
            ID:
            <input type="text" value={id} onChange={(event) => setId(event.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleFindIdPw}>Find ID/PW</button>
      </div>
      <div>
        <Router>
          <Route exact path="/">
            {/* <Login onLogin={handleLogin} /> */}
            <Login />
          </Route>
          <Route path="/main">
            {/* <Main user={userData} /> */}
            <Main />
          </Route>
          <Route path="/idPw">
            <IdPw />
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default Login;

