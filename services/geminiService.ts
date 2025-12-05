import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateLuxuryGreeting = async (name: string): Promise<string> => {
  if (!apiKey) {
    return `Greetings, ${name}. May your holidays be filled with golden moments and emerald dreams.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a very short, opulent, and poetic Christmas greeting for "${name}". 
      Tone: Ultra-luxury, sophisticated, magical, cinematic. 
      Keywords to inspire: Gold, Starlight, Timeless, Elegance.
      Length: Maximum 25 words. 
      Output: Just the text, no quotes.`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini generation error:", error);
    return `For ${name}, wishing you a season of resplendent joy and timeless elegance.`;
  }
};