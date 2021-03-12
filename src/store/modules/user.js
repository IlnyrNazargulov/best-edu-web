import Vue from "vue";
import {
  USER_REQUEST,
  USER_ERROR,
  USER_SUCCESS,
  SET_USER_INFO,
} from "@/store/actions/user";
import { AUTH_LOGOUT } from "@/store/actions/auth";

const state = { status: "", account: {} };

const getters = {
  getProfile: (state) => state.profile,
};

const actions = {
  [SET_USER_INFO]: ({ commit }, account) => {
    commit(SET_USER_INFO, account);
  },
};

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp);
  },
  [USER_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {};
  },
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
