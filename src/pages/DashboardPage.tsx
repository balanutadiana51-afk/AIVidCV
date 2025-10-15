import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import RecentVideosTable from '../components/RecentVideosTable';
import { stats, recentVideos } from '../data/mockData';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
          <p className="text-gray-600 mt-1">Here's your performance summary.</p>
        </div>
        <Link to="/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow w-full md:w-auto justify-center"
          >
            <PlusCircle size={20} />
            <span>Create New Video</span>
          </motion.button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard icon={stat.icon} title={stat.title} value={stat.value} change={stat.change} />
          </motion.div>
        ))}
      </div>

      <RecentVideosTable videos={recentVideos} />
    </div>
  );
};

export default DashboardPage;
