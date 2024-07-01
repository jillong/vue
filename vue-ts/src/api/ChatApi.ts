import {AddChatApiDto} from "@/entity/chatDTO";

import axios from "axios";

export const getChatApi = (): Promise<any> => {
    return axios.get("http://localhost:8090/chat/api");
};

export const addChatApi = (dto: AddChatApiDto): Promise<any> => {
    return axios.post("http://localhost:8090/chat/api", dto);
};