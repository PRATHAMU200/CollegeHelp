import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Clipboard,
  Alert,
  Keyboard,
  Modal,
  Switch,
  ActivityIndicator,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
//import { Icon } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, app } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateUserId } from "./utils";
import { getAnalytics, logEvent } from "firebase/analytics";

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  //const [chatHistory, setChatHistory] = useState([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [chatHistory, setChatHistory] = useState({});
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [userColor, setUserColor] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollViewRef = React.createRef();
  const messageInputRef = useRef(null);
  const avatars = {
    avatar1: require("./assets/avatar1.jpg"),
    avatar2: require("./assets/avatar2.jpg"),
    avatar3: require("./assets/avatar3.jpg"),
    avatar4: require("./assets/avatar4.jpg"),
    avatar5: require("./assets/avatar5.jpg"),
    avatar6: require("./assets/avatar6.jpg"),
    avatar7: require("./assets/avatar7.jpg"),
    avatar8: require("./assets/avatar8.jpg"),
    avatar9: require("./assets/avatar9.jpg"),
    avatar10: require("./assets/avatar10.jpg"),
    avatar11: require("./assets/avatar11.jpg"),
    avatar12: require("./assets/avatar12.jpg"),
    avatar13: require("./assets/avatar13.jpg"),
    avatar14: require("./assets/avatar14.jpg"),
    avatar15: require("./assets/avatar15.jpg"),
    avatar16: require("./assets/avatar16.jpg"),
  };
  const netInfo = useNetInfo();
  // useEffect(() => {
  //   const analytics = getAnalytics();
  //   logEvent(analytics, "screen_view", {
  //     firebase_screen: "ChatScreen",
  //   });
  // }, []);

  useEffect(() => {
    setIsConnected(netInfo.isConnected);
  }, [netInfo]);

  useEffect(() => {
    const handleScroll = async () => {
      if (scrollViewRef.current && isAtBottom) {
        await scrollViewRef.current.scrollToEnd();
      }
    };
    handleScroll();
  }, [chatHistory, isAtBottom, scrollViewRef]);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        let finalUserId = storedUserId;
        if (!storedUserId) {
          const newUserId = await generateUserId();
          await AsyncStorage.setItem("userId", newUserId);
          finalUserId = newUserId;
        }
        setUserId(finalUserId);

        const userRef = doc(db, "users", finalUserId);

        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUsername(userData.username);
          setUserColor(userData.color);
          setUserAvatar(userData.avatar);
        } else {
          const username = `user${Math.floor(Math.random() * 9000) + 1000}`;
          const randomAvatar =
            Object.keys(avatars)[
              Math.floor(Math.random() * Object.keys(avatars).length)
            ];
          await setDoc(userRef, {
            username,
            color: "#000000",
            avatar: randomAvatar,
          });
          setUsername(username);
          setUserColor("#000000");
          setUserAvatar(randomAvatar);
        }
      } catch (error) {
        console.error("Error loading user ID", error);
      }
    };
    loadUserId();
  }, []);
  useEffect(() => {
    setIsLoading(true);
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, orderBy("timestamp", "asc"), limit(100));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = querySnapshot.docs.map((doc) => doc.data());
      const groupedChats = groupChatHistoryByDate(chats);
      setChatHistory(groupedChats);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSendMessage = async () => {
    setIsSendingMessage(true);
    try {
      // your message sending code here
      await storeChatHistory(userId, message);
    } finally {
      setMessage("");
      Keyboard.dismiss();
      setIsSendingMessage(false);
    }
  };

  const deleteMessage = async (chat) => {
    try {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef, where("message", "==", chat.message));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref); // Change this line
      });
    } catch (error) {
      console.error("Error deleting chat message:", error);
    }
  };

  const storeUserData = async (userId, color, avatar, notificationSettings) => {
    const usersRef = collection(db, "users");
    await setDoc(doc(usersRef, userId), {
      username,
      color,
      avatar,
    });
  };

  const storeChatHistory = async (userId, message) => {
    const chatsRef = collection(db, "chats");
    const docRef = await addDoc(chatsRef, {
      userId,
      username,
      message,
      userAvatar,
      timestamp: new Date().getTime(),
    });
    await updateDoc(docRef, {
      id: docRef.id,
    });
    return docRef.id;
  };

  const groupChatHistoryByDate = (chatHistory) => {
    const groupedChatHistory = {};
    chatHistory.forEach((chat) => {
      const date = new Date(chat.timestamp).toLocaleDateString();
      if (!groupedChatHistory[date]) {
        groupedChatHistory[date] = [];
      }
      groupedChatHistory[date].push({
        userId: chat.userId,
        username: chat.username,
        message: chat.message,
        userAvatar: chat.userAvatar,
        timestamp: chat.timestamp,
        // You need to add the id field here
        id: chat.id,
      });
    });
    return groupedChatHistory;
  };

  return (
    <View style={styles.container}>
      {/* No Internet notification */}
      {!isConnected && (
        <View
          style={{
            position: "absolute",
            top: 20,
            left: "40%",
            backgroundColor: "#FF3737",
            padding: 10,
            borderRadius: 10,
            elevation: 10, // add this for Android
            zIndex: 1000, // add this for iOS
            shadowColor: "#000",

            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <Text style={{ color: "#fff" }}>No Internet!!</Text>
        </View>
      )}
      {/* Loading progress bar */}
      {(isLoading || isSendingMessage) && (
        <View
          style={{
            position: "absolute",
            top: "20%",
            right: "50%",
            zIndex: 1000,
          }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      )}

      <ScrollView
        style={styles.chatHistory}
        ref={scrollViewRef}
        onScroll={(event) => {
          const { nativeEvent } = event;
          const { contentOffset, contentSize, layoutMeasurement } = nativeEvent;
          const isAtBottom =
            contentOffset.y + layoutMeasurement.height >=
            contentSize.height - 10;
          setIsAtBottom(isAtBottom);
        }}
      >
        {Object.keys(chatHistory).map((date) => (
          <View key={date}>
            <View
              style={{
                backgroundColor: "#ccc",
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                alignSelf: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "#333" }}>{date}</Text>
            </View>
            {chatHistory[date].map((chat, index) => (
              <View key={index}>
                {chat.userId !== userId ? (
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={avatars[chat.userAvatar]}
                      style={styles.avatar}
                    />
                    <TouchableOpacity
                      style={[styles.chatBubble, styles.leftAlignment]}
                    >
                      <Text style={styles.authorName}>@{chat.username}</Text>
                      <TouchableOpacity style={styles.messageContainer}>
                        <Text
                          style={styles.chatText}
                          onLongPress={() => {
                            Clipboard.setString(chat.message);
                          }}
                        >
                          {chat.message}
                        </Text>
                        <Text style={styles.timestamp}>
                          {new Date(chat.timestamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.replyButton}
                      onPress={() => {
                        setMessage(`@${chat.username} `);
                        messageInputRef.current.focus();
                      }}
                    >
                      <MaterialIcons name="reply" size={20} color={"gray"} />
                      {/* <Text style={styles.replyButtonText}>Reply</Text> */}
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[styles.chatBubble, styles.rightAlignment]}
                  >
                    <Text style={styles.authorName}>@{chat.username}</Text>
                    <View style={styles.messageContainer}>
                      <Text
                        style={styles.chatText}
                        onLongPress={() => {
                          Alert.alert("Options", "", [
                            {
                              text: "Delete",
                              onPress: async () => {
                                await deleteMessage(chat);
                              },
                            },
                            {
                              text: "Copy",
                              onPress: () => {
                                Clipboard.setString(chat.message);
                              },
                            },
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                          ]);
                        }}
                      >
                        {chat.message}
                      </Text>
                      <Text style={styles.timestamp}>
                        {new Date(chat.timestamp).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      {!isAtBottom && (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            position: "absolute",
            alignItems: "flex-end",
            elevation: 10,
            bottom: 110,
            right: 25,
          }}
          onPress={() => {
            scrollViewRef.current.scrollToEnd();
          }}
        >
          <MaterialIcons
            name="keyboard-double-arrow-down"
            size={35}
            color={"#ccc"}
            style={{
              backgroundColor: "gray",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          {/* <Icon name="arrow-drop-down-circle" size={50} color={"blue"} /> */}
        </TouchableOpacity>
      )}

      <View style={styles.message}>
        <TextInput
          ref={messageInputRef}
          style={[styles.inputMessage, { color: "white" }]}
          placeholder="Send new message"
          placeholderTextColor="white"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity
          style={styles.sendMessage}
          onPress={handleSendMessage}
        >
          <MaterialIcons name="send" size={30} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* Model View for settings */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setIsSettingsModalVisible(true)}
      >
        <MaterialIcons name="settings" size={20} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={isSettingsModalVisible}
        transparent={true}
        onRequestClose={() => setIsSettingsModalVisible(false)}
      >
        <View style={styles.settingsModal}>
          <View style={styles.settingsModalContent}>
            <Text style={styles.heading}>Edit Info:</Text>
            <Text style={styles.subHeading}>Change Username:</Text>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              style={styles.textInput}
            />
            <Text style={styles.subHeading}>Pick an Avatar:</Text>
            <View style={styles.avatarSelector}>
              {Object.keys(avatars).map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setUserAvatar(avatar)}
                  style={[
                    styles.avatarContainer,
                    {
                      borderColor: userAvatar === avatar ? "#007bff" : "#ccc",
                      borderWidth: userAvatar === avatar ? 2 : 0,
                    },
                  ]}
                >
                  <Image source={avatars[avatar]} style={styles.avatar} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.notificationToggle}>
              <Text style={styles.subHeading}>Tag Me:</Text>
              <Switch
                trackColor={{ false: "#ccc", true: "#ccc" }}
                thumbColor={enableNotifications ? "#007bff" : "#fff"}
                ios_backgroundColor="#ccc"
                onValueChange={(value) => setEnableNotifications(value)}
                value={enableNotifications}
                //disabled={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveSettingsButton}
                onPress={async () => {
                  await storeUserData(
                    userId,
                    userColor,
                    userAvatar,
                    enableNotifications
                  );
                  setIsSettingsModalVisible(false);
                }}
              >
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeSettingsButton}
                onPress={() => setIsSettingsModalVisible(false)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  chatHistory: {
    flex: 1,
  },
  chatBubble: {
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    maxWidth: "75%",
    minWidth: 100,
  },
  rightAlignment: {
    alignSelf: "flex-end",
    backgroundColor: "#B6DAFE",
  },
  leftAlignment: {
    alignSelf: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  chatText: {
    fontSize: 16,
    marginLeft: 10,
  },
  message: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    alignItems: "center",
  },
  inputMessage: {
    backgroundColor: "gray",
    padding: 15,
    borderColor: "#cccccc",
    borderRadius: 60,
    borderWidth: 1,
    flex: 1,
  },
  sendMessage: {
    width: 50,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    borderRadius: 25,
    padding: 10,
  },
  authorName: {
    fontSize: 12,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 11,
    color: "#999",
    marginTop: 5,
    textAlign: "right",
  },
  settingsButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  settingsModal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  avatarSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  avatarContainer: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  avatarSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  saveSettingsButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  closeSettingsButton: {
    backgroundColor: "#ccc",
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  notificationToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  replyButton: {
    position: "relative",
    alignSelf: "flex-end",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "#ccc", //"#4CAF50",
    padding: 7,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  replyButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatScreen;
