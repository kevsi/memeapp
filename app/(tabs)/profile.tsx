import { AppearanceToggle } from '@/components/AppearanceToggle';
import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import { ArrowRight, Flame, Target, Trophy, Users } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

interface MenuOption {
  label: string;
  route: string;
}

export default function ProfileScreen() {
  const { top } = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const router = useRouter();
  const colors = THEME[theme as 'light' | 'dark'];

  const menuOptions: MenuOption[] = [
    { label: 'Settings', route: '/extras/settings' },
    { label: 'My Memes', route: '/extras/my-memes' },
    { label: 'My Defis', route: '/extras/my-defis' },
    { label: 'Rewards', route: '/extras/rewards' },
    { label: 'Edit Profil', route: '/extras/edit' },
    { label: 'Abonnements', route: '/extras/subscriptions' },
  ];

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 24 }}
    >
      {/* HEADER */}
      <Animated.View
        entering={FadeInDown.duration(400)}
        style={{ paddingTop: 16 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.foreground }}>PROFIL</Text>
          <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: colors.primary }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.primaryForeground }}>PLUS</Text>
          </View>
        </View>

        {/* AVATAR */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View>
            <Image
              source={{
                uri: 'https://i.pravatar.cc/300',
              }}
              style={{ width: 112, height: 112, borderRadius: 56 }}
            />
            {/* Badge Premium */}
            <View style={{ position: 'absolute', bottom: -4, right: -4, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 2, backgroundColor: colors.primary, borderColor: colors.background }}>
              <Flame size={16} color={colors.primaryForeground} />
            </View>
          </View>
          
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 12, color: colors.foreground }}>@alexanders</Text>
          <Text style={{ fontSize: 14, marginTop: 4, color: `${colors.foreground}80` }}>Meme Creator & Challenger</Text>
        </View>

        {/* STATS CARDS */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 24 }}>
          {/* Followers Card */}
          <Animated.View 
            entering={FadeInDown.delay(100).duration(400)}
            style={{ flex: 1, borderRadius: 16, padding: 16, backgroundColor: colors.card }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: `${colors.primary}20` }}>
                <Users color={colors.primary} size={20} />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 24, fontWeight: '900', color: colors.foreground }}>10K</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, fontWeight: '600', color: `${colors.foreground}80` }}>Followers</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <View style={{ height: 4, borderRadius: 4, width: '70%', backgroundColor: `${colors.primary}40` }}>
                <View style={{ height: 4, borderRadius: 4, width: '80%', backgroundColor: colors.primary }} />
              </View>
              <Text style={{ fontSize: 10, fontWeight: 'bold', marginLeft: 8, color: colors.primary }}>+12%</Text>
            </View>
          </Animated.View>

          {/* Défis Card */}
          <Animated.View 
            entering={FadeInDown.delay(200).duration(400)}
            style={{ flex: 1, borderRadius: 16, padding: 16, backgroundColor: colors.card }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6B3520' }}>
                <Trophy color="#FF6B35" size={20} />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 24, fontWeight: '900', color: colors.foreground }}>10K</Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, fontWeight: '600', color: `${colors.foreground}80` }}>Défis Won</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <View style={{ height: 4, borderRadius: 4, width: '70%', backgroundColor: '#FF6B3540' }}>
                <View style={{ height: 4, borderRadius: 4, width: '65%', backgroundColor: '#FF6B35' }} />
              </View>
              <Text style={{ fontSize: 10, fontWeight: 'bold', marginLeft: 8, color: '#FF6B35' }}>+8%</Text>
            </View>
          </Animated.View>
        </View>

        {/* STREAK CARD */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(400)}
          style={{ borderRadius: 16, padding: 16, marginBottom: 24, backgroundColor: colors.card, borderWidth: 2, borderColor: `${colors.primary}40` }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: `${colors.primary}20` }}>
                <Target color={colors.primary} size={24} />
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: '900', color: colors.foreground }}>7 Days Streak 🔥</Text>
                <Text style={{ fontSize: 12, fontWeight: '500', marginTop: 2, color: `${colors.foreground}80` }}>Keep posting to maintain your streak!</Text>
              </View>
            </View>
          </View>
          
          {/* Streak Progress */}
          <View style={{ marginTop: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <View key={day} style={{ alignItems: 'center' }}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: day <= 7 ? colors.primary : `${colors.foreground}20` }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: day <= 7 ? colors.primaryForeground : `${colors.foreground}60` }}>{day}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* APPARENCE */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 12, backgroundColor: colors.card }}>
          <Text style={{ fontWeight: '600', color: colors.foreground }}>Apparence</Text>
          <AppearanceToggle />
        </View>

        {/* OPTIONS LIST */}
        {menuOptions.map((option, index) => (
          <Animated.View
            key={option.label}
            entering={FadeInDown.delay(100 * (index + 1)).duration(300)}
          >
            <Pressable 
              onPress={() => handleMenuPress(option.route)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 12,
                backgroundColor: pressed ? `${colors.card}CC` : colors.card,
              })}
            >
              <Text style={{ fontWeight: '600', color: colors.foreground }}>{option.label}</Text>
              {option.label === 'Abonnements' ? (
                <View style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: colors.primary }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: colors.primaryForeground }}>FREE</Text>
                </View>
              ) : (
                <ArrowRight color={colors.foreground} size={18} />
              )}
            </Pressable>
          </Animated.View>
        ))}
      </Animated.View>

    </ScrollView>
  );
}