import axios from 'axios';
import { User } from '../modules/loginModule';

export const API_URL = 'http://localhost:3001';

export const ContentType = 'Content-Type';
export const applicationjson = 'application/json';

export const loginApi = async (payload:User): Promise<User> => {
  const response = await axios({
    method: 'POST',
    url: `${API_URL}/users`,
    headers: {
      [ContentType]: applicationjson,
    },
    data: payload
  });

  return response.data 
};