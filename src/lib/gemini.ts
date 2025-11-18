import { GoogleGenerativeAI, GenerationConfig, Content, Part } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not set in the environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const chatModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.7,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048,
  },
});

const actionModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      temperature: 0,
      responseMimeType: 'application/json',
    },
});

const actionSystemInstruction: Part = {
  text: `You are an intelligent assistant for a retail Point of Sale (POS) application called VyaparAI. Your primary function is to interpret user commands and translate them into a structured JSON format. Do not add any explanatory text, just return the JSON object.

The possible actions are:
1.  'ADD_ITEM': When the user wants to add a product to the shopping cart.
    -   Example: "Add 2 Parle-G biscuits" -> {"action": "ADD_ITEM", "payload": {"itemName": "Parle-G biscuit", "quantity": 2}}
    -   Example: "put one dove soap in cart" -> {"action": "ADD_ITEM", "payload": {"itemName": "Dove Soap", "quantity": 1}}

2.  'NAVIGATE': When the user wants to go to a different page in the app.
    -   Valid pages are: 'dashboard', 'products', 'billing', 'customers', 'reports', 'settings'.
    -   Example: "Open the billing page" -> {"action": "NAVIGATE", "payload": {"page": "billing"}}
    -   Example: "Show me my reports" -> {"action": "NAVIGATE", "payload": {"page": "reports"}}

3.  'SEARCH': When the user is looking for something specific.
    -   Example: "Find customer Rohan" -> {"action": "SEARCH", "payload": {"query": "Rohan"}}

4.  'CLARIFY': If the command is ambiguous or you cannot determine a clear action.
    -   Example: "Show me the thing" -> {"action": "CLARIFY", "payload": {"message": "I'm not sure what 'thing' you're referring to. Could you be more specific?"}}

5.  'GENERAL_CHAT': If the command is a general question, a greeting, or a request for information that doesn't fit other actions.
    -   Example: "What were my sales today?" -> {"action": "GENERAL_CHAT"}
    -   Example: "Hello, how are you?" -> {"action": "GENERAL_CHAT"}
    -   Example: "Describe the product Dettol soap" -> {"action": "GENERAL_CHAT"}

You must ONLY respond with a valid JSON object based on these rules.
`,
};


export const sendMessageToGemini = async (history: Content[], message: string): Promise<string> => {
  try {
    const chat = chatModel.startChat({ history });
    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};

export const getIntentFromGemini = async (message: string): Promise<any> => {
    try {
        const result = await actionModel.generateContent([actionSystemInstruction, {text: message}]);
        const response = result.response;
        const jsonText = response.text();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error getting intent from Gemini:", error);
        // Fallback to general chat if JSON parsing or API fails
        return { action: 'GENERAL_CHAT' };
    }
}
