import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Share,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { Heart, MessageCircle, Share2, Music } from "lucide-react-native";

import { MEME_TEMPLATES } from "../(tabs)/store";
import { MEME_COLORS } from "@/lib/meme-colors";
import { useThemeContext } from "@/lib/ThemeContext";

export default function MemeViewer() {
  const { height, width } = useWindowDimensions();
  const { theme } = useThemeContext();
  const isDark = theme === "dark";
  const params = useLocalSearchParams<{ id: string; category?: string }>();

  const memes = MEME_TEMPLATES;
  const initialIndex = memes.findIndex((m) => m.id === params.id);

  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [showComments, setShowComments] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<string | null>(null);

  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;

  const animateLike = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(heartScale, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(heartScale, {
          toValue: 1.6,
          duration: 220,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(heartOpacity, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(heartOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  };

  const renderItem = ({ item }: any) => {
    const liked = likes[item.id];

    return (
      <View style={{ width, height }}>
        <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />

        {/* Overlays */}
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={styles.topGradient}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.75)"]}
          style={styles.bottomGradient}
        />

        {/* Like animation */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.likeAnim,
            { transform: [{ scale: heartScale }], opacity: heartOpacity },
          ]}
        >
          <Heart size={90} color="#FF4D6D" fill="#FF4D6D" />
        </Animated.View>

        {/* RIGHT ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              setLikes((p) => ({ ...p, [item.id]: !liked }));
              animateLike();
            }}
            style={styles.actionBtn}
          >
            <Heart size={32} color={liked ? "#FF4D6D" : "white"} fill={liked ? "#FF4D6D" : "none"} />
            <Text style={styles.count}>128K</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCurrentMeme(item.id);
              setShowComments(true);
            }}
            style={styles.actionBtn}
          >
            <MessageCircle size={32} color="white" />
            <Text style={styles.count}>2.1K</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Share.share({ message: item.title })}>
            <Share2 size={32} color="white" />
          </TouchableOpacity>

          <View style={styles.musicBadge}>
            <Music size={14} color="white" />
            <Text style={styles.musicText}>Original Sound</Text>
          </View>
        </View>

        {/* BOTTOM INFO */}
        <View style={styles.bottomInfo}>
          <Text style={styles.username}>@meme_creator</Text>
          <Text style={styles.caption} numberOfLines={2}>
            {item.title} 🔥 #viral #fyp
          </Text>

          <View style={styles.songRow}>
            <View style={styles.wave}>
              {[8, 14, 10, 16].map((h, i) => (
                <View key={i} style={[styles.waveBar, { height: h }]} />
              ))}
            </View>
            <Text style={styles.songName}>Original Sound – Artist</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <SafeAreaView style={styles.header}>
        <View style={styles.tabs}>
          <Text style={styles.tabActive}>Following</Text>
          <Text style={styles.tab}>For You</Text>
        </View>
      </SafeAreaView>

      {/* FEED */}
      <FlatList
        data={memes}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={Math.max(0, initialIndex)}
        contentContainerStyle={{ paddingTop: 70 }}
        getItemLayout={(_, i) => ({
          length: height,
          offset: height * i,
          index: i,
        })}
      />

      {/* COMMENTS MODAL */}
      <Modal visible={showComments} animationType="slide">
        <SafeAreaView style={styles.comments}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <ScrollView />
          <View style={styles.commentInputRow}>
            <TextInput placeholder="Add a comment…" style={styles.commentInput} />
            <Text style={styles.post}>Post</Text>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  /* HEADER */
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    paddingVertical: 10,
  },
  tab: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    fontWeight: "500",
  },
  tabActive: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },

  /* MEDIA */
  image: {
    width: "100%",
    height: "100%",
  },

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },

  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
  },

  /* LIKE ANIMATION */
  likeAnim: {
    position: "absolute",
    top: "45%",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100,
  },

  /* ACTION BAR */
  actions: {
    position: "absolute",
    right: 14,
    bottom: 160,
    alignItems: "center",
    gap: 22,
    zIndex: 20,
  },
  actionBtn: {
    alignItems: "center",
  },
  count: {
    color: "white",
    fontSize: 12,
    marginTop: 6,
    fontWeight: "600",
  },

  musicBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginTop: 8,
  },
  musicText: {
    color: "white",
    fontSize: 11,
    fontWeight: "500",
  },

  /* BOTTOM INFO */
  bottomInfo: {
    position: "absolute",
    bottom: 36,
    left: 16,
    right: 96,
  },
  username: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },
  caption: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },

  songRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  wave: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
  },
  waveBar: {
    width: 3,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 2,
  },
  songName: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontWeight: "500",
  },

  /* COMMENTS */
  comments: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 16,
  },
  commentsTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
    textAlign: "center",
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "white",
    fontSize: 14,
  },
  post: {
    color: "#FF4D6D",
    fontSize: 14,
    fontWeight: "700",
  },
});
