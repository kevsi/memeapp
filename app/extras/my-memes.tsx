import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import { useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MyMemesScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
    >
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: top + 16, backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Retour" accessibilityRole="button">
          <ArrowLeft color={colors.foreground} size={24} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>Mes Memes</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* ÉTAT VIDE */}
      <View style={styles.empty}>
        <ImageIcon color={colors.primary} size={48} />
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{"Aucun meme pour l'instant"}</Text>
        <Text style={[styles.emptyText, { color: colors.foreground }]}>
          Crée ton premier meme depuis le store.
        </Text>
      </View>
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});
