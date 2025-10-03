export const AIResponseFormat = `
interface TravelPlanResponse {
  destination: string;
  days: number;
  travelStyle: string;
  interests: string[];
  specialRequirements?: string;
  

  itinerary: {
    day: number;
    morning: string;
    afternoon: string;
    evening: string;
    hiddenGem: {
      name: string;
      description: string; // short cultural background
    };
  }[];

  tipsAndRecommendations: {
    safety: string[];
    etiquette: string[];
    transport: string[];
    general: string[];
  };
}
`;
export const prepareInstructions = ({
  destination,
  days,
  style,
  interests,
  special_requirements,
}: {
  destination: string;
  days: string;
  style: string;
  interests: string;
  special_requirements: string;
}) =>
  `You are an expert travel planner and local culture guide. Create a detailed travel plan based on the following user preferences:
  
  Destination: ${destination}
  Number of days: ${days}
  Travel style: ${style} (e.g. luxury, budget, backpacking, cultural, foodie)
  Interests: ${interests} (e.g. museums, street food, hiking, art galleries, nature, nightlife)
  Special requirements: ${special_requirements} (e.g. vegetarian food, wheelchair accessible)
  
  Format the response as a JSON object using the following interface:
  ${AIResponseFormat}
  
  Generate a clear and inspiring plan. Return ONLY the JSON object. Do NOT include any explanations, backticks, or markdown formatting.`;
