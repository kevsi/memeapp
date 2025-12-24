/**
 * User Profile Types & Interfaces
 * Contains all data structures for user profile functionality
 */

// ===== USER PROFILE =====
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  coverImage?: string;
  isPremium: boolean;
  createdAt: string;
  lastActiveAt: string;
}

// ===== STATISTICS =====
export interface UserStats {
  followersCount: number;
  followingCount: number;
  defisWon: number;
  totalMemes: number;
  totalViews: number;
  totalLikes: number;
}

export interface StatCard {
  id: string;
  icon: 'users' | 'trophy' | 'flame' | 'heart' | 'eye';
  title: string;
  value: number;
  unit: string;
  change: number; // percentage
  color: string;
}

// ===== STREAKS =====
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastPostDate: string;
  daysParticipation: number[];
}

export interface StreakDay {
  day: number;
  completed: boolean;
  postCount?: number;
}

// ===== BADGES & REWARDS =====
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
  progress?: number; // 0-100 for ongoing badges
}

export interface Trophy {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface Reward {
  id: string;
  type: 'points' | 'badge' | 'trophy' | 'filter' | 'premium';
  title: string;
  description: string;
  icon: string;
  value?: number; // for points
  expiresAt?: string;
}

// ===== USER LEVEL & RANK =====
export type UserLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface UserRank {
  level: UserLevel;
  points: number;
  nextLevelPoints: number;
  percentageToNext: number;
  rank: number;
  totalPoints: number;
}

// ===== PREFERENCES & SETTINGS =====
export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    messages: boolean;
    newFollowers: boolean;
    defisReminders: boolean;
    rewards: boolean;
  };
  privacy: {
    profilePublic: boolean;
    allowMessages: boolean;
    showActivity: boolean;
  };
  language: string;
}

// ===== USER CONTENT =====
export interface UserMeme {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: number;
  shares: number;
  views: number;
  defisParticipation?: string[];
}

export interface UserDefisParticipation {
  id: string;
  defiId: string;
  defiTitle: string;
  submissionDate: string;
  won: boolean;
  placement?: number;
}

// ===== COMPLETE USER PROFILE OBJECT =====
export interface CompleteUserProfile {
  profile: UserProfile;
  stats: UserStats;
  rank: UserRank;
  streak: StreakData;
  badges: Badge[];
  trophies: Trophy[];
  rewards: Reward[];
  memes: UserMeme[];
  defisHistory: UserDefisParticipation[];
  settings: UserSettings;
}

// ===== MOCK DATA TYPES =====
export interface UserProfileResponse {
  success: boolean;
  data?: CompleteUserProfile;
  error?: string;
}
