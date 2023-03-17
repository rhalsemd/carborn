import axios from "axios"
import { API_URL, applicationjson, ContentType } from "./loginApi"

export const userverificationNumberApi = (phonenum:string) => {
  return axios({
    method: "POST",
    url: `${API_URL}/authenticatednumber`,
    headers: {
      [ContentType]: applicationjson,
    },
    data: {
      phonenumber: phonenum
    }
  }).then((response) => response.data)
};

export const companyverificationNumberApi = (phonenum:string) => {
  return axios({
    method: "POST",
    url: `${API_URL}/authenticatednumber`,
    headers: {
      [ContentType]: applicationjson,
    },
    data : {
      phonenumber: phonenum
    }
  }).then((response) => response.data)
};