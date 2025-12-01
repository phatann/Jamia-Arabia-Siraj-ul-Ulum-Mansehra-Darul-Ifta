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

export const getSearchSuggestions = async (partialQuery: string, contextFatwas: string): Promise<string[]> => {
    if (!apiKey || partialQuery.length < 2) return [];

    try {
        const prompt = `
            The user is typing a search query on an Islamic Fatwa website.
            Current Input: "${partialQuery}"
            
            Context (Existing Fatwa Titles): 
            ${contextFatwas.substring(0, 1500)}

            Based on the input and the context of Islamic jurisprudence (Fiqh), provide 4-5 concise, relevant autocomplete suggestions.
            Suggestions should be short phrases (2-5 words).
            
            Return ONLY a JSON array of strings.
            Example: ["Prayer times", "Prayer conditions", "Travel prayer rulings"]
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                maxOutputTokens: 200,
            }
        });

        const text = response.text;
        if (!text) return [];
        return JSON.parse(text) as string[];
    } catch (e) {
        // Fail silently for autocomplete features to avoid disrupting UX
        return [];
    }
}

// New function for AI Sir (Google Search Grounding)
export const searchAiSir = async (query: string): Promise<{text: string, sources: any[]}> => {
  if (!apiKey) return { text: "AI Service Unavailable", sources: [] };

  try {
    const prompt = `
      User Query: "${query}"
      
      You are "AI Sir", an intelligent research assistant for Darul Ifta. 
      Search for reliable Islamic information, prioritizing Deoband sources (Darul Uloom Deoband, Darul Ifta archives) if possible.
      
      Provide a comprehensive answer in Urdu (or English if the query is English).
      Include references/sources at the end.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No results found.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (e) {
    console.error("AI Sir Error:", e);
    return { text: "An error occurred while searching.", sources: [] };
  }
};