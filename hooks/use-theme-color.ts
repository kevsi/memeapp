/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { THEME } from '@/lib/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof THEME.light & keyof typeof THEME.dark
) {
  const theme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colorFromProps = props[theme];
  const themeKey = theme === 'dark' ? 'dark' : 'light';

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return THEME[themeKey][colorName];
  }
}
