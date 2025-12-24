import { Bell, Heart, MessageSquare, Package, Sparkles } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated, { FadeIn } from 'react-native-reanimated';

const ICONS: Record<string, any> = {
  like: Heart,
  comment: MessageSquare,
  pack: Package,
  trend: Sparkles,
  system: Bell,
};

export default function NotificationCard({ notification, onPress, onMarkRead }: any) {
  const Icon = ICONS[notification.type] || Bell;

  const renderRightActions = () => (
    <Pressable onPress={onMarkRead} style={styles.markReadBtn}>
      <Text style={{ color: '#fff', fontWeight: '700' }}>Mark</Text>
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <Animated.View entering={FadeIn.duration(300)}>
        <Pressable onPress={onPress} style={[styles.card, notification.isRead ? styles.read : styles.unread]}>
          <View style={styles.left}>
            <Icon size={22} color={notification.isRead ? '#999' : '#fff'} />
          </View>
          <View style={styles.content}>
            <Text style={[styles.title, notification.isRead && { opacity: 0.7 }]} numberOfLines={1}>{notification.title}</Text>
            <Text style={[styles.message, notification.isRead && { opacity: 0.7 }]} numberOfLines={2}>{notification.message}</Text>
          </View>
          {!notification.isRead && <View style={styles.unreadDot} />}
        </Pressable>
      </Animated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, backgroundColor: '#111', overflow: 'hidden' },
  left: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: '800', color: '#fff' },
  message: { fontSize: 12, color: '#ddd', marginTop: 4 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ff4d4f', marginLeft: 8 },
  markReadBtn: { backgroundColor: '#1f2937', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 12 },
  unread: { backgroundColor: '#111' },
  read: { backgroundColor: '#0b0b0b' },
});
