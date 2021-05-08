import { ApiService } from "@/utils/api.service";
import Vue from "vue";

export const AccessDisciplineService = {
  async createRequest(disciplineId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.post(
        `/disciplines/${disciplineId}/access-discipline/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async acceptAccessDiscipline(disciplineId, accessDisciplineId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.put(
        `/disciplines/${disciplineId}/access-discipline/${accessDisciplineId}/accept/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async rejectAccessDiscipline(disciplineId, accessDisciplineId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.put(
        `/disciplines/${disciplineId}/access-discipline/${accessDisciplineId}/reject/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getAll(filter) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(`/access-discipline/`, {
        params: { ...filter },
      });
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
};
