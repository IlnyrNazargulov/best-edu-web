import { ApiService } from "@/utils/api.service";
import Vue from "vue";
import { JwtService } from "./jwt.service";

const ACCOUNT = "ACCOUNT";

export const AccountService = {
  async login(payload) {
    const data = {
      login: payload.email,
      plainPassword: payload.password,
    };
    try {
      const resp = await Vue.axios.post("/accounts/login/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getTeacherByFilter(filters) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get("/accounts/", filters);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getTeacherById(id) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(`/accounts/${id}/`);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getCurrentAccount(id) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(`/accounts/current/`);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async updateAccount(info) {
    ApiService.setAuthorizationHeader();
    const data = {
      secondName: info.secondName,
      firstName: info.firstName,
      patronymic: info.patronymic,
    };
    try {
      const resp = await Vue.axios.put("/accounts/current/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async registerTeacher(info) {
    ApiService.setAuthorizationHeader(JwtService.getEmailToken());
    const data = {
      plainPassword: info.plainPassword,
      secondName: info.secondName,
      firstName: info.firstName,
      patronymic: info.patronymic,
    };
    try {
      const resp = await Vue.axios.post("/accounts/teachers/register/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async registerStudent(info) {
    ApiService.setAuthorizationHeader();
    const data = {
      login: info.login,
      plainPassword: info.plainPassword,
      secondName: info.secondName,
      firstName: info.firstName,
      patronymic: info.patronymic,
    };
    try {
      const resp = await Vue.axios.post("/accounts/students/register/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async refreshToken() {
    const data = {
      token: JwtService.getRefreshToken(),
    };
    try {
      const resp = await Vue.axios.post("/accounts/current/refresh/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async logout(allDevices = true) {
    ApiService.setAuthorizationHeader();
    const data = {
      token: JwtService.getRefreshToken(),
    };
    const config = {
      params: {
        allDevices,
      },
    };
    try {
      const resp = await Vue.axios.post(
        "/accounts/current/logout/",
        data,
        config
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async resetPassword(password) {
    ApiService.setAuthorizationHeader();
    const data = {
      password,
    };
    try {
      const resp = await Vue.axios.post("/accounts/reset-password/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async changePassword(password) {
    ApiService.setAuthorizationHeader();
    const data = {
      password,
    };
    try {
      const resp = await Vue.axios.post("/accounts/change-password/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  saveAccount(account) {
    window.localStorage.setItem(ACCOUNT, JSON.stringify(account));
  },
  getAccount() {
    return JSON.parse(window.localStorage.getItem(ACCOUNT));
  },
  destroyAccount() {
    window.localStorage.removeItem(ACCOUNT);
  },
};
