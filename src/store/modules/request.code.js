import { SEND_CODE, VERIFY_CODE, CHANGE_EMAIL } from "@/store/actions.type";
import { RequestCodeService } from "@/utils/request.code.service";
import { EmailStatus } from "@/store/model/EmailStatus";
import { JwtService } from "@/utils/jwt.service";

const getDefaultState = () => {
  return {
    status: EmailStatus.ENTER_EMAIL,
    timeout: 0,
  };
};

const state = getDefaultState();

const getters = {
  emailStatus: (state) => state.status,
  timeout: (state) => state.timeout,
};

const actions = {
  async [SEND_CODE]({ commit }, email) {
    commit("setStatus", "SENDING");
    try {
      const resp = await RequestCodeService.sendCode(email);
      if (!resp.isSuccess) {
        commit("setStatus", "SEND_FAIL");
      } else {
        commit("setStatus", "SEND");
      }
      commit("setTimeout", resp.data.timeout);
    } catch (err) {
      commit("setStatus", "SEND_FAIL");
      throw err;
    }
  },
  async [VERIFY_CODE]({ commit, dispatch }, user) {
    commit("setStatus", "VERIFYING");
    try {
      const data = await RequestCodeService.verifyCode(user.email, user.code);
      JwtService.saveEmailToken(data.access_token);
      commit("setStatus", "VERIFY");
    } catch (error) {
      commit("setStatus", "VERIFY_ERROR");
      throw error;
    }
  },
  [CHANGE_EMAIL]: ({ commit, dispatch }) => {
    commit("setStatus", "ENTER_EMAIL");
  },
  resetState({ commit }) {
    commit("resetRequestCodeState");
  },
};

const mutations = {
  resetRequestCodeState(state) {
    Object.assign(state, getDefaultState());
  },
  setTimeout(state, timeout) {
    state.timeout = timeout;
  },
  setStatus(state, status) {
    state.status = status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
