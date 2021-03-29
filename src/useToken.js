import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    if(userToken!==undefined){
      const tokenTime =userToken.expires.split('.')[0]
      const dateAndTime= ISODateString(new Date())
      function ISODateString(dateAndTime){
        function pad(n){
          return n<10 ? '0'+n : n
        }
        return dateAndTime.getUTCFullYear()+'-'
        + pad(dateAndTime.getUTCMonth()+1)+'-'
        + pad(dateAndTime.getUTCDate())+'T'
        + pad(dateAndTime.getUTCHours())+':'
        + pad(dateAndTime.getUTCMinutes())+':'
        + pad(dateAndTime.getUTCSeconds())
      }
      if (tokenTime <= dateAndTime){
        alert("Session expired please login again");
        localStorage.clear();
      }
      else{
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
      }
    }
  };
  
  return {
    setToken: saveToken,
    token
  }
}