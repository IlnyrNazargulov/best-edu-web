import { ApiService } from "@/utils/api.service";
import Vue from "vue";

export const RequestCodeService = {
  async sendCode(email) {
    const data = {
      email,
    };
    try {
      const resp = await Vue.axios.post("/accounts/request-code/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async verifyCode(email, code) {
    const data = {
      email,
      code,
    };
    try {
      const resp = await Vue.axios.post("/accounts/verify-code/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
};
