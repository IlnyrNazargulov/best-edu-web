<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Восстановление пароля</h1>
                <div v-show="stageNumber == 'STAGE_1'">
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
                <div v-show="stageNumber == 'STAGE_2'">
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
                <div v-show="stageNumber == 'STAGE_3'">
                  <p class="text-muted">Введите новый пароль</p>
                  <CInput
                    placeholder="Пароль"
                    type="password"
                    autocomplete="current-password"
                    v-model="password"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-pencil"
                    /></template>
                  </CInput>
                  <CButton color="success" block @click.prevent="changePassword"
                    >Поставить пароль</CButton
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
import {
  SEND_CODE,
  VERIFY_CODE,
  CHANGE_EMAIL,
  RESET_PASSWORD,
} from "@/store/actions.type";

export default {
  data() {
    return {
      email: "",
      code: "",
      password: "",
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
    async changePassword() {
      await this.$store.dispatch(RESET_PASSWORD, this.password);
      this.$router.push("/");
    },
  },
  computed: {
    emailStatus() {
      return this.$store.state.requestCode.status;
    },
    stageNumber() {
      if (
        this.emailStatus == "ENTER_EMAIL" ||
        this.emailStatus == "SENDING" ||
        this.emailStatus == "SEND_FAIL"
      ) {
        return "STAGE_1";
      }
      if (
        this.emailStatus == "VERIFYING" ||
        this.emailStatus == "SEND" ||
        this.emailStatus == "VERIFY_ERROR"
      ) {
        return "STAGE_2";
      } else {
        return "STAGE_3";
      }
    },
  },
};
</script>
