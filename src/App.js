import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  const username= token === null ? '' : token.user.name;
  console.log(token)
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Welome {username}</h1>
        <Dashboard />
    </div>
  );
}

export default App;