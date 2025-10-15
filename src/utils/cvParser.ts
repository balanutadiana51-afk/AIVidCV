import { QuestionnaireData } from '../types';

export const extractCVText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // For demo purposes, we'll just return a snippet.
      // In a real app, you'd use a library like pdf.js for PDFs.
      resolve(text || `Extracted text from ${file.name}`);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

export const createVideoPrompt = (
  cvText: string,
  questionnaireData: QuestionnaireData
): string => {
  return `Create a professional video CV presentation for a ${questionnaireData.jobGoal} position. 
  Style: ${questionnaireData.style}, Tone: ${questionnaireData.tone}. 
  Highlight: ${questionnaireData.highlights.join(', ')}. 
  Duration: ${questionnaireData.duration} seconds. 
  CV Content: ${cvText.substring(0, 500)}`;
};
