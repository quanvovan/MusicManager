import axios from 'axios';

import { API_URL } from '../constants/Contants';

export default axios.create({
  baseURL: API_URL,
});
