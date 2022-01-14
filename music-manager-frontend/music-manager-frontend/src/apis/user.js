import axios from './axios';
import authHeader from './auth-header';

const getPublicContent = () => {
  return axios.get('/test/all');
};

const getResourceUser = () => {
  return axios.get('/test/user', { headers: authHeader() });
};

const getResourceMod = () => {
  return axios.get('/test/mod', { headers: authHeader() });
};

const getResourceAdmin = () => {
  return axios.get('/test/admin', { headers: authHeader() });
};

export default {
    getPublicContent,
    getResourceUser,
    getResourceMod,
    getResourceAdmin
}
