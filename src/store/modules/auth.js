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
  hasLoadedOnce: false,
  errorMessage: "",
};

const getters = {
  isAuthenticated: (state) => false,
  authStatus: (state) => state.status,
  failureAuth: (state) => state.status == "error",
};

const actions = {
  async [AUTH_REQUEST]({ commit, dispatch }, user) {
    commit(AUTH_REQUEST);
    try {
      const resp = await AccountService.login(user);

      let token = resp.token;
      let account = resp.account;

      JwtService.saveAccessToken(token.access_token);
      JwtService.saveRefreshToken(token.refresh_token);

      commit(AUTH_SUCCESS, token);
      dispatch(SET_USER_INFO, account);
    } catch (err) {
      commit(AUTH_ERROR, err);
      JwtService.destroyRefreshToken();
      JwtService.destroyAccessToken();
    }
  },
  async [AUTH_LOGOUT]({ commit }) {
    JwtService.destroyAllTokens();
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = "success";
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = "error";
    console.log(err);
    state.hasLoadedOnce = true;
    state.errorMessage = err.message;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
