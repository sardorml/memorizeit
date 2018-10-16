import Vue from "vue";
import Router from "vue-router";
import dashboard from "@/components/dashboard";
import newCard from "@/components/newCard";
import viewCard from "@/components/viewCard";
import cardEdit from "@/components/cardEdit";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: dashboard
    },
    {
      path: "/new",
      name: "new-card",
      component: newCard
    },
    {
      path: "/:card_id/edit",
      name: "card-edit",
      component: cardEdit
    },
    {
      path: "/:card_id",
      name: "view-card",
      component: viewCard
    }
  ]
});
