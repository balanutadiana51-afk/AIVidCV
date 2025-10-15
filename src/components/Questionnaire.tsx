import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { QuestionnaireData } from '../types';

interface QuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<QuestionnaireData>({
    videoType: 'professional',
    duration: 15,
    jobGoal: '',
    style: 'modern',
    tone: 'confident',
    highlights: [],
  });

  const videoTypes = [
    { value: 'professional', label: 'Professional Introduction', icon: '💼' },
    { value: 'creative', label: 'Creative Portfolio', icon: '🎨' },
    { value: 'technical', label: 'Technical Showcase', icon: '💻' },
    { value: 'executive', label: 'Executive Summary', icon: '👔' },
  ];

  const styles = [
    { value: 'modern', label: 'Modern & Clean' },
    { value: 'bold', label: 'Bold & Dynamic' },
    { value: 'minimal', label: 'Minimal & Elegant' },
    { value: 'vibrant', label: 'Vibrant & Energetic' },
  ];

  const tones = [
    { value: 'confident', label: 'Confident' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
  ];

  const highlightOptions = [
    'Skills & Expertise',
    'Work Experience',
    'Education',
    'Achievements',
    'Projects',
    'Certifications',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const toggleHighlight = (highlight: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.includes(highlight)
        ? prev.highlights.filter(h => h !== highlight)
        : [...prev.highlights, highlight],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Sparkles className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Customize Your Video</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of video do you want?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videoTypes.map((type) => (
              <motion.button
                key={type.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, videoType: type.value })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.videoType === type.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="font-medium text-gray-800">{type.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Duration (seconds)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="10"
              max="20"
              step="5"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span className="text-lg font-semibold text-purple-600 w-16 text-center">
              {formData.duration}s
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Free users: max 20 seconds</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What job position are you targeting?
          </label>
          <input
            type="text"
            required
            value={formData.jobGoal}
            onChange={(e) => setFormData({ ...formData, jobGoal: e.target.value })}
            placeholder="e.g., Senior Software Engineer, Marketing Manager"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Video Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {styles.map((style) => (
              <motion.button
                key={style.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, style: style.value })}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.style === style.value
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-700 hover:border-purple-300'
                }`}
              >
                {style.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tone of Voice
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tones.map((tone) => (
              <motion.button
                key={tone.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFormData({ ...formData, tone: tone.value })}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  formData.tone === tone.value
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-700 hover:border-purple-300'
                }`}
              >
                {tone.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What to highlight? (Select multiple)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {highlightOptions.map((highlight) => (
              <motion.button
                key={highlight}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleHighlight(highlight)}
                className={`p-2 rounded-lg border-2 text-sm transition-all ${
                  formData.highlights.includes(highlight)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 text-gray-600 hover:border-purple-300'
                }`}
              >
                {highlight}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <span>Generate My Video</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Questionnaire;
