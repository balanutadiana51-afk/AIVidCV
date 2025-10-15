import { Video, Eye, BarChart, Gem } from 'lucide-react';

export const stats = [
  {
    title: 'Videos Generated',
    value: '5',
    icon: Video,
    change: '+2 this month',
  },
  {
    title: 'Total Views',
    value: '1,287',
    icon: Eye,
    change: '+15.2%',
  },
  {
    title: 'Engagement Rate',
    value: '63%',
    icon: BarChart,
    change: '-1.8%',
  },
  {
    title: 'Subscription',
    value: 'Pro Plan',
    icon: Gem,
    change: 'Renews on Aug 12',
  },
];

export const recentVideos = [
  {
    id: 'vid1',
    title: 'Senior Software Engineer',
    date: '2025-07-15',
    views: 452,
    status: 'Completed',
  },
  {
    id: 'vid2',
    title: 'Product Manager Application',
    date: '2025-07-12',
    views: 128,
    status: 'Completed',
  },
  {
    id: 'vid3',
    title: 'UX/UI Designer Portfolio',
    date: '2025-07-10',
    views: 670,
    status: 'Completed',
  },
  {
    id: 'vid4',
    title: 'Data Scientist Role',
    date: '2025-06-28',
    views: 35,
    status: 'Completed',
  },
];
