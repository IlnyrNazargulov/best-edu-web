import Vue from "vue";
import Router from "vue-router";
import store from "../store";
// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views - BEST-EDU
const Disciplines = () => import("@/views/base/Disciplines");
const MyDisciplines = () => import("@/views/base/MyDisciplines");
const Discipline = () => import("@/views/base/Discipline");
const MyDiscipline = () => import("@/views/base/MyDiscipline");
const Exercise = () => import("@/views/base/Exercise");
const MyExercise = () => import("@/views/base/MyExercise");
const CreateDiscipline = () => import("@/views/base/CreateDiscipline");
const Teachers = () => import("@/views/base/Teachers");
const Profile = () => import("@/views/base/Profile");
const ChangePassword = () => import("@/views/base/ChangePassword");

const RequestAccessDiscipline = () =>
  import("@/views/base/RequestAccessDiscipline");

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");
const ResetPassword = () => import("@/views/pages/ResetPassword");

Vue.use(Router);

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next("/pages/login");
    }
  } else {
    next();
  }
});

export default router;

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/disciplines",
      name: "Главная",
      component: TheContainer,
      meta: { requiresAuth: true },
      children: [
        {
          path: "profile",
          name: "Профиль",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              component: Profile,
            },
            {
              path: ":accountId",
              component: Profile,
            },
            {
              path: "change-password",
              name: "Смена пароля",
              component: ChangePassword,
            },
          ],
        },
        {
          path: "teachers",
          name: "Преподаватели",
          component: Teachers,
        },
        {
          path: "access-discipline",
          name: "Доступ к дисциплине",
          component: RequestAccessDiscipline,
        },
        {
          path: "my-disciplines",
          name: "Мои дисциплины",
          redirect: "/my-disciplines",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              component: MyDisciplines,
            },
            {
              path: "new",
              name: "Создать",
              component: CreateDiscipline,
            },
            {
              path: ":disciplineId",
              name: "Описание дисциплины",
              redirect: "/my-disciplines/:disciplineId",
              component: {
                render(c) {
                  return c("router-view");
                },
              },
              children: [
                {
                  path: "",
                  component: MyDiscipline,
                },
                {
                  path: "exercises",
                  name: "Занятие",
                  component: {
                    render(c) {
                      return c("router-view");
                    },
                  },
                  children: [
                    {
                      path: "",
                      component: MyExercise,
                    },
                    {
                      path: ":exerciseId/",
                      component: MyExercise,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: "disciplines",
          name: "Дисциплины",
          redirect: "/disciplines",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              component: Disciplines,
            },
            {
              path: ":disciplineId",
              name: "Описание дисциплины",
              redirect: "/disciplines/:disciplineId",
              component: {
                render(c) {
                  return c("router-view");
                },
              },
              children: [
                {
                  path: "",
                  component: Discipline,
                },
                {
                  path: "exercises/:exerciseId/",
                  name: "Занятие",
                  component: Exercise,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      meta: { requiresAuth: false },
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
        {
          path: "reset-password",
          name: "Register",
          component: ResetPassword,
        },
      ],
    },
  ];
}
