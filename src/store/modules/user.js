import {
  REGISTER_TEACHER,
  FIND_TEACHERS,
  RESET_PASSWORD,
} from "@/store/actions.type";
import { AccountService } from "@/utils/account.service";

const getDefaultState = () => {
  return {
    account: AccountService.getAccount() || "",
  };
};

const state = getDefaultState();

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
  state,
  actions,
  mutations,
};
