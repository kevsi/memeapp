import NotificationCard from '@/components/NotificationCard';
import useNotifications from '@/hooks/useNotifications';
import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import { Check, Mail } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InboxScreen() {
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];
  const { notifications, loading, refreshing, refresh, markAllRead, markOneRead } = useNotifications();

  const handleMarkAll = useCallback(async () => {
    await markAllRead();
  }, [markAllRead]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Mail size={20} color={colors.foreground} />
          <Text style={[styles.title, { color: colors.foreground }]}>Inbox</Text>
        </View>
        <TouchableOpacity onPress={handleMarkAll} style={styles.markAllBtn}>
          <Check size={16} color={colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <NotificationCard
            notification={item}
            onPress={() => {
              if (item.memeId) {
                // open meme page
                // router.push(`/meme/${item.memeId}`) // optional: import router
              }
              markOneRead(item.id);
            }}
            onMarkRead={() => markOneRead(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.primary} />}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={{ color: colors.foreground, fontWeight: '600' }}>Aucune notification</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '900' },
  markAllBtn: { padding: 8, borderRadius: 8 },
  empty: { marginTop: 40, alignItems: 'center' },
});
