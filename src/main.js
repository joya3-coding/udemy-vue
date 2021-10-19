import Vue from "vue";
import App from "./App.vue";
import VAnimateCss from 'animate.css';
Vue.use(VAnimateCss);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
