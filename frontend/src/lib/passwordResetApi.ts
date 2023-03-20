import axios from "axios";
import { API_URL, applicationjson, ContentType } from "./loginApi";

export const passwordResetApi = async (payload: Object): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/newpassword`,
      headers: {
        [ContentType]: applicationjson
      },
      data: payload
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error;
  }
};
