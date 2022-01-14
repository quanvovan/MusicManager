import axios from './axios';

const login = (username, password) => {
  return axios.post('/auth/signin', { username, password }).then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const register = (username, email, password) => {
  return axios.post('/auth/signup', { username, email, password });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
};
