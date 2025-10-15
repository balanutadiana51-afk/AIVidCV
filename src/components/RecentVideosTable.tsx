import { Share2, Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Video = {
  id: string;
  title: string;
  date: string;
  views: number;
  status: string;
};

interface RecentVideosTableProps {
  videos: Video[];
}

const RecentVideosTable: React.FC<RecentVideosTableProps> = ({ videos }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4 px-2 sm:px-0">Recent Videos</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Video Title</th>
              <th className="py-3 px-4 font-semibold text-gray-600 text-sm hidden md:table-cell">Date Created</th>
              <th className="py-3 px-4 font-semibold text-gray-600 text-sm hidden sm:table-cell">Views</th>
              <th className="py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
              <th className="py-3 px-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <motion.tr 
                key={video.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 font-medium text-gray-800">{video.title}</td>
                <td className="py-4 px-4 text-gray-500 hidden md:table-cell">{video.date}</td>
                <td className="py-4 px-4 text-gray-500 hidden sm:table-cell">{video.views}</td>
                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">{video.status}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                    <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-100 rounded-full transition-colors"><Share2 size={18} /></button>
                    <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-100 rounded-full transition-colors"><Download size={18} /></button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"><Trash2 size={18} /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default RecentVideosTable;
