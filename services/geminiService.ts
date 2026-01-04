
import { GoogleGenAI } from "@google/genai";

// Initialize GoogleGenAI using process.env.API_KEY directly as required
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAssistance = async (prompt: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context ? `${context}\n\nUser Question: ${prompt}` : prompt,
      config: {
        systemInstruction: "You are AdjusterPro AI, an expert assistant for a Public Adjusting firm. You help clients understand their policies, describe property damage, and provide guidance on insurance claims. Be professional, empathetic, and informative. Never provide legal or financial advice as if you are an attorney, but refer to public adjusting best practices."
      }
    });
    // Return extracted text using the .text property
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again or call our support line.";
  }
};
