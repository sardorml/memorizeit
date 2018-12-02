import Vue from "vue";
import Router from "vue-router";
import dashboard from "@/components/dashboard";
import newCard from "@/components/newCard";
import viewCard from "@/components/viewCard";
import cardEdit from "@/components/cardEdit";
import logIn from "@/components/login";
import homePage from "@/components/home";
import register from "@/components/register";
import learn from "@/components/learn";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      component: homePage,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/learn",
      name: "learn",
      component: learn,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/",
      name: "login",
      component: logIn,
      props: true,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: register,
      props: true,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new",
      name: "new-card",
      component: newCard,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:card_id/edit",
      name: "card-edit",
      component: cardEdit,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:card_id",
      name: "view-card",
      component: viewCard,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav guards

router.beforeEach((to, from, next) => {
  //Check
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If not logged in
    if (!firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({
        path: "/dashboard",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed
      next();
    }
  } else {
    next();
  }
});

export default router;
