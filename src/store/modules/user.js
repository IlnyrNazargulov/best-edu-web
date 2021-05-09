import {
  REGISTER_TEACHER,
  FIND_TEACHERS,
  RESET_PASSWORD,
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  AUTH_LOGOUT,
} from "@/store/actions.type";
import { AccountService } from "@/utils/account.service";

const getDefaultState = () => {
  return {
    account: AccountService.getAccount() || "",
  };
};

const state = getDefaultState();

const getters = {
  isTeacher: (state) => state.account.role == "ROLE_TEACHER",
};

const actions = {
  async [REGISTER_TEACHER]({ commit }, userInfo) {
    const resp = await AccountService.registerTeacher(userInfo);
    AccountService.saveAccount(resp.account);
  },
  async [FIND_TEACHERS]({ commit }, filter) {
    return await AccountService.getTeacherByFilter(filter);
  },
  async [RESET_PASSWORD]({ commit }, password) {
    await AccountService.resetPassword(password);
    commit("resetRequestCodeState");
  },
  async [GET_ACCOUNT]({ commit }, id) {
    if (id == null) {
      return await AccountService.getCurrentAccount();
    } else {
      return await AccountService.getTeacherById(id);
    }
  },
  async [UPDATE_ACCOUNT]({ commit }, account) {
    return await AccountService.updateAccount(account);
  },
  async [CHANGE_PASSWORD]({ commit }, password) {
    await AccountService.changePassword(password);
  },
  async [DELETE_ACCOUNT]({ dispatch }) {
    await AccountService.deleteAccount();
    dispatch(AUTH_LOGOUT);
  },
};

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setACCOUNT(state, account) {
    state.account = account;
  },
};

export default {
  getters,
  state,
  actions,
  mutations,
};
