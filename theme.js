import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState, createContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ThemeContext = createContext();

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  return (
    <TouchableOpacity
      style={styles.Bulb}
      onPress={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <MaterialIcons
        name={theme === "light" ? "light-mode" : "dark-mode"}
        size={30}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Bulb: {
    height: 35,
    width: 35,
  },
});

//export default ThemeToggle;
export { ThemeContext, ThemeToggle };
