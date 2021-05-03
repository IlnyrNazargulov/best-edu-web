import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import sidebar from "./modules/sidebar";
import requestCode from "./modules/request.code";
import disciplines from "./modules/disciplines";
import exercises from "./modules/exercises";
import files from "./modules/files";

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
  },
});
