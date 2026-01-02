
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-pro-preview';

export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
};

export const generateBusinessAdvice = async (message: string, systemInstruction: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: message,
    config: {
      systemInstruction,
      temperature: 0.7,
      topP: 0.9,
    },
  });
  return response.text;
};

export const generateProfessionalPrompt = async (data: any, lang: 'en' | 'ar') => {
  const ai = getGeminiClient();
  const prompt = `Based on the following parameters, create a high-quality, professional LLM prompt in ${lang === 'en' ? 'English' : 'Arabic'}:
    Role: ${data.role}
    Context: ${data.context}
    Objective: ${data.objective}
    Constraints: ${data.constraints}
    Output Format: ${data.format}`;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      systemInstruction: "You are an expert Prompt Engineer. Your task is to output only the final generated prompt, optimized for high-level business execution.",
    },
  });
  return response.text;
};
