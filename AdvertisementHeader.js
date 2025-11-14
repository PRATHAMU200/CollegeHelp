import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";

const AdvertisementHeader = () => {
  const [advertisement, setAdvertisement] = useState(null);

  useEffect(() => {
    fetch(
      `https://prathamu200.github.io/notification-api/advertisementHeader.json?cache-bust=${new Date().getTime()}`
    )
      .then((response) => response.json())
      .then((data) => setAdvertisement(data.advertisement));
  }, []);

  if (!advertisement) return null;

  return (
    <View>
      <Image
        source={{ uri: advertisement.backgroundImage }}
        style={{ width: "100%", height: 50 }}
      />
      <Text>{advertisement.text}</Text>
    </View>
  );
};

export default AdvertisementHeader;
