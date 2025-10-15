import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Zap, Crown, Sparkles } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      icon: Sparkles,
      features: [
        'Basic video generation',
        'Max 20 seconds',
        'Watermark included',
        'Standard quality',
        'No customization',
      ],
      limitations: ['No QR code', 'No download'],
      cta: 'Current Plan',
      disabled: true,
      gradient: 'from-gray-400 to-gray-500',
    },
    {
      name: 'Premium',
      price: '$19',
      period: '/month',
      icon: Zap,
      popular: true,
      features: [
        'Professional videos',
        'No watermark',
        'Full customization',
        'HD quality',
        'Priority support',
      ],
      cta: 'Upgrade to Premium',
      link: import.meta.env.VITE_PREMIUM_PLAN_URL,
      gradient: 'from-purple-600 to-purple-700',
    },
    {
      name: 'Pro',
      price: '$39',
      period: '/month',
      icon: Crown,
      features: [
        'Everything in Premium',
        'QR code generation',
        'Download videos',
        '4K quality',
        'Custom branding',
        'Analytics dashboard',
      ],
      cta: 'Upgrade to Pro',
      link: import.meta.env.VITE_PRO_PLAN_URL,
      gradient: 'from-pink-600 to-pink-700',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Plan</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => {
                    const Icon = plan.icon;
                    return (
                      <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative rounded-2xl p-6 ${
                          plan.popular
                            ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-xl'
                            : 'bg-white border-2 border-gray-200'
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                              MOST POPULAR
                            </span>
                          </div>
                        )}

                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.gradient} mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                          {plan.period && <span className="text-gray-500">{plan.period}</span>}
                        </div>

                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                          ))}
                          {plan.limitations?.map((limitation, idx) => (
                            <li key={idx} className="flex items-start space-x-2 opacity-50">
                              <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-500 text-sm line-through">{limitation}</span>
                            </li>
                          ))}
                        </ul>

                        {plan.link ? (
                          <a
                            href={plan.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full text-center py-3 rounded-lg font-semibold transition-all bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`}
                          >
                            {plan.cta}
                          </a>
                        ) : (
                          <button
                            disabled={plan.disabled}
                            className="w-full py-3 rounded-lg font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
                          >
                            {plan.cta}
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
