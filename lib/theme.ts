import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';
import { MEME_COLORS } from './meme-colors';

type AppColorSet = {
  root: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  radius: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  grey: string;
};

export const THEME: Record<'light' | 'dark', AppColorSet> = {
  light: {
    root: MEME_COLORS.light.background,
    background: MEME_COLORS.light.background,
    foreground: MEME_COLORS.light.foreground,
    card: MEME_COLORS.light.card,
    cardForeground: MEME_COLORS.light.foreground,
    popover: MEME_COLORS.light.card,
    popoverForeground: MEME_COLORS.light.foreground,
    primary: MEME_COLORS.primary,
    primaryForeground: MEME_COLORS.primaryForeground,
    secondary: MEME_COLORS.light.cardSubtle,
    secondaryForeground: MEME_COLORS.light.foreground,
    muted: MEME_COLORS.light.muted,
    mutedForeground: MEME_COLORS.light.soft,
    accent: MEME_COLORS.accents.blue,
    accentForeground: '#FFFFFF',
    destructive: MEME_COLORS.system.error,
    border: MEME_COLORS.light.border,
    input: MEME_COLORS.light.border,
    ring: MEME_COLORS.primary,
    radius: '0.625rem',
    chart1: MEME_COLORS.accents.blue,
    chart2: MEME_COLORS.accents.pink,
    chart3: MEME_COLORS.primary,
    chart4: MEME_COLORS.accents.yellow,
    chart5: MEME_COLORS.system.success,
    grey: MEME_COLORS.light.muted,
  },
  dark: {
    root: MEME_COLORS.dark.background,
    background: MEME_COLORS.dark.background,
    foreground: MEME_COLORS.dark.foreground,
    card: MEME_COLORS.dark.card,
    cardForeground: MEME_COLORS.dark.foreground,
    popover: MEME_COLORS.dark.cardSoft,
    popoverForeground: MEME_COLORS.dark.foreground,
    primary: MEME_COLORS.primary,
    primaryForeground: MEME_COLORS.primaryForeground,
    secondary: MEME_COLORS.dark.cardSoft,
    secondaryForeground: MEME_COLORS.dark.foreground,
    muted: MEME_COLORS.dark.muted,
    mutedForeground: MEME_COLORS.dark.soft,
    accent: MEME_COLORS.accents.blue,
    accentForeground: '#FFFFFF',
    destructive: MEME_COLORS.system.error,
    border: MEME_COLORS.dark.border,
    input: MEME_COLORS.dark.border,
    ring: MEME_COLORS.primary,
    radius: '0.625rem',
    chart1: MEME_COLORS.accents.blue,
    chart2: MEME_COLORS.accents.pink,
    chart3: MEME_COLORS.primary,
    chart4: MEME_COLORS.accents.yellow,
    chart5: MEME_COLORS.system.success,
    grey: MEME_COLORS.dark.muted,
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
