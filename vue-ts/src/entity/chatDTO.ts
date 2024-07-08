export interface Message {
    role: string;
    content: string;
}

export interface ChatOptions {
    model: string;
    maxHistoryLength: number;
    augmented: boolean;
    temperature: number;
    stream: boolean;
}

export interface ChatDTO {
    messages: Message[];
    chatOptions: ChatOptions;
    query: string;
}

export interface AddChatApiDto {
    id: string;
    status: boolean;
    baseUrl: string;
    apiKey: string;
    description: string;
}

export interface UpdateChatApiDto {
    id: string;
    status: boolean;
    baseUrl: string;
    apiKey: string;
    description: string;
}

export interface Message {
    role: string;
    content: string;
}

export interface QueryFileDto {
    page: number;
    pageSize: number;
    filter: string | undefined;
}

export interface StoreFile {
    id: number;
    url: string;
    fileName: string;
    vectorId: string[];
    createTime: Date;
    updateTime: Date;
}
