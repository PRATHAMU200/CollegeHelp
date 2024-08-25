import { Link } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  DrawerLayoutAndroid,
  TouchableHighlight,
} from "react-native";
import { useState } from "react";
import env from "./env";
import TimeTable from "./timetable";
import HomeNotification from "./home_notification";
import { Icon } from "react-native-elements";

const HomeScreen = () => {
  const [isTimeTableOpen, setIsTimeTableOpen] = useState(false);

  //const url = "https://mercykknight.github.io";
  const handleLinkPress = (url) => {
    if (url === env.API_URL) {
      Alert.alert(
        "Thankyou for Donating to us 😊!!",
        "You are the reason this app is alive.🙋‍♂️"
      );
    }
    Linking.openURL(url);
  };
  return (
    <ScrollView style={styles.homebody}>
      <View
        style={{
          flexShrink: 1,
          flexDirection: "column",
          alignItems: "center",
          margin: 15,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 10 }}>
          Welcome To College Help!{" "}
        </Text>
        <Text>One stop for all your college needs.</Text>
        <Text>Simplify your college experience with us.</Text>
      </View>

      {/*Notification Bar for CLass notification: */}
      <Text
        style={{
          alignItems: "right",
          marginLeft: 15,
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Notifications / Events :-
      </Text>
      <View style={{ height: 3, backgroundColor: "#ccc", width: "100%" }} />
      <HomeNotification style={styles.Notification} />

      {/* TimeTable Drawer */}
      <TouchableOpacity onPress={() => setIsTimeTableOpen(!isTimeTableOpen)}>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          <Icon
            name={isTimeTableOpen ? "arrow-drop-up" : "arrow-drop-down"}
            size={40}
          />{" "}
          TimeTable :-
        </Text>
      </TouchableOpacity>
      <View style={{ height: 3, backgroundColor: "#ccc", width: "100%" }} />

      {isTimeTableOpen && <TimeTable />}

      {/* Websits to visit */}

      <Text
        style={{
          alignItems: "right",
          marginLeft: 15,
          fontSize: 20,
          fontWeight: 500,
          marginTop: 35,
        }}
      >
        Dtu College Websites:-
      </Text>
      <View style={{ height: 3, backgroundColor: "#ccc", width: "100%" }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          padding: 20,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity onPress={() => handleLinkPress("https://dtu.ac.in")}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={require("./assets/DTU_logo.jpg")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>DTU Website</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://rm.dtu.ac.in/")}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={require("./assets/dtuRm.jpg")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>Rm Portal</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://www.exam.dtu.ac.in/")}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={require("./assets/exam.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>Dtu Result</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://reg.exam.dtu.ac.in/")}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={require("./assets/dtubag.jpeg")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>Dtu Portal</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Another Section for webiste view*/}

      <Text
        style={{
          alignItems: "right",
          marginLeft: 15,
          fontSize: 20,
          fontWeight: 500,
          marginTop: 20,
        }}
      >
        App Website:-
      </Text>
      <View style={{ height: 3, backgroundColor: "#ccc", width: "100%" }} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
          padding: 20,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            handleLinkPress("https://github.com/prathamu200/collegehelp")
          }
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={require("./assets/contribute.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>
              Contribute Project
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress(env.API_URL)}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image
              source={require("./assets/public-sponsor.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ marginLeft: 10, fontSize: 18 }}>
              Sponsor Project
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer view */}
      <Text
        style={{
          opacity: 0.4,
          flexGrow: 0,
          alignSelf: "center",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        This App is Powered by @PrathamTechlab
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homebody: {
    flex: 1,
    margin: 0,
    //justifyContent: "space-around",
    backgroundColor: "#E8EAED",
    flexDirection: "column",
    //alignItems: "center",
  },
  Notification: {
    flex: 1,
  },
});

export default HomeScreen;
