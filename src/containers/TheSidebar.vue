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
    <CSidebarNav>
      <CSidebarNavItem
        v-show="!isTeacher"
        icon="cilLayers"
        name="Мои дисциплины"
        to="/disciplines"
      />

      <CSidebarNavDropdown
        name="Дисциплины"
        icon="cilLayers"
        v-show="isTeacher"
      >
        <CSidebarNavItem name="Мои дисциплины" to="/disciplines" />
        <CSidebarNavItem name="Все дисциплины" to="/my-disciplines" />
      </CSidebarNavDropdown>
      <CSidebarNavItem name="Преподаватели" icon="cilHappy" to="/teachers" />
      <CSidebarNavItem
        name="Доступ к дисциплине"
        icon="cilLockUnlocked"
        to="/access-discipline"
      />
      <CSidebarNavItem name="Мой профиль" icon="cilInfo" to="/profile" />
      <CSidebarNavItem
        name="Скачать настольный клиент"
        v-bind:icon="downloadIcon"
        class="bg-success text-white"
        to="/"
      />
    </CSidebarNav>

    <!-- <CRenderFunction flat :content-to-render="$options.nav" /> -->
  </CSidebar>
</template>

<script>
export default {
  name: "TheSidebar",
  data() {
    return {
      downloadIcon: { name: "cil-cloud-download", class: "text-white" },
    };
  },
  computed: {
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
    show() {
      return this.$store.state.sidebar.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
  },
  methods: {
    goToDisciplines() {
      this.$router.push({ path: "/disciplines" });
    },
    goToMyDisciplines() {
      this.$router.push({ path: "/my-disciplines" });
    },
  },
};
</script>
