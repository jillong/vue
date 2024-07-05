import {ChatDotRound, Key, Collection} from "@element-plus/icons-vue";

let routes = [

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
    {
        path: "/know",
        name: "know",
        component: () => import("../view/know/PrivateKnowledgeView.vue"),
        meta: {
            isMenu: true,
            description: "私人知识库",
            icon: Collection,
        },
    },
];

export default routes;