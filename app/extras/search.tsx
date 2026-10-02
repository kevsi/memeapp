import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, Search as SearchIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

interface MemeTemplate { id: string; image: string; title?: string; categories: string[]; size?: 'large' | 'medium' | 'small' }

const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s', title: 'NO STRESS\nJUST VIBING', categories: ['ALL'], size: 'medium' },
  { id: '2', image: 'https://picsum.photos/300/300?random=11', title: 'MONDAY MOOD', categories: ['ALL'], size: 'medium' },
  { id: '3', image: 'https://picsum.photos/300/300?random=12', title: 'WHEN YOU REALIZE\nTOMORROW IS MONDAY', categories: ['SPORT'], size: 'small' },
  { id: '4', image: 'https://picsum.photos/300/300?random=13', title: 'POV: in your life', categories: ['TECH'], size: 'small' },
  { id: '5', image: 'https://picsum.photos/300/300?random=14', title: 'Life is good', categories: ['GAMING'], size: 'medium' },
  { id: '6', image: 'https://picsum.photos/300/300?random=15', title: 'POV: in your bad life', categories: ['SAGA'], size: 'small' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const screenOptions = {
  headerShown: false,
};

export default function SearchScreen() {
  const router = useRouter();
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
  };

  const handleCameraPress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled) {
        Alert.alert('Image sélectionnée', 'Recherche par image (fonctionnalité à implémenter)');
      }
    } catch {
      Alert.alert('Erreur', 'Impossible d\'accéder à la galerie');
    }
  };

  const SUGGESTED = [
    { id: '1', title: 'Emoji drôle', image: 'https://picsum.photos/600/400?random=21' },
    { id: '2', title: 'Animation 3d', image: 'https://picsum.photos/600/400?random=22' },
    { id: '3', title: 'Images drôles', image: 'https://picsum.photos/600/400?random=23' },
    { id: '4', title: 'Formation photoshop', image: 'https://picsum.photos/600/400?random=24' },
    { id: '5', title: 'Naruto', image: 'https://picsum.photos/600/400?random=25' },
    { id: '6', title: 'Otaku', image: 'https://picsum.photos/600/400?random=26' },
  ];

  const POPULAR = [
    { id: '1', title: 'Wallpaper pc', image: 'https://picsum.photos/800/600?random=31' },
    { id: '2', title: 'Dessins significatifs', image: 'https://picsum.photos/800/600?random=32' },
    { id: '3', title: 'Idées logo', image: 'https://picsum.photos/800/600?random=33' },
    { id: '5', title: 'Gojo satoru', image: 'https://picsum.photos/800/600?random=34' },
  ];

  const numColumns = 2;
  const tileWidth = (SCREEN_WIDTH - 32 - 8) / numColumns; // 32 for padding (16*2), 8 for gap
  const tileHeight = tileWidth * 0.85;

  const renderTile = (item: { id: string; title: string; image: string }, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInUp.delay(index * 30).duration(400)}
      layout={Layout.springify()}
    >
      <TouchableOpacity
        onPress={() => router.push(`/meme/${item.id}`)}
        style={[styles.tile, { width: tileWidth, height: tileHeight, backgroundColor: colors.card }]}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.tileImage} resizeMode="cover" />
        <View style={styles.tileOverlay}>
          <Text style={[styles.tileText, { color: '#fff' }]} numberOfLines={2} adjustsFontSizeToFit>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Search bar */}
        <View style={{ padding: 16 }}>
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: 'transparent', paddingHorizontal: 14 }]}>
            <SearchIcon size={18} color={colors.muted} strokeWidth={2} />
            <TextInput
              placeholder="Rechercher"
              placeholderTextColor={colors.muted}
              value={query}
              onChangeText={handleSearch}
              style={[styles.searchInput, { color: colors.foreground }]}
            />
            <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
              <Camera size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested section */}
        <Animated.View style={{ paddingHorizontal: 16, marginBottom: 12 }} entering={FadeInUp.delay(100).duration(500)}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Des idées pour vous</Text>
          <View style={styles.grid}>
            {SUGGESTED.map((s, i) => renderTile(s, i))}
          </View>
        </Animated.View>

        {/* Popular section */}
        <Animated.View style={{ paddingHorizontal: 16, marginTop: 6 }} entering={FadeInUp.delay(200).duration(500)}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Populaire sur Pinterest</Text>
          <View style={styles.grid}>
            {POPULAR.map((p, i) => renderTile(p, i + SUGGESTED.length))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  tile: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  tileImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  tileOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tileText: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: SCREEN_WIDTH > 600 ? 24 : 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  cameraButton: {
    padding: 8,
    marginLeft: 8,
  },
});