import { useThemeContext } from '@/lib/ThemeContext';
import { MEME_COLORS } from '@/lib/meme-colors';
import { THEME } from '@/lib/theme';
import MasonryList from '@react-native-seoul/masonry-list';
import { useRouter } from 'expo-router';
import { Heart, Sparkles, Gamepad2, Trophy, Laugh, Zap } from 'lucide-react-native';
import LottieView from 'lottie-react-native';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, Animated } from 'react-native';
import { Image } from 'expo-image';

interface Category { id: string; label: string; icon: any }
interface MemeTemplate { id: string; image: string; title?: string; categories: string[]; size?: 'large' | 'medium' | 'small' }

export const MEME_TEMPLATES: MemeTemplate[] = [
  { id: '1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s', title: 'NO STRESS\nJUST VIBING', categories: ['ALL'], size: 'medium' },
  { id: '2', image: 'https://picsum.photos/300/300?random=11', title:"When you view your life yourself and you think that it's so bad😒" ,categories: ['ALL'], size: 'medium' },
  { id: '3', image: 'https://picsum.photos/300/300?random=12', title: 'WHEN YOU REALIZE\nTOMORROW IS MONDAY', categories: ['SPORT'], size: 'small' },
  { id: '4', image: 'https://picsum.photos/300/300?random=13', title:"POV: in your life" , categories: ['TECH'], size: 'small' },
  { id: '5', image: 'https://picsum.photos/300/300?random=14', title:"Life is good" , categories: ['GAMING'], size: 'medium' },
  { id: '6', image: 'https://picsum.photos/300/300?random=15', title:"POV: in your bad life" , categories: ['SAGA'], size: 'small' },
];

const CATEGORIES: Category[] = [
  { id: 'all', label: 'ALL', icon: Sparkles },
  { id: 'gaming', label: 'GAMING', icon: Gamepad2 },
  { id: 'sport', label: 'SPORT', icon: Trophy },
  { id: 'drole', label: 'DRÔLE', icon: Laugh },
  { id: 'tech', label: 'TECH', icon: Zap },
  { id: 'saga', label: 'SAGA', icon: Heart },
];

// ---------------- Category Button ----------------
const CategoryButton = memo(({ category, isSelected, onPress, colors }: { category: Category; isSelected: boolean; onPress: () => void; colors: any }) => {
  const [scale] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (isSelected) {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.1, duration: 150, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    }
  }, [isSelected]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 32,
          minWidth: 72,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: isSelected ? colors.primary : colors.card,
          marginRight: 8,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 6,
          borderWidth: isSelected ? 0 : 1,
          borderColor: colors.border,
        }}
        activeOpacity={0.8}
      >
        <category.icon size={16} color={isSelected ? colors.primaryForeground : colors.foreground} strokeWidth={2} />
        <Text style={{ fontWeight: '700', fontSize: 12, lineHeight: 14, color: isSelected ? colors.primaryForeground : colors.foreground }} numberOfLines={1}>
          {category.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});
CategoryButton.displayName = 'CategoryButton';

// ---------------- Meme Card ----------------  
const MemeTemplateCard = memo(({ template, onPress, colors, index }: { template: MemeTemplate; onPress: () => void; colors: any; index: number }) => {
  const [liked, setLiked] = useState(false);
  const accentColors = [MEME_COLORS.accents.blue, MEME_COLORS.accents.yellow, MEME_COLORS.system.success, MEME_COLORS.accents.blue];
  const accentColor = accentColors[index % accentColors.length];
  const heights = { large: 260, medium: 220, small: 170 };
  const height = heights[template.size || 'medium'];
  const likeColor = MEME_COLORS.accents.pink; // Toujours rose pour le like

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        height,
        backgroundColor: colors.card,
        marginHorizontal: 4,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: `${accentColor}20`,
      }}
    >
      <Image 
        source={{ uri: template.image }} 
        style={{ width: '100%', height: '100%' }} 
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
        priority="high"
        recyclingKey={template.id}
      />
      <View style={{ ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: colors.cardForeground, textAlign: 'center', letterSpacing: 1 }} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.75}>
          {template.title}
        </Text>
      </View>
      <TouchableOpacity 
        onPress={(e) => { e.stopPropagation?.(); setLiked(!liked); }} 
        style={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          padding: 6, 
          borderRadius: 20, 
          backgroundColor: liked ? `${likeColor}30` : 'rgba(0,0,0,0.5)' 
        }}
      >
        <Heart 
          size={20} 
          color={liked ? likeColor : colors.foreground} 
          fill={liked ? likeColor : 'none'} 
          strokeWidth={2} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
});
MemeTemplateCard.displayName = 'MemeTemplateCard';

// ---------------- Store Screen ----------------
export default function StoreScreen() {
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templates, setTemplates] = useState(MEME_TEMPLATES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === 'all' || t.categories.map(c => c.toLowerCase()).includes(selectedCategory.toLowerCase())
  );

  const numColumns = width < 600 ? 2 : 3;

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setTemplates([...MEME_TEMPLATES].sort(() => Math.random() - 0.5));
    setIsRefreshing(false);
  }, []);

  // ------------ Handle Meme Click ------------
  const handleMemePress = (template: MemeTemplate) => {
    // Lorsqu'on clique sur un meme, on ouvre /meme/[id] avec **la catégorie du meme**
    const category = template.categories[0].toLowerCase() || 'all';
    router.push({
  pathname: `/meme/[id]`,
  params: { id: template.id, category },
});
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.foreground }}>STORE</Text>
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 50 }} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}>
        {CATEGORIES.map((category) => (
          <CategoryButton key={category.id} category={category} isSelected={selectedCategory === category.id} onPress={() => setSelectedCategory(category.id)} colors={colors} />
        ))}
      </ScrollView>

      {/* Masonry Grid */}
      {filteredTemplates.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView source={require('@/assets/animations/contentnotfound.json')} autoPlay loop style={{ width: 300, height: 300 }} />
        </View>
      ) : (
        <ScrollView
          scrollEnabled
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={colors.primary} colors={[colors.primary]} />}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <MasonryList
            key={numColumns}
            data={filteredTemplates}
            numColumns={numColumns}
            renderItem={({ item, i }) => (
              <MemeTemplateCard template={item as MemeTemplate} onPress={() => handleMemePress(item as MemeTemplate)} colors={colors} index={i} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8, paddingBottom: 80 }}
          />
        </ScrollView>
      )}
    </View>
  );
}
