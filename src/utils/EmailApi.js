import baseApi from "./BaseApi";
import axios from "axios";

const sendCode = (email) =>
  new Promise((resolve, reject) => {
    let url = `${baseApi.developHost}/accounts/request-code/`;
    const requestBody = {
      email,
    };
    axios({
      url,
      data: requestBody,
      method: "POST",
    })
      .then((resp) => {
        let data = baseApi.getSuccessData(resp);
        resolve(data);
      })
      .catch((err) => {
        let error = baseApi.getErrorData(err);
        reject(error);
      });
  });

const verifyCode = (email, code) =>
  new Promise((resolve, reject) => {
    let url = `${baseApi.developHost}/accounts/verify-code/`;
    const requestBody = {
      email,
      code,
    };
    axios({
      url,
      data: requestBody,
      method: "POST",
    })
      .then((resp) => {
        let objResp = baseApi.getSuccessData(resp);
        resolve(objResp.data);
      })
      .catch((err) => {
        console.log(err);
        let error = baseApi.getErrorData(err);
        console.log(error);
        reject(error);
      });
  });

export default { sendCode, verifyCode };
