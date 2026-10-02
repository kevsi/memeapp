import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Globe, Lock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { updateUserSettings } from './user.service';
import type { UserSettings } from './user.types';

export default function SettingsScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];

  const [settings, setSettings] = useState<UserSettings>({
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
  });

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const handlePrivacyToggle = (key: keyof typeof settings.privacy) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      },
    });
  };

  const handleSave = async () => {
    await updateUserSettings('currentUserId', settings);
    router.back();
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: top + 16, backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft color={colors.foreground} size={24} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* NOTIFICATIONS SECTION */}
      <Animated.View entering={FadeInDown.delay(100).duration(350)}>
        <View style={[styles.section, { paddingHorizontal: 24, marginTop: 24 }]}>
          <View style={styles.sectionHeader}>
            <Bell color={colors.primary} size={20} />
            <Text style={[styles.sectionTitle, { color: colors.foreground, marginLeft: 12 }]}>
              Notifications
            </Text>
          </View>

          {[
            { key: 'messages' as const, label: 'Messages' },
            { key: 'newFollowers' as const, label: 'Nouveaux abonnés' },
            { key: 'defisReminders' as const, label: 'Rappels de défis' },
            { key: 'rewards' as const, label: 'Récompenses' },
          ].map((item) => (
            <View
              key={item.key}
              style={[
                styles.settingRow,
                { borderBottomColor: `${colors.foreground}20`, backgroundColor: colors.card },
              ]}
            >
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                {item.label}
              </Text>
              <Switch
                value={settings.notifications[item.key]}
                onValueChange={() => handleNotificationToggle(item.key)}
                trackColor={{ false: `${colors.foreground}30`, true: colors.primary }}
                thumbColor={settings.notifications[item.key] ? colors.primaryForeground : colors.foreground}
                ios_backgroundColor={`${colors.foreground}30`}
                accessibilityLabel={item.label}
              />
            </View>
          ))}
        </View>
      </Animated.View>

      {/* PRIVACY SECTION */}
      <Animated.View entering={FadeInDown.delay(200).duration(350)}>
        <View style={[styles.section, { paddingHorizontal: 24, marginTop: 24 }]}>
          <View style={styles.sectionHeader}>
            <Lock color={colors.primary} size={20} />
            <Text style={[styles.sectionTitle, { color: colors.foreground, marginLeft: 12 }]}>
              Confidentialité
            </Text>
          </View>

          {[
            { key: 'profilePublic' as const, label: 'Profil public' },
            { key: 'allowMessages' as const, label: 'Autoriser les messages' },
            { key: 'showActivity' as const, label: 'Afficher l\'activité' },
          ].map((item) => (
            <View
              key={item.key}
              style={[
                styles.settingRow,
                { borderBottomColor: `${colors.foreground}20`, backgroundColor: colors.card },
              ]}
            >
              <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                {item.label}
              </Text>
              <Switch
                value={settings.privacy[item.key]}
                onValueChange={() => handlePrivacyToggle(item.key)}
                trackColor={{ false: `${colors.foreground}30`, true: colors.primary }}
                thumbColor={settings.privacy[item.key] ? colors.primaryForeground : colors.foreground}
                ios_backgroundColor={`${colors.foreground}30`}
                accessibilityLabel={item.label}
              />
            </View>
          ))}
        </View>
      </Animated.View>

      {/* LANGUAGE SECTION */}
      <Animated.View entering={FadeInDown.delay(300).duration(350)}>
        <View style={[styles.section, { paddingHorizontal: 24, marginTop: 24 }]}>
          <View style={styles.sectionHeader}>
            <Globe color={colors.primary} size={20} />
            <Text style={[styles.sectionTitle, { color: colors.foreground, marginLeft: 12 }]}>
              Langue
            </Text>
          </View>

          <View
            style={[
              styles.settingRow,
              { borderBottomColor: `${colors.foreground}20`, backgroundColor: colors.card },
            ]}
          >
            <Text style={[styles.settingLabel, { color: colors.foreground }]}>
              {settings.language === 'fr' ? 'Français' : 'English'}
            </Text>
            <Text style={[styles.settingValue, { color: colors.primary }]}>
              {settings.language.toUpperCase()}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* SAVE BUTTON */}
      <Animated.View entering={FadeInDown.delay(400).duration(350)} style={{ paddingHorizontal: 24, marginTop: 32 }}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>
            Enregistrer les modifications
          </Text>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  section: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
