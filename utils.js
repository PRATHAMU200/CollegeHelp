import AsyncStorage from "@react-native-async-storage/async-storage";

let counter = 0;

const generateUserId = async () => {
  const date = new Date();
  const timestamp =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0") +
    date.getHours().toString().padStart(2, "0") +
    date.getMinutes().toString().padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0") +
    counter.toString().padStart(3, "0");

  counter = (counter + 1) % 1000; // reset counter every 1000 seconds

  const userId = timestamp;
  await AsyncStorage.setItem("userId", userId);
  return userId;
};

export { generateUserId };
