/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "@/store/actions.type";
import { AccountService } from "@/utils/account.service";
import { JwtService } from "@/utils/jwt.service";

const state = {
  status: "",
};

const getters = {
  isAuthenticated: (state) =>
    state.status == "SUCCESS" || !!JwtService.getAccessToken(),
  isFailedAuth: (state) => state.status == "ERROR",
};

const actions = {
  async [AUTH_REQUEST]({ commit, dispatch }, user) {
    commit(AUTH_REQUEST);
    try {
      const resp = await AccountService.login(user);

      let token = resp.token;

      JwtService.saveAccessToken(token.access_token);
      JwtService.saveRefreshToken(token.refresh_token);
      AccountService.saveAccount(resp.account);
      commit(AUTH_SUCCESS, token);
    } catch (err) {
      commit(AUTH_ERROR, err);
      JwtService.destroyRefreshToken();
      JwtService.destroyAccessToken();
      throw err;
    }
  },
  async [AUTH_LOGOUT]({ commit }) {
    JwtService.destroyAllTokens();
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "LOADING";
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = "SUCCESS";
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = "ERROR";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
