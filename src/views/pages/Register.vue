<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CAlert v-if="emailStatus == 'SENDING'" show color="info">
            Код отправляется на вашу почту
          </CAlert>
          <CAlert
            v-if="emailStatus == 'VERIFY_ERROR' || emailStatus == 'SEND_FAIL'"
            show
            color="warning"
          >
            {{ emailErrorMessage }}
          </CAlert>
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Регистрация в системе BEST-EDU</h1>
                <div v-if="stageNumber == 'STAGE_1'">
                  <p class="text-muted">Введите свою почту</p>
                  <CInput
                    placeholder="Email"
                    autocomplete="email"
                    prepend="@"
                    v-model="email"
                  />
                  <CButton color="success" block @click.prevent="sendCode"
                    >Выслать код</CButton
                  >
                </div>
                <div v-if="stageNumber == 'STAGE_2'">
                  <p class="text-muted">Введите код подтверждения</p>
                  <CInput
                    placeholder="Код подтверждения"
                    autocomplete="code"
                    v-model="code"
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
                <div v-if="stageNumber == 'STAGE_3'">
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
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import {
  SEND_CODE,
  VERIFY_CODE,
  CHANGE_EMAIL,
  REGISTER_TEACHER,
} from "@/store/actions.type";

export default {
  data() {
    return {
      email: "",
      code: "",
      password: "",
      passwordRepeat: "",
      secondName: "",
      firstName: "",
      patronymic: "",
    };
  },
  name: "Register",
  methods: {
    sendCode() {
      this.$store.dispatch(SEND_CODE, this.email);
    },
    verifyCode() {
      const { email, code } = this;
      this.$store.dispatch(VERIFY_CODE, { email, code });
    },
    changeEmail() {
      this.$store.dispatch(CHANGE_EMAIL);
    },
    async registerAccount() {
      await this.$store.dispatch(REGISTER_TEACHER, {
        secondName: this.secondName,
        firstName: this.firstName,
        patronymic: this.patronymic,
        plainPassword: this.password,
      });
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["emailStatus", "emailErrorMessage"]),
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
