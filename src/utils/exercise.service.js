import { ApiService } from "@/utils/api.service";
import Vue from "vue";

export const ExerciseService = {
  async create(disciplineId, data) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.post(
        `/disciplines/${disciplineId}/exercises/`,
        data
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async updateContent(disciplineId, exerciseId, content) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.put(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/content/`,
        content,
        { headers: { "Content-Type": "text/plain" } }
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async update(disciplineId, exerciseId, data) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.put(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/`,
        data
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getById(disciplineId, exerciseId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getAll(disciplineId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(
        `/disciplines/${disciplineId}/exercises/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async deleteById(disciplineId, exerciseId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.delete(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
};
