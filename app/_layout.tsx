import { ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider as AppThemeProvider } from '@/lib/ThemeContext';
import { NAV_THEME, THEME } from '@/lib/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <ThemeProvider value={colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light}>
          {/* SafeAreaView empêche que le contenu soit caché derrière la status bar */}
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="extras" />
    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
  </Stack>
  <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
</SafeAreaView>

        </ThemeProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
