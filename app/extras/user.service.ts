/**
 * User Profile Services
 * Handles API calls and data management for user profile
 */

import { MOCK_COMPLETE_PROFILE } from './user.data';
import {
    UserProfile,
    UserProfileResponse,
    UserSettings
} from './user.types';

// ===== PROFILE SERVICE =====

/**
 * Fetch complete user profile
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfileResponse> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/users/${userId}/profile`);
    // return await response.json();

    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: MOCK_COMPLETE_PROFILE,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch profile',
    };
  }
};

/**
 * Update user profile information
 */
export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfileResponse> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/users/${userId}/profile`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates),
    // });
    // return await response.json();

    const updated = { ...MOCK_COMPLETE_PROFILE.profile, ...updates };
    return {
      success: true,
      data: { ...MOCK_COMPLETE_PROFILE, profile: updated },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update profile',
    };
  }
};

/**
 * Fetch user statistics
 */
export const fetchUserStats = async (userId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: MOCK_COMPLETE_PROFILE.stats,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch stats',
    };
  }
};

/**
 * Fetch user badges
 */
export const fetchUserBadges = async (userId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: MOCK_COMPLETE_PROFILE.badges,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch badges',
    };
  }
};

/**
 * Fetch user trophies
 */
export const fetchUserTrophies = async (userId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: MOCK_COMPLETE_PROFILE.trophies,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch trophies',
    };
  }
};

/**
 * Fetch user rewards
 */
export const fetchUserRewards = async (userId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Filter out expired rewards
    const activeRewards = MOCK_COMPLETE_PROFILE.rewards.filter((reward) => {
      if (!reward.expiresAt) return true;
      return new Date(reward.expiresAt).getTime() > Date.now();
    });

    return {
      success: true,
      data: activeRewards,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch rewards',
    };
  }
};

/**
 * Fetch user memes
 */
export const fetchUserMemes = async (userId: string, limit: number = 10, offset: number = 0) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const memes = MOCK_COMPLETE_PROFILE.memes.slice(offset, offset + limit);
    return {
      success: true,
      data: memes,
      total: MOCK_COMPLETE_PROFILE.memes.length,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch memes',
    };
  }
};

/**
 * Fetch user defis history
 */
export const fetchUserDefisHistory = async (userId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      data: MOCK_COMPLETE_PROFILE.defisHistory,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch defis history',
    };
  }
};

/**
 * Update user settings
 */
export const updateUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    // TODO: Replace with actual API call
    const updated = { ...MOCK_COMPLETE_PROFILE.settings, ...settings };
    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update settings',
    };
  }
};

/**
 * Follow user
 */
export const followUser = async (userId: string, targetUserId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'User followed',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to follow user',
    };
  }
};

/**
 * Unfollow user
 */
export const unfollowUser = async (userId: string, targetUserId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'User unfollowed',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to unfollow user',
    };
  }
};

/**
 * Claim reward
 */
export const claimReward = async (userId: string, rewardId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'Reward claimed',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to claim reward',
    };
  }
};

/**
 * Delete meme
 */
export const deleteMeme = async (userId: string, memeId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      success: true,
      message: 'Meme deleted',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete meme',
    };
  }
};

/**
 * Get user public profile (for viewing other users)
 */
export const fetchPublicUserProfile = async (userId: string) => {
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return only public data
    return {
      success: true,
      data: {
        profile: MOCK_COMPLETE_PROFILE.profile,
        stats: MOCK_COMPLETE_PROFILE.stats,
        rank: MOCK_COMPLETE_PROFILE.rank,
        badges: MOCK_COMPLETE_PROFILE.badges,
        trophies: MOCK_COMPLETE_PROFILE.trophies,
        memes: MOCK_COMPLETE_PROFILE.memes,
        // Don't include settings or private info
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to fetch public profile',
    };
  }
};
