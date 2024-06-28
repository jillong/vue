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