import { ApiService } from "@/utils/api.service";
import Vue from "vue";

export const DisciplineService = {
  async create(data) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.post("/disciplines/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async update(id, discipline) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.put(`/disciplines/${id}/`, discipline);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getByFilter(filter) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get("/disciplines/", {
        params: { ...filter },
      });
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getById(id) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(`/disciplines/${id}/`);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async deleteById(id) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.delete(`/disciplines/${id}/`);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
};
