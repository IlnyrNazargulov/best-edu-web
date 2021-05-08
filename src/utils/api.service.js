import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/utils/config";
import { JwtService } from "@/utils/jwt.service";

export const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
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
