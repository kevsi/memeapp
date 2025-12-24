import { useThemeContext } from "@/lib/ThemeContext";
import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

export function AppearanceToggle() {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";
  const toggleAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  const toggle = () => {
    const toValue = isDark ? 0 : 1;
    Animated.timing(toggleAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    toggleTheme();
  };

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 24], // décalage de la boule
  });

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.toggle,
        { backgroundColor: isDark ? "#75F885" : "#ccc" },
      ]}
    >
      <Animated.View
        style={[styles.circle, { transform: [{ translateX }] }]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: 48,
    height: 24,
    borderRadius: 12,
    padding: 2,
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
