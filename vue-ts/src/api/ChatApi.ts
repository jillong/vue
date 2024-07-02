import {AddChatApiDto, UpdateChatApiDto} from "@/entity/chatDTO";

import axios from "axios";

export const getChatApi = (): Promise<any> => {
    return axios.get("http://localhost:8090/chat/api");
};

export const addChatApi = (dto: AddChatApiDto): Promise<any> => {
    return axios.post("http://localhost:8090/chat/api", dto);
};

export const updateChatApi = (dto: UpdateChatApiDto): Promise<any> => {
    return axios.put("http://localhost:8090/chat/api", dto);
};