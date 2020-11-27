import Vue from "vue";
import moment from "moment";

Vue.filter("dateFromNow", function(createdAt: Date) {
  moment.locale("fr");
  return moment(createdAt).fromNow();
});
