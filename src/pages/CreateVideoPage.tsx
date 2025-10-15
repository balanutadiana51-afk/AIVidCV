import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CVUploader from '../components/CVUploader';
import Questionnaire from '../components/Questionnaire';
import VideoGenerator from '../components/VideoGenerator';
import { CVData, QuestionnaireData, VideoGeneration, SubscriptionTier } from '../types';
import { Play, RefreshCw } from 'lucide-react';

type Step = 'upload' | 'questionnaire' | 'generate' | 'complete';

const CreateVideoPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [subscriptionTier] = useState<SubscriptionTier>('pro'); // Mock as pro for demo
  const navigate = useNavigate();

  const handleCVUpload = (data: CVData) => {
    setCvData(data);
    setCurrentStep('questionnaire');
  };

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data);
    setCurrentStep('generate');
  };

  const handleVideoComplete = (video: VideoGeneration) => {
    console.log('Video generation completed', video);
    setCurrentStep('complete');
    // In a real app, you'd save the video data.
    // We'll navigate back to the dashboard after a short delay.
    setTimeout(() => navigate('/'), 8000);
  };

  const handleStartOver = () => {
    setCvData(null);
    setQuestionnaireData(null);
    setCurrentStep('upload');
  };

  return (
    <AnimatePresence mode="wait">
      {currentStep === 'upload' && (
        <motion.div
          key="upload"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4"
            >
              <Play className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Transform Your CV into a
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {' '}Stunning Video
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stand out from the crowd with an AI-generated video CV. Share it anywhere with a QR code!
            </p>
          </div>
          <CVUploader onUpload={handleCVUpload} />
        </motion.div>
      )}

      {currentStep === 'questionnaire' && (
        <motion.div
          key="questionnaire"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        </motion.div>
      )}

      {(currentStep === 'generate' || currentStep === 'complete') && cvData && questionnaireData && (
        <motion.div
          key="generate"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <VideoGenerator
            cvData={cvData}
            questionnaireData={questionnaireData}
            subscriptionTier={subscriptionTier}
            onComplete={handleVideoComplete}
            onRestart={handleStartOver}
          />
          {currentStep === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartOver}
                className="inline-flex items-center space-x-2 bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Create Another Video</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateVideoPage;
