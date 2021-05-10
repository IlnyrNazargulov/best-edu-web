<template>
  <div>
    <div class="position-fixed m-3" :style="{ right: '0px' }">
      <CAlert color="warning" closeButton :show.sync="isFailedAuth">
        {{ errorInfo }}
      </CAlert>
    </div>
    <div class="c-app flex-row align-items-center">
      <CContainer>
        <CRow class="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard class="p-4">
                <CCardBody>
                  <CForm validate>
                    <h1>Вход</h1>
                    <p class="text-muted">Войдите в свой аккаунт</p>
                    <CInput
                      type="email"
                      placeholder="Email"
                      autocomplete="email"
                      v-model="email"
                      required
                      invalid-feedback="Адрес должен содержать @"
                      was-validated
                    >
                      <template #prepend-content
                        ><CIcon name="cil-user"
                      /></template>
                    </CInput>
                    <CInput
                      placeholder="Пароль"
                      type="password"
                      autocomplete="current-password"
                      v-model="password"
                      required
                      invalid-feedback="Длина пароля должна быть больше 6 символов"
                      :is-valid="validatorPassword"
                    >
                      <template #prepend-content
                        ><CIcon name="cil-shield-alt"
                      /></template>
                    </CInput>
                    <CRow>
                      <CCol col="6" class="text-left">
                        <CButton
                          color="primary"
                          class="px-4"
                          @click.prevent="login"
                          >Login</CButton
                        >
                      </CCol>
                      <CCol col="6" class="text-right">
                        <CButton
                          color="link"
                          class="px-0"
                          @click.prevent="goToResetPassword"
                          >Забыли пароль?</CButton
                        >
                        <CButton
                          color="link"
                          class="d-lg-none"
                          @click.prevent="goToRegistration"
                          >Регистрация</CButton
                        >
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                color="primary"
                text-color="white"
                class="text-center py-5 d-md-down-none"
                body-wrapper
              >
                <CCardBody>
                  <h2>Регистрация</h2>
                  <p>
                    Пройдите регистрацию чтобы использовать систему BEST-EDU.
                  </p>
                  <CButton
                    @click.prevent="goToRegistration"
                    color="light"
                    variant="outline"
                    size="lg"
                  >
                    Зарегистрироваться сейчас
                  </CButton>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { AUTH_REQUEST } from "@/store/actions.type";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorInfo: "",
    };
  },
  created() {
    this.$store.dispatch("resetState");
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          if (error.errorCode == "NOT_VALID_ARGUMENT") {
            this.errorInfo = "Невалидные данные";
          }
          if (error.errorCode == "WRONG_CREDENTIALS") {
            this.errorInfo = "Неправильный логин или пароль";
          }
        });
    },
    goToRegistration() {
      this.$router.push("/pages/register");
    },
    goToResetPassword() {
      this.$router.push("/pages/reset-password");
    },
    validatorPassword(val) {
      return val ? val.length >= 6 : false;
    },
  },
  computed: {
    ...mapGetters(["isFailedAuth"]),
  },
};
</script>
