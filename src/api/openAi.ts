import { httpRequest } from "./fetcher";

type OpenAiMessageType = {
    role: "user"|"assistant",
    content: string|null
}

type OpenAiToolType = {
    type: "function",
    function: {
        description: string,
        name: string
    }
}

type OpenAiBodyType = {
    messages: OpenAiMessageType[]
    user?: string
    tools: OpenAiToolType[]
    tool_choice?: "none"|"auto"
}

type OpenAiResponseToolType = OpenAiToolType & {
    id: string
    function: Omit<OpenAiToolType["function"], "description"> &
        {
            arguments: string
        }
}

type OpenAiResponseMessageType = OpenAiMessageType & {
    tool_calls?: OpenAiResponseToolType[]
}

type OpenAiChoiceType = {
    index: number
    message: OpenAiResponseMessageType
    finish_reason: string
}


type OpenAiResponseType = {
    id: string,
    object: "chat.completion",
    created: number, // Unix timestamp in seconds
    model: string,
    system_fingerprint: string,
    logprobs: boolean | null,
    choices: OpenAiChoiceType[],
    usage: {
        prompt_tokens: number,
        completition_tokens: number,
        total_tokens: number
    }
}

export function fetchMessage(body: OpenAiBodyType): Promise<OpenAiResponseType> {
    return httpRequest.post(
        new URL('/chat', "https://16ud3tqrnh.execute-api.us-east-2.amazonaws.com"),
        {
            body: {
                tools: [
                    {
                        function: {
                            description: "This fonction is used to display a contact form. When the user wants or asks how to get in touch, this function will be called.",
                            name: "contact"
                        },
                        type: "function"
                    }
                ],
                ...body
            }
        }
    );
}