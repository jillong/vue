import {chatOptionsStore} from "@/store/options";
import {Message} from "@/entity/chatDTO";
import {defineStore} from "pinia";

const optionsStore = chatOptionsStore();
const defaultMessage: Message[] = [
    {
        role: "system",
        content: optionsStore.getGlobalSystemPrompt,
    },
];

export const MESSAGE_LOCAL_STORE = "local message key";

export const chatMessagesStore = defineStore("message", {
    state: () => {
        // 当前AI回复的信息
        let currAssistantMessage: string = "";
        // 是否正在对话
        let chatting = false;

        // 尝试从本地获取配置信息
        let messagesJson: string | null = localStorage.getItem(MESSAGE_LOCAL_STORE);

        //全部信息
        let globalMessages: Message[] =
            messagesJson === null ? defaultMessage : JSON.parse(messagesJson);

        return {globalMessages, currAssistantMessage, chatting};
    },

    getters: {
        isChatting(): boolean {
            return this.chatting;
        },
        getGlobalMessages(): Message[] {
            return this.globalMessages;
        },
    },

    actions: {
        setChatting(chatting: boolean) {
            this.$patch({chatting});
        },

        setGlobalMessage(globalMessages: Message[]) {
            this.$patch({globalMessages});
        },

        addMessage(message: Message) {
            this.globalMessages.push(message);
            this.storeMessage();
        },

        resetGlobalMessage() {
            localStorage.removeItem(MESSAGE_LOCAL_STORE);
            this.globalMessages = [];
            this.addMessage(defaultMessage.at(0) as Message);
            console.log(this.globalMessages);
        },

        storeMessage() {
            localStorage.setItem(MESSAGE_LOCAL_STORE, JSON.stringify(this.getGlobalMessages));
        },
    }
})