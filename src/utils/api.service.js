import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/utils/config";
import { JwtService } from "@/utils/jwt.service";

export const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    Vue.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status !== 401) {
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        return new Promise((resolve, reject) => {
          delete Vue.axios.defaults.headers.common["Authorization"];
          Vue.axios
            .post("accounts/current/refresh/", {
              token: JwtService.getRefreshToken(),
            })
            .then((response) => {
              JwtService.saveAccessToken(response.data.data.access_token);
              JwtService.saveRefreshToken(response.data.data.refresh_token);
              resolve(response.data.data.access_token);
            })
            .catch((error) => {
              reject(error);
            });
        })
          .then((token) => {
            const config = error.config;
            config.headers["Authorization"] = `Bearer ${token}`;

            return new Promise((resolve, reject) => {
              axios
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            });
          })
          .catch((error) => {
            Promise.reject(error);
          });
      }
    );
  },
  setAuthorizationHeader(token = null) {
    Vue.axios.defaults.headers.common["Authorization"] = `Bearer ${
      token != null ? token : JwtService.getAccessToken()
    }`;
  },
  dropAuthorizationHeader(token = null) {
    delete Vue.axios.defaults.headers.common["Authorization"];
  },
  getSuccessData(response) {
    return response.data;
  },

  getErrorData(err) {
    throw err.response.data.errors[0];
  },
};
