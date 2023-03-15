import axios from 'axios';
import { API_URL } from './loginApi';

export const getTermsOfUseApi = async () => {
  const response = await axios({
    method: 'GET',
    url: `${API_URL}/termsofuse`,
  });
  return response.data
};

