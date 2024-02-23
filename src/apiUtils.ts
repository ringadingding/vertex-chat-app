const API_ENDPOINT = "us-central1-aiplatform.googleapis.com";
const PROJECT_ID = "wise-dispatcher-408106";
const MODEL_ID = "gemini-pro";
const LOCATION_ID = "us-central1";

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface APIResponse {
    // Add properties you expect in the response 
    candidates: [{content: ChatMessage}];
}

function createRequestObject(
    chatMessages: ChatMessage[],
    maxOutputTokens: number = 2048,
    temperature: number = 0.9,
    topP: number = 1
) {
    return {
        contents: chatMessages,
        generation_config: {
            maxOutputTokens: maxOutputTokens,
            temperature: temperature,
            topP: topP
        },
        safetySettings: [
            {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_ONLY_HIGH"
            },
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_ONLY_HIGH"
            },
            {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_ONLY_HIGH"
            },
            {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_ONLY_HIGH"
            }
        ]
    };
}

async function sendRequest(chatMessages: ChatMessage[], accessToken: string): Promise<APIResponse> { // Add return type
    const requestObject = createRequestObject(chatMessages);

    const response = await fetch(`https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:generateContent`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObject)
    });

    // Handle the response from the API 
    if (response.ok) {
        const data: APIResponse = await response.json(); // Type the response
        console.log("API Response:", data);
        return data; // Return the typed data
    } else {
        console.error("API Error:", response.status, response.statusText);
        throw new Error('API Error'); // Or a custom error type 
    }
}

export { createRequestObject, sendRequest }; 
