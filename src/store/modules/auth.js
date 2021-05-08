import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "@/store/actions.type";
import { AccountService } from "@/utils/account.service";
import { JwtService } from "@/utils/jwt.service";

const getDefaultState = () => {
  return {
    status: "",
  };
};

const state = getDefaultState();

const getters = {
  isAuthenticated: (state) => state.status == "SUCCESS",
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
      commit("setACCOUNT", resp.account);
    } catch (err) {
      commit(AUTH_ERROR, err);
      JwtService.destroyRefreshToken();
      JwtService.destroyAccessToken();
      throw err;
    }
  },
  async [AUTH_LOGOUT]({ commit }) {
    JwtService.destroyAllTokens();
    commit(AUTH_LOGOUT);
    commit("resetState");
  },
};

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  [AUTH_REQUEST]: (state) => {
    state.status = "LOADING";
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = "SUCCESS";
  },
  [AUTH_LOGOUT]: (state) => {
    state.status = "";
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
