import Vue from "vue";
import {
  FIND_DISCIPLINES,
  FIND_DISCIPLINE_BY_ID,
  FIND_MY_DISCIPLINES,
  CREATE_DISCIPLINE,
  DELETE_DISCIPLINE,
  UPDATE_DISCIPLINE,
} from "@/store/actions.type";

import { DisciplineService } from "@/utils/discipline.service";

const actions = {
  async [FIND_DISCIPLINES]({ commit }, filter) {
    return await DisciplineService.getByFilter(filter);
  },
  async [FIND_DISCIPLINE_BY_ID]({ commit }, id) {
    return await DisciplineService.getById(id);
  },
  async [FIND_MY_DISCIPLINES]({ commit }) {
    let currentAccountId = this.state.user.account.id;
    let filter = { teacherId: currentAccountId, onlyVisible: false };
    return await DisciplineService.getByFilter(filter);
  },
  async [CREATE_DISCIPLINE]({ commit }, data) {
    return await DisciplineService.create(data);
  },
  async [DELETE_DISCIPLINE]({ commit }, disciplineId) {
    return await DisciplineService.deleteById(disciplineId);
  },
  async [UPDATE_DISCIPLINE]({ commit }, discipline) {
    return await DisciplineService.update(discipline.id, discipline);
  },
};

export default {
  actions,
};
