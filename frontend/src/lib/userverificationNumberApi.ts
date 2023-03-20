import axios from "axios";
import { API_URL, applicationjson, ContentType } from "./loginApi";

export const userverificationNumberApi = async (phoneNumber: string) => {
  try {
    const response = await axios({
      method:'POST',
      url:`${API_URL}/authenticatednumbers`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: {phoneNumber}
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const companyverificationNumberApi = async (phoneNumber: string) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/authenticatednumbers`,
      headers: {
        [ContentType]: applicationjson,
      },
      data: {phoneNumber}
    })
    return response.data;
  } catch (error) {
    throw error;
  }

};
