import "core-js/stable";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { ApiService } from "@/utils/api.service";
import { iconsSet as icons } from "./assets/icons/icons.js";
import store from "./store";
import MediumEditor from "vuejs-medium-editor";
import DateFilter from "./common/date.filter";

Vue.config.performance = true;
Vue.filter("formatDate", DateFilter);
Vue.use(CoreuiVue);
ApiService.init();
Vue.prototype.$log = console.log.bind(console);

Vue.component("medium-editor", MediumEditor);

new Vue({
  el: "#app",
  router,
  store,
  icons,
  template: "<App/>",
  components: {
    App,
  },
});
