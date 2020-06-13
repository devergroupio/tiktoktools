import { notification } from "antd";
import axios from "axios";
import { CS_CONFIG } from "./index";
var Nprogress: any;
if (typeof window !== undefined) {
  // tslint:disable-next-line:no-var-requires
  Nprogress = require("nprogress");
}
const service = axios.create({
  baseURL: CS_CONFIG.BACKEND_URL,
  timeout: 30 * 1000 * 10,
});

const err = (error) => {
  Nprogress.done();
  if (error.response) {
    if (error.response.data instanceof ArrayBuffer) {
      notification.error({
        message: JSON.parse(
          new TextDecoder("utf-8").decode(error.response.data)
        ).message,
      });
    } else {
      notification.error({
        message: error.response.data.payload,
      });
    }
  }
  return Promise.reject(error);
};
service.interceptors.request.use((request) => {
  Nprogress.start();
  return request;
});
service.interceptors.response.use((response) => {
  Nprogress.done();
  //   if (response.status === 206) {
  //     return response.data;
  //   }
  return response;
}, err);

export default service;
