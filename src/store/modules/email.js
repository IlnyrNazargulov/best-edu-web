/* eslint-disable promise/param-names */
import {
  SEND_CODE,
  VERIFY_CODE,
  CHANGE_EMAIL,
  EmailStatus,
} from "@/store/actions/email";
import emailApi from "@/utils/EmailApi";

const state = {
  emailToken: "",
  status: "",
  errorMessage: "",
  timeout: 0,
};

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
  [SEND_CODE]: ({ commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      commit(EmailStatus.SENDING);
      emailApi.sendCode(email).then((resp) => {
        console.log(resp.isSuccess);
        if (!resp.isSuccess) {
          commit(EmailStatus.SEND_FAIL, resp.data.timeout);
        } else {
          commit(EmailStatus.SEND, resp.data.timeout);
        }
        resolve();
      });
    });
  },
  [VERIFY_CODE]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(EmailStatus.VERIFYING);
      console.log(user.email);
      console.log(user.code);
      emailApi
        .verifyCode(user.email, user.code)
        .then((data) => {
          commit(EmailStatus.VERIFY, data.access_token);
          resolve();
        })
        .catch((err) => {
          let errorMessage = emailErrorMessages[err.errorCode];
          if (errorMessage === undefined) {
            errorMessage = "Неизвестная ошибка";
          }
          commit(EmailStatus.VERIFY_ERROR, errorMessage);
        });
    });
  },
  [CHANGE_EMAIL]: ({ commit, dispatch }) => {
    commit(EmailStatus.ENTER_EMAIL);
  },
};

const mutations = {
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
  [EmailStatus.VERIFY]: (state, emailToken) => {
    state.status = EmailStatus.VERIFY;
    state.emailToken = emailToken;
    state.errorMessage = "";
  },
  [EmailStatus.VERIFY_ERROR]: (state, errorMessage) => {
    state.status = EmailStatus.VERIFY_ERROR;
    state.emailToken = "";
    state.errorMessage = errorMessage;
  },
  [EmailStatus.ENTER_EMAIL]: (state) => {
    state.status = "ENTER_EMAIL";
    state.emailToken = "";
    state.errorMessage = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
