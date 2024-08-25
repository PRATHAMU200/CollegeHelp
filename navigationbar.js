//import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./homescreen";
import Todo from "./Todo";
import Drive from "./drive";

const Drawer = createDrawerNavigator();

function NavigationSidebar() {
  return (
    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     <Drawer.Screen name="Your Drive" component={Drive} />
    //   </Drawer.Navigator>
    // </NavigationContainer>
    <h1>Hello</h1>
  );
}

export default NavigationSidebar;
