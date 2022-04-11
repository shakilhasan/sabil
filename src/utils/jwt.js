import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axiosApi from '../helpers/api_helper';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // ----------------------------------------------------------------------

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

//  const handleTokenExpired = (exp) => {
//   let expiredTimer;

//   window.clearTimeout(expiredTimer);
//   const currentTime = Date.now();
//   const timeLeft = exp * 1000 - currentTime;
//   console.log(timeLeft);
//   expiredTimer = window.setTimeout(() => {
//     console.log('expired');
//     // You can do what ever you want here, like show a notification
//   }, timeLeft);
// };

// ----------------------------------------------------------------------

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axiosApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axiosApi.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession, verify, sign };
