import axios from "axios";
import { API_URL } from "./loginApi";

export const userpasswordCheckApi = (password: string): Promise<any> => {
  return axios({
    method: "GET",
    url: `${API_URL}/userpasswordcheck`,
  }).then((response) => response.data)
};

export const companypasswordCheckApi = (password: string): Promise<any> => {
  return axios({
    method: "GET",
    url: `${API_URL}/companypasswordcheck`,
  }).then((response) => response.data)
};