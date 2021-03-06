import { useState } from 'react';

export default function useToken() {
  const dateAndTime = ISODateString(new Date())
  function ISODateString(dateAndTime) {
    function pad(n) {
      return n < 10 ? '0' + n : n
    }
    return dateAndTime.getUTCFullYear() + '-'
      + pad(dateAndTime.getUTCMonth() + 1) + '-'
      + pad(dateAndTime.getUTCDate()) + 'T'
      + pad(dateAndTime.getUTCHours()) + ':'
      + pad(dateAndTime.getUTCMinutes()) + ':'
      + pad(dateAndTime.getUTCSeconds())
  }
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if (userToken !== null) {
      const tokenTime = userToken.expires.split('.')[0]

      if (tokenTime <= dateAndTime) {
        alert("Session expired please login again");
        localStorage.clear();
        return {};
      }
      else {
        return userToken
      }
    }
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken, rememberMe) => {
    if (userToken !== undefined) {
      const tokenTime = userToken.expires.split('.')[0]
      if (tokenTime <= dateAndTime) {
        alert("Session expired please login again");
        localStorage.clear();
      }
      else {
        if (rememberMe) {
          localStorage.setItem('token', JSON.stringify(userToken));
        }
        else {
          sessionStorage.setItem('token', JSON.stringify(userToken));
        }
        setToken(userToken);
      }
    }
  };

  return {
    setToken: saveToken,
    token
  }
}