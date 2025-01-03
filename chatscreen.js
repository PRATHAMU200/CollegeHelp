import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {/* Title */}
        <Text style={styles.sectionTitle}> Plan's for today</Text>
      </ScrollView>
      {/* Adding new task */}
      <View style={styles.addTask}>
        <TextInput
          style={styles.inputTask}
          placeholder="Add new Task"
          onChangeText={(text) => settask(text)}
        />
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" />
        </TouchableOpacity>
      </View>
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
  taskList: {},
  sectionTitle: {
    fontSize: 34,
    fontWeight: "500",
  },
  items: {
    marginTop: 40,
    gap: 20,
    marginBottom: 20,
  },
  addTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    alignItems: "center",
  },
  writeTask: {
    flex: 1,
    marginRight: 15,
  },
  inputTask: {
    backgroundColor: "white",
    padding: 15,
    borderColor: "#cccccc",
    borderRadius: 60,
    borderWidth: 1,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 25,
  },
});

export default ChatScreen;
