import axios from "axios";
import { API_URL } from "./loginApi";

export const useridCheckApi = (id: string): Promise<any> => {
  return axios({
    method: "GET",
    url: `${API_URL}/useridcheck`,
  }).then((response) => response.data)
};

export const companyidCheckApi = (id: string): Promise<any> => {
  return axios({
    method: "GET",
    url: `${API_URL}/companyidcheck`,
  }).then((response) => response.data)
};