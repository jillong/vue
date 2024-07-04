import {ChatOptions} from "@/entity/chatDTO"
import {defineStore} from "pinia";

export const defaultChatOptions: ChatOptions = {
    model: "gpt-3.5-turbo",
    maxHistoryLength: 10,
    augmented: false,
    temperature: 0.5,
    stream: false,
};
export const CHAT_OPTION_KEY = "chat option key"
export const SYSTEM_PROMPT_KEY = "system prompt key";
let defaultSystemPrompt = "你是一名AI助手，致力于帮助人们解决问题.";
export const chatOptionsStore = defineStore("options", {
    state: () => {
        let chatOption: string | null = localStorage.getItem(CHAT_OPTION_KEY);
        let globalChatOption: ChatOptions = chatOption === null ? defaultChatOptions : JSON.parse(chatOption);

        let systemPrompt: string | null = localStorage.getItem(SYSTEM_PROMPT_KEY)
        let globalSystemPrompt: string = systemPrompt === null ? defaultSystemPrompt : systemPrompt

        return {
            globalChatOption,
            globalSystemPrompt,
        };
    },
    getters: {
        getGlobalChatOption(): ChatOptions {
            return this.globalChatOption;
        },
        getGlobalSystemPrompt(): string {
            return this.globalSystemPrompt;
        },
    },
    actions: {
        setGlobalChatOption(globalChatOption: ChatOptions) {
            this.$patch({globalChatOption})
            localStorage.setItem(CHAT_OPTION_KEY, JSON.stringify(globalChatOption));

        },
        setGlobalSystemPrompt(globalSystemPrompt: string) {
            this.$patch({globalSystemPrompt});
            localStorage.setItem(SYSTEM_PROMPT_KEY, globalSystemPrompt);

        },
    },
})
