/**
 * User Profile Mock Data & Utilities
 * Provides sample data and utility functions for user profile
 */

import {
    Badge,
    CompleteUserProfile,
    Reward,
    StreakData,
    Trophy,
    UserDefisParticipation,
    UserMeme,
    UserProfile,
    UserRank,
    UserSettings,
    UserStats,
} from './user.types';

// ===== MOCK USER PROFILE =====
export const MOCK_USER_PROFILE: UserProfile = {
  id: '1',
  username: '@alexanders',
  displayName: 'Alexandre',
  bio: 'Meme Creator & Challenger 🎨',
  avatar: 'https://i.pravatar.cc/300',
  coverImage: 'https://picsum.photos/600/300?random=1',
  isPremium: true,
  createdAt: '2023-06-15T10:30:00Z',
  lastActiveAt: new Date().toISOString(),
};

// ===== MOCK STATS =====
export const MOCK_STATS: UserStats = {
  followersCount: 10250,
  followingCount: 1840,
  defisWon: 47,
  totalMemes: 328,
  totalViews: 2345000,
  totalLikes: 156800,
};

// ===== MOCK RANK =====
export const MOCK_RANK: UserRank = {
  level: 'gold',
  points: 7850,
  nextLevelPoints: 10000,
  percentageToNext: 78.5,
  rank: 142,
  totalPoints: 27850,
};

// ===== MOCK STREAK =====
export const MOCK_STREAK: StreakData = {
  currentStreak: 7,
  longestStreak: 23,
  lastPostDate: new Date().toISOString(),
  daysParticipation: [1, 2, 3, 4, 5, 6, 7],
};

// ===== MOCK BADGES =====
export const MOCK_BADGES: Badge[] = [
  {
    id: '1',
    name: 'Viral Master',
    description: 'Get 10K views in a single day',
    icon: '🚀',
    rarity: 'legendary',
    unlockedAt: '2024-08-20T15:30:00Z',
  },
  {
    id: '2',
    name: 'First Meme',
    description: 'Create your first meme',
    icon: '🎬',
    rarity: 'common',
    unlockedAt: '2023-06-15T10:30:00Z',
  },
  {
    id: '3',
    name: 'Challenge Accepted',
    description: 'Win 5 defis',
    icon: '🏆',
    rarity: 'epic',
    unlockedAt: '2024-03-10T12:00:00Z',
  },
  {
    id: '4',
    name: 'Social Butterfly',
    description: 'Get 5K followers',
    icon: '🦋',
    rarity: 'rare',
    unlockedAt: '2024-07-22T18:45:00Z',
  },
  {
    id: '5',
    name: 'On Fire 🔥',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    unlockedAt: '2024-12-08T09:15:00Z',
  },
];

// ===== MOCK TROPHIES =====
export const MOCK_TROPHIES: Trophy[] = [
  {
    id: '1',
    title: 'Champion Creator 2024',
    description: 'Won 10 defis this year',
    icon: '🥇',
    earnedDate: '2024-12-01T00:00:00Z',
    rarity: 'gold',
  },
  {
    id: '2',
    title: 'Trending King',
    description: 'Had 5 posts trending simultaneously',
    icon: '👑',
    earnedDate: '2024-11-15T14:20:00Z',
    rarity: 'platinum',
  },
  {
    id: '3',
    title: 'Early Adopter',
    description: 'One of the first 1000 users',
    icon: '🌟',
    earnedDate: '2023-06-20T08:00:00Z',
    rarity: 'silver',
  },
];

// ===== MOCK REWARDS =====
export const MOCK_REWARDS: Reward[] = [
  {
    id: '1',
    type: 'points',
    title: 'Weekly Bonus',
    description: 'Earned from daily posts',
    icon: '⭐',
    value: 250,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'filter',
    title: 'Exclusive Rainbow Filter',
    description: 'Limited time filter',
    icon: '🌈',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'badge',
    title: 'VIP Badge',
    description: 'Show your premium status',
    icon: '💎',
  },
  {
    id: '4',
    type: 'premium',
    title: '+7 days Premium',
    description: 'Extend your premium membership',
    icon: '🎁',
  },
];

// ===== MOCK USER MEMES =====
export const MOCK_USER_MEMES: UserMeme[] = [
  {
    id: '1',
    title: 'POV: Monday Morning',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    createdAt: '2024-12-08T10:30:00Z',
    likes: 2450,
    shares: 890,
    views: 45000,
    defisParticipation: ['1'],
  },
  {
    id: '2',
    title: 'When you find the perfect meme format',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    createdAt: '2024-12-07T15:45:00Z',
    likes: 3120,
    shares: 1200,
    views: 62000,
    defisParticipation: ['2'],
  },
  {
    id: '3',
    title: 'Coffee vs Me',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    createdAt: '2024-12-06T09:20:00Z',
    likes: 1890,
    shares: 450,
    views: 35000,
  },
];

// ===== MOCK DEFIS HISTORY =====
export const MOCK_DEFIS_HISTORY: UserDefisParticipation[] = [
  {
    id: '1',
    defiId: '1',
    defiTitle: 'POV YOUR WAKE UP IN',
    submissionDate: '2024-12-08T14:30:00Z',
    won: true,
    placement: 1,
  },
  {
    id: '2',
    defiId: '2',
    defiTitle: 'GUERRE DES FRUITS',
    submissionDate: '2024-12-05T11:20:00Z',
    won: true,
    placement: 2,
  },
  {
    id: '3',
    defiId: '3',
    defiTitle: 'MEME WARS 2025',
    submissionDate: '2024-12-04T16:45:00Z',
    won: false,
  },
];

// ===== MOCK SETTINGS =====
export const MOCK_SETTINGS: UserSettings = {
  theme: 'dark',
  notifications: {
    messages: true,
    newFollowers: true,
    defisReminders: true,
    rewards: true,
  },
  privacy: {
    profilePublic: true,
    allowMessages: true,
    showActivity: true,
  },
  language: 'fr',
};

// ===== COMPLETE MOCK PROFILE =====
export const MOCK_COMPLETE_PROFILE: CompleteUserProfile = {
  profile: MOCK_USER_PROFILE,
  stats: MOCK_STATS,
  rank: MOCK_RANK,
  streak: MOCK_STREAK,
  badges: MOCK_BADGES,
  trophies: MOCK_TROPHIES,
  rewards: MOCK_REWARDS,
  memes: MOCK_USER_MEMES,
  defisHistory: MOCK_DEFIS_HISTORY,
  settings: MOCK_SETTINGS,
};

// ===== UTILITY FUNCTIONS =====

/**
 * Calculate user level based on points
 */
export const calculateUserLevel = (totalPoints: number): 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' => {
  if (totalPoints >= 50000) return 'diamond';
  if (totalPoints >= 30000) return 'platinum';
  if (totalPoints >= 15000) return 'gold';
  if (totalPoints >= 5000) return 'silver';
  return 'bronze';
};

/**
 * Format large numbers for display
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

/**
 * Calculate percentage to next level
 */
export const calculatePercentageToNext = (current: number, next: number): number => {
  if (next <= current) return 100;
  return Math.round((current / next) * 100);
};

/**
 * Get badge rarity color
 */
export const getBadgeRarityColor = (rarity: 'common' | 'rare' | 'epic' | 'legendary'): string => {
  switch (rarity) {
    case 'common':
      return '#808080';
    case 'rare':
      return '#4169E1';
    case 'epic':
      return '#9932CC';
    case 'legendary':
      return '#FFD700';
    default:
      return '#808080';
  }
};

/**
 * Get trophy rarity color
 */
export const getTrophyRarityColor = (rarity: 'bronze' | 'silver' | 'gold' | 'platinum'): string => {
  switch (rarity) {
    case 'bronze':
      return '#CD7F32';
    case 'silver':
      return '#C0C0C0';
    case 'gold':
      return '#FFD700';
    case 'platinum':
      return '#E5E4E2';
    default:
      return '#808080';
  }
};

/**
 * Check if streak is active (last post was today or yesterday)
 */
export const isStreakActive = (lastPostDate: string): boolean => {
  const now = Date.now();
  const lastPost = new Date(lastPostDate).getTime();
  const dayInMs = 24 * 60 * 60 * 1000;
  const daysSinceLastPost = Math.floor((now - lastPost) / dayInMs);
  return daysSinceLastPost <= 1;
};

/**
 * Calculate days until reward expires
 */
export const daysUntilExpiry = (expiryDate: string | undefined): number => {
  if (!expiryDate) return Infinity;
  const now = Date.now();
  const expiry = new Date(expiryDate).getTime();
  const dayInMs = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.ceil((expiry - now) / dayInMs));
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
