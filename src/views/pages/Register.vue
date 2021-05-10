<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CAlert v-if="errorInfo != ''" show color="warning">
            {{ errorInfo }}
          </CAlert>
          <CAlert
            v-if="emailStatus == 'SEND_FAIL' && timeout != 0"
            show
            color="warning"
          >
            Код можно отпавить только через {{ timeout }} секунд.
          </CAlert>
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Регистрация в системе BEST-EDU</h1>
                <div v-show="stageNumber == 'STAGE_1'">
                  <p class="text-muted">Введите свою почту</p>
                  <CInput
                    type="email"
                    placeholder="Email"
                    autocomplete="email"
                    prepend="@"
                    v-model="email"
                    required
                    invalid-feedback="Адрес должен содержать @"
                    was-validated
                  />
                  <CButton color="success" block @click.prevent="sendCode"
                    >Выслать код</CButton
                  >
                </div>
                <div v-show="stageNumber == 'STAGE_2'">
                  <p class="text-muted">Введите код подтверждения</p>
                  <CInput
                    placeholder="Код подтверждения"
                    autocomplete="code"
                    v-model="code"
                    invalid-feedback="Длина кода должна быть равна 6 символам"
                    :is-valid="validatorRequestCode"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-pencil"
                    /></template>
                  </CInput>
                  <CButton color="success" block @click.prevent="verifyCode"
                    >Подтвердить почту</CButton
                  >
                  <CButton color="success" block @click.prevent="sendCode"
                    >Выслать код повторно</CButton
                  >
                  <CButton color="success" block @click.prevent="changeEmail"
                    >Изменить почту</CButton
                  >
                </div>
                <div v-show="stageNumber == 'STAGE_3'">
                  <CSelect
                    label="Выберите тип пользователя"
                    :value.sync="selectedUserType"
                    :options="userTypes"
                  />
                  <p class="text-muted">Введите ваше ФИО и пароль</p>
                  <CInput
                    placeholder="Фамилия"
                    autocomplete="username"
                    v-model="secondName"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Имя"
                    autocomplete="username"
                    v-model="firstName"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Отчество"
                    autocomplete="username"
                    v-model="patronymic"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Пароль"
                    type="password"
                    autocomplete="new-password"
                    v-model="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-shield-alt"
                    /></template>
                  </CInput>
                  <CInput
                    placeholder="Повторите пароль"
                    type="password"
                    autocomplete="new-password"
                    v-model="passwordRepeat"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-shield-alt"
                    /></template>
                  </CInput>
                  <CButton
                    color="success"
                    block
                    @click.prevent="registerAccount"
                    >Закончить создание аккаунта</CButton
                  >
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    <CModal
      :show.sync="imossibleCreateAccount"
      :no-close-on-backdrop="true"
      :centered="true"
      title="Невозможно создать аккаунт"
      size="sm"
      color="danger"
    >
      Аккаунт с введенной почтой уже существует!
      <template #header>
        <h6 class="modal-title">Невозможно создать аккаунт</h6>
      </template>
      <template #footer>
        <CButton @click="goToLogin" color="danger"
          >Вернуться на страницу входа</CButton
        >
      </template>
    </CModal>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  SEND_CODE,
  VERIFY_CODE,
  CHANGE_EMAIL,
  REGISTER_TEACHER,
  REGISTER_STUDENT,
} from "@/store/actions.type";

export default {
  data() {
    return {
      imossibleCreateAccount: false,
      email: "",
      code: "",
      password: "",
      passwordRepeat: "",
      secondName: "",
      firstName: "",
      patronymic: "",
      errorInfo: "",
      selectedUserType: "TEACHER",
      userTypes: [
        {
          value: "TEACHER",
          label: "Преподаватель",
        },
        {
          value: "STUDENT",
          label: "Студент",
        },
      ],
    };
  },
  created() {
    this.$store.dispatch("resetState");
  },
  name: "Register",
  methods: {
    sendCode() {
      this.errorInfo = "";
      this.code = "";
      this.$store.dispatch(SEND_CODE, this.email).catch((error) => {
        if (error.errorCode == "NOT_VALID_ARGUMENT") {
          this.errorInfo = "Невалидная почта";
          return;
        }
        this.errorInfo = error.message;
      });
    },
    verifyCode() {
      if (!this.validatorRequestCode(this.code)) {
        return;
      }
      this.errorInfo = "";
      const { email, code } = this;
      this.$store.dispatch(VERIFY_CODE, { email, code }).catch((error) => {
        if (error.errorCode == "NOT_VALID_ARGUMENT") {
          this.errorInfo = "Невалидная почта";
          return;
        }
        if (error.errorCode == "INVALID_CODE") {
          this.errorInfo = "Неправильный код";
          return;
        }
      });
    },
    changeEmail() {
      this.errorInfo = "";
      this.$store.dispatch(CHANGE_EMAIL);
    },
    async registerAccount() {
      this.errorInfo = "";
      if (this.selectedUserType == "TEACHER") {
        await this.$store
          .dispatch(REGISTER_TEACHER, {
            secondName: this.secondName,
            firstName: this.firstName,
            patronymic: this.patronymic,
            plainPassword: this.password,
          })
          .then(() => {
            this.$router.push("/pages/login");
          })
          .catch((error) => {
            this.imossibleCreateAccount = true;
          });
      } else {
        await this.$store
          .dispatch(REGISTER_STUDENT, {
            secondName: this.secondName,
            firstName: this.firstName,
            patronymic: this.patronymic,
            plainPassword: this.password,
          })
          .then(() => {
            this.$router.push("/pages/login");
          })
          .catch((error) => {
            this.imossibleCreateAccount = true;
          });
      }
    },
    goToLogin() {
      this.$router.push("/pages/login");
    },
    validatorRequestCode(val) {
      return val ? val.length == 6 : false;
    },
  },
  computed: {
    ...mapGetters(["emailStatus", "timeout"]),
    ...mapState({
      stageNumber: (state) => {
        if (
          state.requestCode.status == "ENTER_EMAIL" ||
          state.requestCode.status == "SENDING" ||
          state.requestCode.status == "SEND_FAIL"
        ) {
          return "STAGE_1";
        }
        if (
          state.requestCode.status == "VERIFYING" ||
          state.requestCode.status == "SEND" ||
          state.requestCode.status == "VERIFY_ERROR"
        ) {
          return "STAGE_2";
        } else {
          return "STAGE_3";
        }
      },
    }),
  },
};
</script>
