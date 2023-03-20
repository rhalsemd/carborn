import axios from "axios";
import { API_URL, applicationjson, ContentType } from "./loginApi";

export const passwordResetCheckApi = async (payload: Object): Promise<any> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/passwordreset`,
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
