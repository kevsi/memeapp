/**
 * User Profile System - Main Export
 * Centralized exports for all profile-related types and functions
 */

// Types
export type {
    Badge, CompleteUserProfile, Reward, StatCard,
    StreakData,
    StreakDay, Trophy, UserDefisParticipation, UserLevel, UserMeme, UserProfile, UserProfileResponse, UserRank, UserSettings, UserStats
} from './user.types';

// Mock Data
export {
    MOCK_BADGES, MOCK_COMPLETE_PROFILE, MOCK_DEFIS_HISTORY, MOCK_RANK, MOCK_REWARDS, MOCK_SETTINGS, MOCK_STATS, MOCK_STREAK, MOCK_TROPHIES, MOCK_USER_MEMES, MOCK_USER_PROFILE
} from './user.data';

// Utility Functions
export {
    calculatePercentageToNext, calculateUserLevel, daysUntilExpiry,
    formatDate, formatNumber, getBadgeRarityColor,
    getTrophyRarityColor,
    isStreakActive
} from './user.data';

// Services
export {
    claimReward,
    deleteMeme,
    fetchPublicUserProfile, fetchUserBadges, fetchUserDefisHistory, fetchUserMemes, fetchUserProfile, fetchUserRewards, fetchUserStats, fetchUserTrophies, followUser,
    unfollowUser, updateUserProfile, updateUserSettings
} from './user.service';

