import axios from "axios";
import { API_URL, applicationjson, ContentType } from "./loginApi";

export const searchidCheckApi = async (payload: { name: string, isVerify: boolean}): Promise<any> => {
  const response = await axios({
    method: "POST",
    url: `${API_URL}/searchid`,
    headers: {
      [ContentType]: applicationjson
    },
    data: payload
  })

  return response.data
};
