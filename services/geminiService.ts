import { GoogleGenAI } from "@google/genai";
import { LogoParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLogoImage = async (params: LogoParams): Promise<string> => {
  const prompt = `
    Design a professional logo for a software company named "${params.companyName}".
    The associated domain is "${params.domain}".
    
    Style Direction: ${params.style}
    Primary Color Theme: ${params.primaryColor}
    
    Additional Requirements:
    ${params.additionalDetails || 'Ensure the design is modern, scalable, and suitable for a tech brand.'}
    
    The output should be a high-quality logo on a solid background (white or dark depending on the contrast).
    Focus on clarity, memorability, and relevance to the software industry.
    Do not include any realistic photos; stick to graphic design and vector art styles.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
           // Standard Gemini image response
           return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in the response.");

  } catch (error) {
    console.error("Error generating logo:", error);
    throw error;
  }
};
