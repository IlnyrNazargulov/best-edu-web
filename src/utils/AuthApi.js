import baseApi from "./BaseApi";
import axios from "axios";

const login = (user) =>
  new Promise((resolve, reject) => {
    let url = `${baseApi.developHost}/accounts/login/`;
    const requestBody = {
      login: user.email,
      plainPassword: user.password,
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
        let error = baseApi.getErrorData(err);
        reject(error);
      });
  });

export default { login };
