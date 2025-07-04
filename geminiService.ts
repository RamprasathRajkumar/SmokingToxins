import { GoogleGenAI } from "@google/genai";
import { SubstanceContent } from "../types";

// Ensure API key is available in the environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches the estimated substance content for a single cigarette of a given brand.
 * @param brand The brand of the cigarette.
 * @returns A promise that resolves to the substance content object.
 */
export const getSubstanceContent = async (brand: string): Promise<SubstanceContent> => {
  const prompt = `
    Provide the typical content in milligrams (mg) for the following substances found in one single cigarette of the brand "${brand}":
    - Nicotine
    - Tar
    - Carbon Monoxide
    - Formaldehyde
    - Hydrogen Cyanide
    - Benzene
    - Cadmium

    Respond ONLY with a JSON object with keys: "nicotine_mg", "tar_mg", "carbonMonoxide_mg", "formaldehyde_mg", "hydrogenCyanide_mg", "benzene_mg", "cadmium_mg".
    For example: {"nicotine_mg": 1.2, "tar_mg": 10, "carbonMonoxide_mg": 12, "formaldehyde_mg": 0.09, "hydrogenCyanide_mg": 0.7, "benzene_mg": 0.06, "cadmium_mg": 0.0015}.
    If the content for any substance is unknown or not applicable, return a value of 0 for that key. If the brand itself is unknown, return 0 for all keys.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    const content: SubstanceContent = {
      nicotine: Number(parsedData.nicotine_mg) || 0,
      tar: Number(parsedData.tar_mg) || 0,
      carbonMonoxide: Number(parsedData.carbonMonoxide_mg) || 0,
      formaldehyde: Number(parsedData.formaldehyde_mg) || 0,
      hydrogenCyanide: Number(parsedData.hydrogenCyanide_mg) || 0,
      benzene: Number(parsedData.benzene_mg) || 0,
      cadmium: Number(parsedData.cadmium_mg) || 0,
    };
    
    // Check if all values are zero, which indicates brand not found
    const allZero = Object.values(content).every(val => val === 0);
    if(allZero) {
        throw new Error(`Could not find any substance data for "${brand}". Please check the brand name.`);
    }

    return content;
  } catch (error) {
    console.error("Error fetching substance content from Gemini API:", error);
    if(error instanceof Error && error.message.startsWith('Could not find')) {
        throw error;
    }
    throw new Error("Could not fetch substance data. Please try again.");
  }
};
