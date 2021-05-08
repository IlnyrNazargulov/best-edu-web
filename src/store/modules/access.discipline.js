import {
  REQUEST_DISCIPLINE_ACCESS,
  ACCEPT_DISCIPLINE_ACCESS,
  REJECT_DISCIPLINE_ACCESS,
  GET_ALL_DISCIPLINE_ACCESS,
} from "@/store/actions.type";

import { AccessDisciplineService } from "@/utils/access.discipline.service";

const actions = {
  async [REQUEST_DISCIPLINE_ACCESS]({ commit }, disciplineId) {
    return await AccessDisciplineService.createRequest(disciplineId);
  },
  async [ACCEPT_DISCIPLINE_ACCESS]({ commit }, data) {
    return await AccessDisciplineService.acceptAccessDiscipline(
      data.disciplineId,
      data.accessDisciplineId
    );
  },
  async [REJECT_DISCIPLINE_ACCESS]({ commit }, data) {
    return await AccessDisciplineService.rejectAccessDiscipline(
      data.disciplineId,
      data.accessDisciplineId
    );
  },
  async [GET_ALL_DISCIPLINE_ACCESS]({ commit }, filter) {
    return await AccessDisciplineService.getAll(filter);
  },
};

export default {
  actions,
};
