import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import Task from "./Task.js";
import { Icon } from "react-native-elements";

import { useState, useEffect } from "react";

export default function Todo({ onTodoLengthChange }) {
  // Creating useState for Input task
  const [task, settask] = useState();
  const [todo, setTodo] = useState([]);

  //Changing number in Navigation bar
  useEffect(() => {
    onTodoLengthChange(todo.length);
  }, [todo.length]);

  //Generating a new ID
  const generateUniqueId = () => {
    const date = new Date();
    const timestamp = date.getTime();
    const uniqueId = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${timestamp}`;
    return uniqueId;
  };
  //Adding task function:
  function AddTask(task) {
    Keyboard.dismiss();
    if (!task || task === "") return;
    setTodo((todo) => {
      return [
        ...todo,
        { id: generateUniqueId(), title: task, completed: false },
      ];
    });
    console.log(task);
    settask("");
  }

  //Completed task:
  const CompletedTask = (id) => {
    setTodo((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  //Delete Task:
  function DeleteTask(itemId) {
    setTodo(todo.filter((item) => itemId != item.id));
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {/* Title */}
        <Text style={styles.sectionTitle}> Plan's for today</Text>
        <View style={styles.items}>
          {todo.map((item) => {
            return (
              <Task
                key={item.id}
                item={item}
                CompletedTask={CompletedTask}
                DeleteTask={DeleteTask}
              />
            );
          })}
          {/* This is here list of tasks */}
        </View>
      </ScrollView>
      {/* Adding new task */}
      <View style={styles.addTask}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTask}
        >
          <TextInput
            style={styles.inputTask}
            placeholder="Add new Task"
            value={task}
            onChangeText={(text) => settask(text)}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => AddTask(task)}
        >
          <Icon name="add" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
