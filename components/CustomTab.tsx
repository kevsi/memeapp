import { useTheme } from '@/lib/ThemeContext'; // Utilisez votre nouveau ThemeContext
import { BottomTabBarProps } from 'expo-router/js-tabs';
import { Edit, Home, Mail, Store, Trophy, User } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    FadeInRight,
    FadeOutLeft,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Icônes Lucide ---
const ICONS = {
  index: Home,
  store: Store,
  defis: Trophy,
  inbox: Mail,
  profile: User,
  create: Edit,
};

// -------------------------------------------------------------------------

// Composant pour l'icône avec animation de rotation pop (OPTIMISÉE)
const AnimatedIcon = ({ 
  IconComponent, 
  size, 
  color, 
  isFocused 
}: { 
  IconComponent: any; 
  size: number; 
  color: string; 
  isFocused: boolean;
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (isFocused) {
      // Animation plus rapide et plus subtile
      rotation.value = withSequence(
        withSpring(-10, { damping: 12, stiffness: 300 }),
        withSpring(10, { damping: 12, stiffness: 300 }),
        withSpring(0, { damping: 15, stiffness: 250 })
      );
      
      scale.value = withSequence(
        withSpring(1.2, { damping: 12, stiffness: 400 }),
        withSpring(1, { damping: 15, stiffness: 300 })
      );
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <IconComponent size={size} color={color} />
    </Animated.View>
  );
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const colors = {
    activeBg: isDark ? '#75F885' : '#000000',
    inactiveBg: isDark ? '#1E1E1E' : '#F0F0F0',
    activeIcon: isDark ? '#000000' : '#FFFFFF',
    inactiveIcon: isDark ? '#75F885' : '#555555',
    activeText: isDark ? '#000000' : '#FFFFFF',
    barBg: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.barBg,
          paddingHorizontal: 12,
          paddingVertical: 8,
paddingBottom: bottom > 0 ? bottom - 4 : 8,
        }
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.title ?? route.name.toUpperCase();

        type TabName = keyof typeof ICONS;
        const iconKey = route.name as TabName;
        const IconComponent = ICONS[iconKey] ?? Home;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const isBigCircle = route.name === 'create';

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityLabel={label}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            style={({ pressed }) => [
              styles.pressable,
              {
                flex: isFocused ? 1.6 : 1,
                backgroundColor: pressed ? 'rgba(255,255,255,0.05)' : 'transparent',
              },
            ]}
          >
            <Animated.View
              layout={Layout.springify().damping(18).stiffness(200)}
              style={[
                styles.tabButton,
                {
                  backgroundColor: isFocused ? colors.activeBg : colors.inactiveBg,
                  minWidth: isFocused ? 110 : isBigCircle ? 64 : 56,
                }
              ]}
            >
              <AnimatedIcon
                IconComponent={IconComponent}
                size={isBigCircle ? 28 : 24}
                color={isFocused ? colors.activeIcon : colors.inactiveIcon}
                isFocused={isFocused}
              />

              {isFocused && (
                <Animated.View
                  entering={FadeInRight.duration(200).easing(Easing.out(Easing.cubic))}
                  exiting={FadeOutLeft.duration(150)}
                >
                  <Text
                    style={[
                      styles.label,
                      { color: colors.activeText }
                    ]}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </Animated.View>
              )}
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 999,
    paddingVertical: 6,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

// ========== CONFIGURATION POUR EXPO ROUTER ==========
// Pour Expo Router, les options de transition se configurent différemment

export const expoRouterTabOptions = {
  // Header caché
  headerShown: false,
  
  // Animations ultra-rapides pour Expo Router
  animation: 'shift' as const,
  
  // Performance optimale
  lazy: true,
  
  // Transitions rapides (Expo Router utilise Reanimated 3)
  animationDuration: 200, // Transition rapide
};

/* 
EXEMPLE D'UTILISATION AVEC EXPO ROUTER :

import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTab';
import { expoRouterTabOptions } from '@/components/CustomTab';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        ...expoRouterTabOptions,
        // Vos autres options ici
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="store" options={{ title: 'Store' }} />
      <Tabs.Screen name="create" options={{ title: 'Créer' }} />
      <Tabs.Screen name="defis" options={{ title: 'Défis' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
*/