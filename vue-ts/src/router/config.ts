import {ChatDotRound, Key, Setting} from "@element-plus/icons-vue";

let routes = [
    {
        path: "/setting",
        name: "setting",
        component: () => import("../view/chat/SettingView.vue"),
        meta: {
            isMenu: true,
            description: "设置",
            icon: Setting,
        },
    },
    {
        path: "/chat",
        name: "chat",
        component: () => import("../view/chat/ChatView.vue"),
        meta: {
            isMenu: true,
            description: "AI对话",
            icon: ChatDotRound,
        },
    },
    {
        path: "/manage",
        name: "manage",
        component: () => import("../view/manage/ApiManageView.vue"),
        meta: {
            isMenu: true,
            description: "api key管理",
            icon: Key,
        },
    },
];

export default routes;