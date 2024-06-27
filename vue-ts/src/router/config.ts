let routes = [
    {
        path: "/settings",
        name: "settings",
        component: () => import("@/view/chat/SettingView.vue"),
        meta: {
            isMenu: true,
            description: "设置",
            icon: "Setting",
        },
    }
];

export default routes;