import { SEND_CODE, VERIFY_CODE, CHANGE_EMAIL } from "@/store/actions.type";
import { RequestCodeService } from "@/utils/request.code.service";
import { EmailStatus } from "@/store/model/EmailStatus";
import { JwtService } from "@/utils/jwt.service";

const getDefaultState = () => {
  return {
    status: EmailStatus.ENTER_EMAIL,
    errorMessage: "",
    timeout: 0,
  };
};

const state = getDefaultState();

const emailErrorMessages = {
  INVALID_CODE: "Неправильный код",
};

const getters = {
  emailStatus: (state) => state.status,
  emailErrorMessage: (state) =>
    state.errorMessage != ""
      ? state.errorMessage
      : "Код можно отправить через " + state.timeout + " секунд.",
};

const actions = {
  async [SEND_CODE]({ commit, dispatch }, email) {
    commit(EmailStatus.SENDING);
    const resp = await RequestCodeService.sendCode(email);
    if (!resp.isSuccess) {
      commit(EmailStatus.SEND_FAIL, resp.data.timeout);
    } else {
      commit(EmailStatus.SEND, resp.data.timeout);
    }
  },
  async [VERIFY_CODE]({ commit, dispatch }, user) {
    commit(EmailStatus.VERIFYING);
    try {
      const data = await RequestCodeService.verifyCode(user.email, user.code);
      JwtService.saveEmailToken(data.access_token);
      commit(EmailStatus.VERIFY);
    } catch (err) {
      let errorMessage = emailErrorMessages[err.errorCode];
      if (errorMessage === undefined) {
        errorMessage = "Неизвестная ошибка";
      }
      commit(EmailStatus.VERIFY_ERROR, errorMessage);
    }
  },
  [CHANGE_EMAIL]: ({ commit, dispatch }) => {
    commit(EmailStatus.ENTER_EMAIL);
  },
};

const mutations = {
  resetRequestCodeState(state) {
    Object.assign(state, getDefaultState());
  },
  [EmailStatus.SENDING]: (state) => {
    state.status = EmailStatus.SENDING;
    state.errorMessage = "";
  },
  [EmailStatus.SEND]: (state, timeout) => {
    state.status = EmailStatus.SEND;
    state.timeout = timeout;
    state.errorMessage = "";
  },
  [EmailStatus.SEND_FAIL]: (state, timeout) => {
    state.status = EmailStatus.SEND_FAIL;
    state.timeout = timeout;
    state.errorMessage = "";
  },
  [EmailStatus.VERIFYING]: (state) => {
    state.status = EmailStatus.VERIFYING;
    state.errorMessage = "";
  },
  [EmailStatus.VERIFY]: (state) => {
    state.status = EmailStatus.VERIFY;
    state.errorMessage = "";
  },
  [EmailStatus.VERIFY_ERROR]: (state, errorMessage) => {
    state.status = EmailStatus.VERIFY_ERROR;
    state.errorMessage = errorMessage;
  },
  [EmailStatus.ENTER_EMAIL]: (state) => {
    state.status = EmailStatus.ENTER_EMAIL;
    state.errorMessage = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
