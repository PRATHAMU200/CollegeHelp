import React from "react";
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import env from "./env";

const Drive = () => {
  const handleLinkPress = (url) => {
    Alert.alert(
      "Thankyou for Donating to us 😊!!",
      "You are the reason this app is alive.🙋‍♂️"
    );
    Linking.openURL(url);
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        style={{
          marginTop: 40,
          marginBottom: 110,
          fontSize: 30,
          textAlign: "center",
        }}
      >
        We are working over this Section!!
      </Text>
      <Text
        style={{
          marginBottom: 50,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Please help us speeding the development by Donating us!!
      </Text>
      <TouchableOpacity onPress={() => handleLinkPress(env.API_URL)}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            source={require("./assets/public-sponsor.png")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 18 }}>Sponsor Project</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Drive;
