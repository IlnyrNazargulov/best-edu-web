<template>
  <CHeader fixed with-subheader light class="align-items-center">
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderNav class="d-md-down-none mr-auto mr-4">
      <CBreadcrumbRouter class="border-0 mb-0" />
    </CHeaderNav>
    <CHeaderNav class="mr-4 ml-auto p-2">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CButton color="secondary" variant="outline" @click.prevent="logout">
          <CIcon name="cilAccountLogout" />&nbsp;&nbsp;
          <span>Выйти</span>
        </CButton>
      </CHeaderNavItem>
    </CHeaderNav>
  </CHeader>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions.type";

export default {
  name: "TheHeader",
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
      this.$router.push({ path: "/pages/login" });
    },
  },
};
</script>
