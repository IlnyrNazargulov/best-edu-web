<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/disciplines">
      <img
        class="c-sidebar-brand-full m-2"
        size="custom-size"
        src="@/assets/logo.png"
        :height="70"
        viewBox="0 0 556 134"
      />
      <img
        class="c-sidebar-brand-minimized"
        size="custom-size"
        src="@/assets/logo.png"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav" />
  </CSidebar>
</template>

<script>
import nav from "./_nav";

export default {
  name: "TheSidebar",
  nav,
  computed: {
    show() {
      return this.$store.state.sidebar.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
};
</script>
