import VueRouter from "vue-router";
import Vue from "vue";
import { authRouter } from "./authRouter";
import { mainRouter } from "./mainRouter";
Vue.use(VueRouter)
const router = new VueRouter({
    mode: "history",
    scrollBehavior() {
        // console.log(from, to);
        return { x: 0, y: 0, behavior: "smooth" };
    },
    routes: [
        {
            path: "/",
            redirect: "/auth/register",
        },
        {
            path: "/auth",
            component: () => import("@/layouts/AuthLayout.vue"),
            children: [...authRouter],
        },
        {
            path: "/",
            component: () => import("@/layouts/MainLayout.vue"),
            children: [...mainRouter],
        },
    ]
});
export default router;