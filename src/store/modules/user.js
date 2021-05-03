import Vue from "vue";
import { SET_USER_INFO, REGISTER_TEACHER } from "@/store/actions.type";
import { AccountService } from "@/utils/account.service";
import { JwtService } from "@/utils/jwt.service";

const state = { status: "", account: {} };

const getters = {};

const actions = {
  [SET_USER_INFO]: ({ commit }, account) => {
    commit(SET_USER_INFO, account);
  },
  async [REGISTER_TEACHER]({ commit }, userInfo) {
    const resp = await AccountService.registerTeacher(userInfo);
    commit(SET_USER_INFO, resp.account);
  },
};

const mutations = {
  [SET_USER_INFO]: (state, account) => {
    Vue.set(state, "account", account);
    state.status = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
