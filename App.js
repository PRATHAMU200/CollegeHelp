import { StatusBar } from "expo-status-bar";
import { useContext, useState, useEffect } from "react";
import Navigation from "./navigation.js";
import { NavigationContainer } from "@react-navigation/native";
import { db, app } from "./firebaseConfig";
import { getAnalytics, logEvent } from "firebase/analytics";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import Todo from "./Todo.js";
import { ThemeToggle, ThemeContext } from "./theme.js";

export default function App() {
  const theme = useContext(ThemeContext);
  return (
    //   <Todo />
    // <NavigationContainer>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    //</NavigationContainer>
  );
}

const styles = StyleSheet.create({});
