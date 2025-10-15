import { createVideoPrompt } from './cvParser';
import { QuestionnaireData } from '../types';

const PIKA_API_KEY = import.meta.env.VITE_PIKA_API_KEY;
// NOTE: This is a hypothetical API endpoint for demonstration purposes.
const PIKA_API_URL = 'https://api.pika.art/v1';

export interface PikaGenerationParams {
  cvText: string;
  questionnaireData: QuestionnaireData;
}

export interface PikaStatusResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  progress?: number; // Progress from 0 to 100
}

/**
 * MOCK: Simulates starting a video generation task with the Pika Labs API.
 * In a real-world scenario, this would make a POST request to the API.
 * @returns A promise that resolves with a mock generation ID.
 */
export const generateVideo = async (params: PikaGenerationParams): Promise<string> => {
  if (!PIKA_API_KEY) {
    console.error('Pika API key is not configured in .env file.');
    // In a real app, you'd throw an error. For this demo, we'll proceed.
  }
  const prompt = createVideoPrompt(params.cvText, params.questionnaireData);
  console.log('--- Sending to Pika API (Mock) ---');
  console.log('Endpoint:', `${PIKA_API_URL}/generate`);
  console.log('Prompt:', prompt);
  console.log('API Key:', PIKA_API_KEY ? `${PIKA_API_KEY.substring(0, 4)}...` : 'Not found');
  
  // This simulates an API call and returns a mock ID.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`pika_mock_${Date.now()}`);
    }, 500);
  });
};

const mockProgress: { [key: string]: number } = {};

/**
 * MOCK: Simulates checking the status of a generation task.
 * It progressively increases the 'progress' until it reaches 100%.
 * @returns A promise that resolves with the current generation status.
 */
export const checkVideoStatus = async (generationId: string): Promise<PikaStatusResponse> => {
  if (mockProgress[generationId] === undefined) {
    mockProgress[generationId] = 0;
  }

  // Increment progress to simulate work being done
  mockProgress[generationId] += 25;

  return new Promise(resolve => {
    setTimeout(() => {
      if (mockProgress[generationId] >= 100) {
        resolve({
          id: generationId,
          status: 'completed',
          progress: 100,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // A placeholder video
        });
        delete mockProgress[generationId]; // Clean up
      } else {
        resolve({
          id: generationId,
          status: 'processing',
          progress: mockProgress[generationId],
        });
      }
    }, 1500); // Simulate network and processing delay
  });
};
