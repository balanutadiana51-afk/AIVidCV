import { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  value: string;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change }) => {
  const isPositive = !change.startsWith('-');
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 font-medium">{title}</h3>
        <div className="bg-purple-100 p-2 rounded-lg">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
    </motion.div>
  );
};

export default StatCard;
