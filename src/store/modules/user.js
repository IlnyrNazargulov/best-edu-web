import Vue from "vue";
import { REGISTER_TEACHER, FIND_TEACHERS } from "@/store/actions.type";
import { AccountService } from "@/utils/account.service";

const state = { status: "", account: AccountService.getAccount() || "" };

const getters = {};

const actions = {
  async [REGISTER_TEACHER]({ commit }, userInfo) {
    const resp = await AccountService.registerTeacher(userInfo);
    AccountService.saveAccount(resp.account);
  },
  async [FIND_TEACHERS]({ commit }, filter) {
    return await AccountService.getTeacherByFilter(filter);
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
