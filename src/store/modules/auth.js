/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "@/store/actions/auth";
import { USER_REQUEST, SET_USER_INFO } from "@/store/actions/user";
import authApi from "@/utils/AuthApi";

const state = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  status: "",
  hasLoadedOnce: false,
  errorMessage: "",
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  failureAuth: (state) => state.status == "error",
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      authApi
        .login(user)
        .then((resp) => {
          let token = resp.token;
          let account = resp.account;

          localStorage.setItem("accessToken", token.access_token);
          localStorage.setItem("refreshToken", token.refresh_token);

          commit(AUTH_SUCCESS, token);
          dispatch(SET_USER_INFO, account);
          resolve();
        })
        .catch((err) => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      resolve();
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = "success";
    state.accessToken = token.access_token;
    state.refreshToken = token.refresh_token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state, err) => {
    state.status = "error";
    console.log(err);
    state.hasLoadedOnce = true;
    state.errorMessage = err.message;
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
