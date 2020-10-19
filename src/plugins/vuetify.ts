import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import moment from "moment";

function DarkModeByTime() {
  const startTime: any = moment("8:00 am", "HH:mm a");
  const endTime: any = moment("8:00 pm", "HH:mm a");
  const between: any = moment().isBetween(startTime, endTime);

  return between;
}

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {},
      dark: {},
    },
    dark: !DarkModeByTime(),
  },
});
