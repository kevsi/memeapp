import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = "@app_theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
          setTheme(savedTheme as Theme);
        } else {
          // Si aucun thème sauvegardé, utiliser celui du système
          const systemTheme = Appearance.getColorScheme();
          setTheme((systemTheme as Theme) ?? "dark");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du thème:", error);
      }
    };

    loadTheme();
  }, []);

  // Écouter les changements du thème système
  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      async ({ colorScheme }) => {
        // Ne changer que si l'utilisateur n'a pas défini de préférence manuelle
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (!savedTheme && colorScheme) {
          setTheme(colorScheme as Theme);
        }
      }
    );

    return () => subscription.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du thème:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
export const useTheme = () => useContext(ThemeContext);