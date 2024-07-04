import {AddChatApiDto, ChatDTO, UpdateChatApiDto} from "@/entity/chatDTO";
import axios from "axios";
import {chatMessagesStore} from "@/store/message";
import {chatOptionsStore} from "@/store/options";
import {fetchEventSource} from "@microsoft/fetch-event-source";

const header = {'Content-Type': 'application/json'}
const chatMessages = chatMessagesStore();
const chatOptions = chatOptionsStore();
export const getChatApi = (): Promise<any> => {
    return axios.get("http://localhost:8090/chat/api");
};

export const addChatApi = (dto: AddChatApiDto): Promise<any> => {
    return axios.post("http://localhost:8090/chat/api", dto);
};

export const updateChatApi = (dto: UpdateChatApiDto): Promise<any> => {
    return axios.put("http://localhost:8090/chat/api", dto);
};

export const deleteChatApi = (id: string): Promise<any> => {
    const param = {id: id}
    return axios.delete("http://localhost:8090/chat/api", {params: param});
};

export const sendChatRequest = (userQuery: { value: any; }) => {
    chatMessages.addMessage({
        role: "user",
        content: userQuery.value,
    });

    const data: ChatDTO = {
        messages: chatMessages.getGlobalMessages,
        chatOptions: chatOptions.getGlobalChatOption,
        query: userQuery.value,
    };
    const url = 'http://localhost:8090/ai/chat';

    return axios.post(url, data, {headers: header});
};

export const sendMessageChat = (input: string) => {
    // 添加用户提问
    chatMessages.addMessage({
        role: "user",
        content: input,
    });

    const dto: ChatDTO = {
        messages: chatMessages.getGlobalMessages,
        chatOptions: chatOptions.getGlobalChatOption,
        query: input,
    };

    const ctrl = new AbortController();

    const onMessage = (response: any) => {
        let answer = "";
        let result = JSON.parse(response.data).results.at(0).output.content;
        if (result != null) {
            answer += result;
        }

        chatMessages.addMessage({
            role: "assistant",
            content: answer,
        });
    };

    const onError = (err: any) => {
        chatMessages.setChatting(false);
        throw err;
    };
    const onClose = () => {
        chatMessages.setChatting(false);
        chatMessages.storeMessage();
    };
    const onOpen = async (response: any) => {
        chatMessages.setChatting(true);
        if (response.ok) {
            return;
        } else {
            throw new Error();
        }
    };

    fetchEventSource(
        'http://localhost:8090/ai/chat',
        {
            method: "POST",
            headers: header,
            body: JSON.stringify(dto),
            signal: ctrl.signal,
            onmessage: onMessage,
            onerror: onError,
            onclose: onClose,
            onopen: onOpen,
        });
}