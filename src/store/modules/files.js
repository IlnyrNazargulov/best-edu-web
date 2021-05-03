import Vue from "vue";
import { GET_CONTENT_FILE } from "@/store/actions.type";
import { FileService } from "@/utils/files.service";

const actions = {
  async [GET_CONTENT_FILE]({ commit }, url) {
    return await FileService.getContentByUrl(url);
  },
};

export default {
  actions,
};
