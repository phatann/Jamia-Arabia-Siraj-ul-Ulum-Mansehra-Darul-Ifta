import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getGeminiResponse = async (prompt: string, context?: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return "AI service is currently unavailable. Please check back later.";
  }

  try {
    const fullPrompt = `
      You are a helpful assistant for an Islamic Fatwa website (Darul Ifta).
      The user is asking: "${prompt}".
      
      ${context ? `Context/Existing Fatwas to consider: ${context}` : ''}

      Please provide a polite, concise, and informative response. 
      IMPORTANT: If the question requires a specific legal ruling (Fatwa), clearly state that "This is an AI-generated summary for informational purposes only and not a formal Fatwa. Please consult a qualified Mufti for a binding ruling."
      
      Format the response with clear paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while communicating with the AI service.";
  }
};

export const findRelatedFatwasWithAI = async (query: string, availableFatwas: string): Promise<string[]> => {
    if (!apiKey) return [];
    
    try {
        const prompt = `
            I have a list of fatwas with the following titles and IDs:
            ${availableFatwas}

            The user searched for: "${query}".

            Return a JSON array of the IDs of the fatwas that are most relevant to this search query. If none are relevant, return an empty array.
            Example format: ["1001", "1004"]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        const text = response.text;
        if (!text) return [];
        return JSON.parse(text) as string[];
    } catch (e) {
        console.error("Search error", e);
        return [];
    }
}