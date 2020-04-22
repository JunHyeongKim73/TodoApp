import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  AsyncStorage,
} from "react-native";
import Todo from "./Todo";
import { render } from "react-dom";
import { AppLoading } from "expo";
import uuid from "react-native-uuid";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedToDos: false,
    toDos: {},
  };
  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const { newTodo, loadedToDos, toDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>To Do </Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New to do"}
            value={newTodo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.todos}>
            {Object.values(toDos).map((toDo) => (
              <Todo
                key={toDo.id}
                deleteToDo={this._deleteToDo}
                uncompleteToDo={this._uncompleteToDo}
                completeToDo={this._completeToDo}
                updateToDo={this._updateToDo}
                {...toDo}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controlNewToDo = (text) => {
    this.setState({
      newTodo: text,
    });
  };
  _loadToDos = async () => {
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos: true,
        toDos: parsedToDos,
      });
    } catch (err) {
      console.log(err);
    }
  };
  _addToDo = () => {
    const { newTodo } = this.state;
    if (newTodo != "") {
      this.setState((prevState) => {
        const ID = uuid.v1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            date: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newTodo: "",
          toDos: {
            ...prevState.toDos,
            ...newTodoObject,
          },
        };
        this._saveToDos(newState.toDos);
        return { ...newState };
      });
    }
  };
  _deleteToDo = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _uncompleteToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _completeToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _updateToDo = (id, text) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text,
          },
        },
      };
      this._saveToDos(newState.toDos);
      return { ...newState };
    });
  };
  _saveToDos = (newToDos) => {
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 20,
    fontWeight: "200",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    width: width - 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  todos: {
    alignContent: "center",
  },
});
