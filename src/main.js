import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import store from "./store";
import router from "./router";
import "primeicons/primeicons.css";
import "@/assets/styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);
app.use(store);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: "",
    },
  },
});
app.use(router);
app.mount("#app");
