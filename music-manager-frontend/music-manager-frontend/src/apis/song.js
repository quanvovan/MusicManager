import axios from './axios';

const getAll = (params) => {
  return axios.get('/song', { params });
};

const get = (id) => {
  return axios.get(`/song/${id}`);
};

const create = (data, onUploadProgress) => {
  return axios.post('/song', data, { onUploadProgress });
};

const update = (id, data) => {
  return axios.put(`/song/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`/song/${id}`);
};

const removeMany = (data) => {
  return axios.post(`/song/delete`, data);
};

const findByName = (name) => {
  return axios.get(`/song?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeMany,
  findByName,
};
