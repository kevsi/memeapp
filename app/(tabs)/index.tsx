import MasonryList from "@react-native-seoul/masonry-list";
import { useRouter } from "expo-router";
import React, { memo, useCallback, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  useSharedValue,
  withRepeat,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { useThemeContext } from "@/lib/ThemeContext";
import { THEME } from "@/lib/theme";
import { MEME_COLORS } from "@/lib/meme-colors";

// ---------------------------
// Types
// ---------------------------

export interface MemeCard {
  id: string;
  title: string;
  image: string;
  size: "small" | "medium" | "large";
}

// ---------------------------
// Mock Data
// ---------------------------

const MEMES: MemeCard[] = [
  { id: "1", title: "FUN", image: "https://i.pinimg.com/1200x/5b/4c/3b/5b4c3b419c8eecbedd2b5f351e9b7c1b.jpg", size: "medium" },
  { id: "2", title: "SAD", image: "https://i.pinimg.com/1200x/91/f9/2f/91f92f036f7cd019954d377f14f5357b.jpg", size: "large" },
  { id: "3", title: "WOW", image: "https://picsum.photos/400/600?3", size: "small" },
  { id: "4", title: "LOL", image: "https://picsum.photos/400/500?4", size: "medium" },
  { id: "5", title: "EPIC", image: "https://picsum.photos/400/700?5", size: "large" },
];

// Shuffle on refresh
const shuffleMemes = () => [...MEMES].sort(() => Math.random() - 0.5);

// ---------------------------
// Meme Card Component
// ---------------------------

const MemeItem = memo(
  ({ item, index }: { item: MemeCard; index: number }) => {
    const router = useRouter();
    const { theme } = useThemeContext();
    const colors = THEME[theme as 'light' | 'dark'];
    const [loaded, setLoaded] = useState(false);

    const accents = [
      MEME_COLORS.accents.blue,
      MEME_COLORS.accents.pink,
      MEME_COLORS.accents.yellow,
      MEME_COLORS.system.success,
    ];
    const accent = accents[index % accents.length];

    const scale = useAnimatedStyle(() => ({
      transform: [
        { 
          scale: withDelay(
            index * 50,
            withSequence(
              withSpring(0.8, { damping: 12, stiffness: 100 }),
              withSpring(1, { damping: 8, stiffness: 120 })
            )
          )
        }
      ],
    }));

    const fadeIn = useAnimatedStyle(() => ({
      opacity: withDelay(index * 50, withTiming(loaded ? 1 : 0, { duration: 400 })),
    }));

    const heights = {
      small: 190,
      medium: 240,
      large: 300,
    };

    return (
      <Animated.View style={scale}>
        <Pressable
          onPress={() => router.push(`/meme/${item.id}`)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Animated.View
            style={[
              styles.card,
              {
                height: heights[item.size],
                borderColor: `${accent}33`,
                backgroundColor: colors.card,
              },
              fadeIn,
            ]}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
              transition={300}
              cachePolicy="memory-disk"
              priority="high"
              onLoad={() => setLoaded(true)}
            />

            {/* Soft gradient overlay */}
            <View style={styles.overlay} />

            {/* Title */}
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </Animated.View>
        </Pressable>
      </Animated.View>
    );
  }
);

MemeItem.displayName = "MemeItem";

// ---------------------------
// Home Screen
// ---------------------------

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];
  const [memes, setMemes] = useState<MemeCard[]>(MEMES);
  const [refreshing, setRefreshing] = useState(false);

  const columns = width < 600 ? 2 : 3;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 700));
    setMemes(shuffleMemes());
    setRefreshing(false);
  }, []);

  const headerScale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1, { damping: 10, stiffness: 100 }) }],
  }));

  const pulseScale = useSharedValue(1);
  
  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );
  }, []);

  const pulseAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Animated.View style={[styles.header, headerScale]}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>MEMES</Text>
        <Animated.View 
          style={[
            styles.liveDot, 
            { backgroundColor: MEME_COLORS.primary },
            pulseAnimation
          ]} 
        />
      </Animated.View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={MEME_COLORS.primary}
          />
        }
      >
        <MasonryList
          data={memes}
          numColumns={columns}
          renderItem={({ item, i }) => (
            <MemeItem item={item as MemeCard} index={i} />
          )}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: Math.max(140, height * 0.18),
          }}
        />
      </ScrollView>
    </View>
  );
}

// ---------------------------
// Styles
// ---------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 1.6,
  },

  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: MEME_COLORS.primary,
  },

  card: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    marginHorizontal: 6,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  titleWrapper: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFF",
    letterSpacing: 1.4,
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
});
