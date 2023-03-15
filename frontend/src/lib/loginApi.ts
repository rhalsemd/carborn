import axios from 'axios';
import { User } from '../modules/loginModule';

export const API_URL = 'http://localhost:3001';

export const ContentType = 'Content-Type';
export const applicationjson = 'application/json';

export const loginApi = async (user:User): Promise<User> => {
  const response = await axios({
    method: 'POST',
    url: `${API_URL}/users`,
    headers: {
      [ContentType]: applicationjson,
    },
    data: {
      userid: user.userid,
      userpassword: user.userpassword,
    },
  });
  
  return response.data 
};