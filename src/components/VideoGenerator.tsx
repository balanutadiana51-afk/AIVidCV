import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Download, Share2, QrCode, ServerCrash, RefreshCw } from 'lucide-react';
import { CVData, QuestionnaireData, VideoGeneration, SubscriptionTier } from '../types';
import { generateQRCode } from '../utils/qrCodeGenerator';
import { generateVideo, checkVideoStatus } from '../utils/pikaApi';
import { extractCVText } from '../utils/cvParser';

interface VideoGeneratorProps {
  cvData: CVData;
  questionnaireData: QuestionnaireData;
  subscriptionTier: SubscriptionTier;
  onComplete: (video: VideoGeneration) => void;
  onRestart: () => void;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({
  cvData,
  questionnaireData,
  subscriptionTier,
  onComplete,
  onRestart,
}) => {
  const [generation, setGeneration] = useState<VideoGeneration>({
    id: '',
    status: 'pending',
    progress: 0,
    createdAt: new Date(),
  });
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [generationId, setGenerationId] = useState<string | null>(null);

  // 1. Start the video generation process
  useEffect(() => {
    const startGeneration = async () => {
      setGeneration(prev => ({ ...prev, status: 'processing', progress: 0 }));
      try {
        const cvText = await extractCVText(cvData.file);
        const id = await generateVideo({ cvText, questionnaireData });
        setGenerationId(id);
      } catch (error) {
        console.error("Failed to start generation:", error);
        setGeneration(prev => ({ ...prev, status: 'failed' }));
      }
    };
    startGeneration();
  }, [cvData, questionnaireData]);

  // 2. Poll for status updates
  useEffect(() => {
    if (!generationId || generation.status !== 'processing') return;

    const interval = setInterval(async () => {
      try {
        const statusResponse = await checkVideoStatus(generationId);
        
        setGeneration(prev => ({ ...prev, progress: statusResponse.progress || prev.progress }));

        if (statusResponse.status === 'completed') {
          clearInterval(interval);
          const qrCode = await generateQRCode(statusResponse.videoUrl || window.location.href);
          const finalVideo = {
            ...generation,
            id: generationId,
            status: 'completed',
            videoUrl: statusResponse.videoUrl,
            qrCodeUrl: qrCode,
          };
          setGeneration(finalVideo);
          setQrCodeData(qrCode);
          onComplete(finalVideo);
        } else if (statusResponse.status === 'failed') {
          clearInterval(interval);
          setGeneration(prev => ({ ...prev, status: 'failed' }));
        }
      } catch (error) {
        console.error("Failed to poll status:", error);
        clearInterval(interval);
        setGeneration(prev => ({ ...prev, status: 'failed' }));
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [generationId, generation.status, onComplete]);


  const getWatermarkOverlay = () => {
    if (subscriptionTier === 'free') {
      return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            AI VidCV Free Version
          </div>
        </div>
      );
    }
    return null;
  };

  if (generation.status === 'processing' || generation.status === 'pending') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center space-y-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Loader2 className="w-16 h-16 text-purple-600" />
          </motion.div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Creating Your Video CV
            </h3>
            <p className="text-gray-500">
              Using Pika Labs AI... This might take a moment.
            </p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${generation.progress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
            />
          </div>

          <p className="text-lg font-medium text-purple-600">
            {generation.progress}% Complete
          </p>
        </div>
      </motion.div>
    );
  }

  if (generation.status === 'failed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <ServerCrash className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Generation Failed</h3>
        <p className="text-gray-500 mb-6">
          Something went wrong while creating your video. Please try again.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="inline-flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Again</span>
        </motion.button>
      </motion.div>
    );
  }

  if (generation.status === 'completed' && generation.videoUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto space-y-6"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <div className="flex items-center space-x-2 text-white">
              <CheckCircle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Your Video is Ready!</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video
                controls
                className="w-full"
                src={generation.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
              {getWatermarkOverlay()}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptionTier !== 'free' && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={subscriptionTier === 'premium'}
                  className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium ${
                    subscriptionTier === 'pro'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Video</span>
                  {subscriptionTier === 'premium' && <span className="text-xs">(Pro Only)</span>}
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Video</span>
              </motion.button>
            </div>
          </div>
        </div>

        {(subscriptionTier === 'pro' && qrCodeData) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={qrCodeData}
                  alt="QR Code"
                  className="w-48 h-48 border-4 border-gray-200 rounded-xl"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2 mb-3">
                  <QrCode className="w-6 h-6 text-purple-600" />
                  <h4 className="text-xl font-bold text-gray-800">Your QR Code</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Share this QR code so others can view your video CV on their phones instantly!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Download QR Code
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return null;
};

export default VideoGenerator;
