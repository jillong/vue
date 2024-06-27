import {ChatDotRound, Setting} from "@element-plus/icons-vue";

let routes = [
    {
        path: "/setting",
        name: "setting",
        component: () => import("@/view/chat/SettingView.vue"),
        meta: {
            isMenu: true,
            description: "设置",
            icon: Setting,
        },
    },
    {
        path: "/chat",
        name: "chat",
        component: () => import("@/view/chat/ChatView.vue"),
        meta: {
            isMenu: true,
            description: "AI对话",
            icon: ChatDotRound,
        },
    }
];

export default routes;