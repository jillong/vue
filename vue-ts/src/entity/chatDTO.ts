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
    status: boolean;
    baseUrl: string;
    apiKey: string;
    description: string;
}