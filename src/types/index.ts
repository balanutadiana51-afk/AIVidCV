export interface CVData {
  file: File;
  fileName: string;
  fileUrl: string;
}

export interface QuestionnaireData {
  videoType: string;
  duration: number;
  jobGoal: string;
  style: string;
  tone: string;
  highlights: string[];
}

export interface VideoGeneration {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  videoUrl?: string;
  qrCodeUrl?: string;
  createdAt: Date;
}

export type SubscriptionTier = 'free' | 'premium' | 'pro';

export interface UserSubscription {
  tier: SubscriptionTier;
  features: {
    maxDuration: number;
    customization: boolean;
    watermark: boolean;
    qrCode: boolean;
    download: boolean;
  };
}
