import Vue from "vue";
import { FIND_DISCIPLINES, FIND_DISCIPLINE_BY_ID } from "@/store/actions.type";
import { DisciplineService } from "@/utils/discipline.service";

const actions = {
  async [FIND_DISCIPLINES]({ commit }, nameFilter) {
    return await DisciplineService.getByFilter(nameFilter);
  },
  async [FIND_DISCIPLINE_BY_ID]({ commit }, id) {
    return await DisciplineService.getById(id);
  },
};

export default {
  actions,
};
