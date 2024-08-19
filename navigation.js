import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./homescreen";
import Todo from "./Todo";
import { Icon } from "react-native-elements";
import { useState } from "react";
import Drive from "./drive";
const Tab = createBottomTabNavigator();

const Navigation = () => {
  const [numNavigation, setNumNavigation] = useState(0);

  const handleTodoLengthChange = (length) => {
    setNumNavigation(() => length);
    console.log(length);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Todo List") {
            iconName = focused ? "list" : "list";
          } else if (route.name === "Your Drive") {
            iconName = "folder";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen
        name="Todo List"
        // component={Todo}
        options={{ tabBarBadge: numNavigation }}
      >
        {() => <Todo onTodoLengthChange={handleTodoLengthChange} />}
      </Tab.Screen>

      <Tab.Screen name="Your Drive" component={Drive} />
    </Tab.Navigator>
  );
};

export default Navigation;
