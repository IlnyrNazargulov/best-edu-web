import { ApiService } from "@/utils/api.service";
import Vue from "vue";

export const DisciplineService = {
  async create(name, isPublic) {
    ApiService.setAuthorizationHeader();
    const data = {
      name,
      isPublic,
    };
    try {
      const resp = await Vue.axios.post("/disciplines/", data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async update(id, name, isPublic) {
    ApiService.setAuthorizationHeader();
    const data = {
      name,
      isPublic,
    };
    try {
      const resp = await Vue.axios.put(`/disciplines/${id}/`, data);
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getByFilter(name) {
    ApiService.setAuthorizationHeader();
    const filter = { nameDiscipline: name };
    try {
      const resp = await Vue.axios.get("/disciplines/", { params: filter });
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
