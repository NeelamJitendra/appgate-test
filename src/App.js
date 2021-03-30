import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import useToken from './useToken';
import IconButton from '@material-ui/core/IconButton';
import LogOut from '@material-ui/icons/ExitToApp';

function App() {
  const { token, setToken } = useToken();
  const username = token === undefined ? '' : token.user.name;
  if (!token) {
    return <Login setToken={setToken} />
  }

  const logOutUser = () => {
    window.location.reload(false);
    localStorage.clear();
  }

  return (
    <div className="wrapper">
      <div className="heading">
      <h1>Welome {username}</h1>
      <IconButton title="Logout user" component="span" onClick={() => {logOutUser()}}>
        <LogOut />
      </IconButton>
      </div>
      <Dashboard token={token.token} />
    </div>
  );
}

export default App;