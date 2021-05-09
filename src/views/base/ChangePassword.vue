<template>
  <CCard>
    <CCardHeader>
      <strong> Изменить пароль </strong>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="8">
          <CInput
            label="Ваш новый пароль"
            v-model="password"
            horizontal
            type="password"
            autocomplete="current-password"
            placeholder="Пароль"
          />
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <div class="d-flex flex-nowrap">
        <CButton color="primary" class="mr-3" @click.prevent="changePassword"
          >Изменить пароль</CButton
        >
        <CButton color="primary" class="mr-3" @click.prevent="goToProfile"
          >Вернуться в профиль</CButton
        >
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import { CHANGE_PASSWORD } from "@/store/actions.type";

export default {
  name: "ChangePassword",
  async created() {},
  data() {
    return {
      password: "",
    };
  },
  methods: {
    goToProfile() {
      this.$router.push({ path: "/profile" });
    },
    async changePassword() {
      await this.$store.dispatch(CHANGE_PASSWORD, this.password);
    },
  },
};
</script>
