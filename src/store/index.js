import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import sidebar from "./modules/sidebar";
import requestCode from "./modules/request.code";
import disciplines from "./modules/disciplines";
import accessDiscipline from "./modules/access.discipline";
import exercises from "./modules/exercises";
import files from "./modules/files";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auth,
    sidebar,
    requestCode,
    disciplines,
    exercises,
    files,
    accessDiscipline,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
