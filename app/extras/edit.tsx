import { useThemeContext } from '@/lib/ThemeContext';
import { THEME } from '@/lib/theme';
import { useRouter } from 'expo-router';
import { ArrowLeft, Pencil } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const colors = THEME[theme as 'light' | 'dark'];

  // Valeurs démo — l'enregistrement est local à l'écran (pas de backend profil)
  const [pseudo, setPseudo] = useState('@alexanders');
  const [bio, setBio] = useState('Meme Creator & Challenger');

  const handleSave = () => {
    router.back();
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background, flex: 1 }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: top + 16, backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} accessibilityLabel="Retour" accessibilityRole="button">
          <ArrowLeft color={colors.foreground} size={24} />
        </Pressable>
        <Text style={[styles.title, { color: colors.foreground }]}>Modifier le profil</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* FORMULAIRE */}
      <View style={[styles.section, { paddingHorizontal: 24, marginTop: 24 }]}>
        <View style={styles.sectionHeader}>
          <Pencil color={colors.primary} size={20} />
          <Text style={[styles.sectionTitle, { color: colors.foreground, marginLeft: 12 }]}>
            Profil public
          </Text>
        </View>

        <Text style={[styles.label, { color: colors.foreground }]}>Pseudo</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.foreground, borderColor: `${colors.foreground}20` }]}
          value={pseudo}
          onChangeText={setPseudo}
          accessibilityLabel="Pseudo"
          autoCapitalize="none"
          placeholder="Ton pseudo"
          placeholderTextColor={`${colors.foreground}60`}
        />

        <Text style={[styles.label, { color: colors.foreground, marginTop: 16 }]}>Bio</Text>
        <TextInput
          style={[styles.input, styles.bio, { backgroundColor: colors.card, color: colors.foreground, borderColor: `${colors.foreground}20` }]}
          value={bio}
          onChangeText={setBio}
          accessibilityLabel="Bio"
          multiline
          placeholder="Présente-toi en une ligne"
          placeholderTextColor={`${colors.foreground}60`}
        />
      </View>

      {/* ENREGISTRER */}
      <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
        <Pressable
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
          accessibilityLabel="Enregistrer le profil"
          accessibilityRole="button"
        >
          <Text style={[styles.saveButtonText, { color: colors.primaryForeground }]}>
            Enregistrer les modifications
          </Text>
        </Pressable>
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  bio: {
    minHeight: 80,
    textAlignVertical: 'top',
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
