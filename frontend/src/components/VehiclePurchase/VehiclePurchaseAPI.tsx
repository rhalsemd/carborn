import axios from "axios";
import { PageParam } from "./VehiclePurchaseType";

export function infinityFnc({ pageParam = 1 }: PageParam) {
  return axios({
    method: "get",
    url: `https://jsonplaceholder.typicode.com/comments`,
    params: {
      postId: pageParam,
    },
  });
}
