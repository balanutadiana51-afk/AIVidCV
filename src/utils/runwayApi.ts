import axios from 'axios';

const RUNWAY_API_KEY = import.meta.env.VITE_RUNWAY_API_KEY;
const RUNWAY_API_URL = 'https://api.runwayml.com/v1';

export interface RunwayGenerationParams {
  prompt: string;
  duration: number;
  style?: string;
}

export const generateVideo = async (params: RunwayGenerationParams): Promise<string> => {
  try {
    const response = await axios.post(
      `${RUNWAY_API_URL}/generate`,
      {
        prompt: params.prompt,
        duration: params.duration,
        style: params.style || 'professional',
        model: 'gen-2',
      },
      {
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.id;
  } catch (error) {
    console.error('Error generating video:', error);
    throw new Error('Failed to generate video');
  }
};

export const checkVideoStatus = async (generationId: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${RUNWAY_API_URL}/generate/${generationId}`,
      {
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error checking video status:', error);
    throw new Error('Failed to check video status');
  }
};
