import { ApiService } from "@/utils/api.service";
import Vue from "vue";

export const FileService = {
  async create(disciplineId, exerciseId, exerciseFileType, data) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.post(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/exercise-files/${exerciseFileType}/`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getAllByExercise(disciplineId, exerciseId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/exercise-files/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async deleteById(disciplineId, exerciseId, fileId) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.delete(
        `/disciplines/${disciplineId}/exercises/${exerciseId}/exercise-files/${fileId}/`
      );
      let objResp = ApiService.getSuccessData(resp);
      return objResp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
  async getContentByUrl(url) {
    ApiService.setAuthorizationHeader();
    try {
      const resp = await Vue.axios.get(url, {
        baseURL: "https://best-edu.tk",
      });
      return resp.data;
    } catch (err) {
      return ApiService.getErrorData(err);
    }
  },
};
