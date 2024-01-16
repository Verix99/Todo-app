import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, TextInput} from 'react-native';
import Task from './Task';
import { useState} from 'react';

export default function TasksPage(props) {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(props.data);
  const [isEditing, setIsEditing] = useState(false);
  const [remain, setRemain] = useState( props.list.todos.filter(todo => todo.completed).length);
  const [remai, setRemai] = useState(props.completed + props.remaining);

  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    };
    let listIndex = tasks.findIndex(list => list.name === props.list.name);
    if (listIndex !== -1) {
      let taskExists = tasks[listIndex].todos.some(task => task.title === newTask);
    if (taskExists) {
      alert('Úkol se stejným názvem již existuje');
      setNewTask("");
      return;
    };
      const updatedTasks = [...tasks];
      updatedTasks[listIndex].todos.push({ title: newTask, completed: false });
      setTasks(updatedTasks);
      setNewTask("");
      props.remaining += 1;
      setRemai(remai + 1);
    } else {
      alert('Seznam úkolů nebyl nalezen');
    };
  };

  const toggleTaskCompleted = (taskTitle) => {
    let listIndex = tasks.findIndex(list => list.name === props.list.name);
    if (listIndex !== -1) {
      let taskIndex = tasks[listIndex].todos.findIndex(task => task.title === taskTitle);
      if (taskIndex !== -1) {
        tasks[listIndex].todos[taskIndex].completed = !tasks[listIndex].todos[taskIndex].completed;
        setTasks([...tasks]);
        setRemain(tasks[listIndex].todos[taskIndex].completed ? remain + 1 : remain - 1);
      }
    }
  };

  const deleteTask = (title) => {
    const taskIndex = props.list.todos.findIndex(task => task.title === title);
    if (taskIndex >= 0) {
      const taskCompleted = props.list.todos[taskIndex].completed;
      const newTodos = [...props.list.todos];
      newTodos.splice(taskIndex, 1);
      props.list.todos = newTodos;
      if (taskCompleted) {
        setRemain(remain - 1);
      }
      setRemai(remai - 1);
    }
  };

  const editTask = (oldTitle, newTitle) => {
    let listIndex = tasks.findIndex(list => list.name === props.list.name);
    if (listIndex !== -1) {
      let taskIndex = tasks[listIndex].todos.findIndex(task => task.title === oldTitle);
      let taskExists = tasks[listIndex].todos.some(task => task.title === newTitle);
      if (taskExists) {
        alert('Úkol se stejným názvem již existuje');
        return;
      }
      if (taskIndex !== -1) {
        let updatedTasks = [...tasks];
        updatedTasks[listIndex].todos[taskIndex].title = newTitle;
        setTasks(updatedTasks);
      } else {
        alert('Úkol nebyl nalezen');
      }
    } else {
      alert('Seznam úkolů nebyl nalezen');
    }
  };

  return (
    <SafeAreaView style = {styles.container}>
      <TouchableOpacity onPress={props.closeModal} style = {styles.closeBtn}>
        <Image source={{uri: 'https://img.icons8.com/ios-filled/50/delete-sign--v1.png'}} height={35} width={35}/>
      </TouchableOpacity>
      <View style = {[styles.titleContainer, {borderBottomColor:props.color}] }>
        <View style = {{alignItems:"center"}}>
          <Text style = {styles.title}>{props.list.name}</Text>
          <Text style= {styles.tasksNumber}>{remain} z {remai} splněno</Text>
        </View>
      </View>
      <View style={{flex:3, width:"90%"}}>  
      <FlatList showsVerticalScrollIndicator={false}
          data={props.list.todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Task title={item.title} check = {item.completed} toggleTaskCompleted={toggleTaskCompleted} completed={item.completed} deleteTask={deleteTask} editTask={editTask} onEditStart={() => setIsEditing(true)} onEditEnd={() => setIsEditing(false)} />}
        />
      </View>
      {!isEditing && (
        <KeyboardAvoidingView behavior='padding' style={{flexDirection:"row",width:"100%", justifyContent:"space-evenly"}}>
          <TextInput style={[styles.input, {borderColor:props.color}]} placeholder='Napiš nový úkol' value={newTask} onChangeText={setNewTask} />
          <TouchableOpacity onPress={() => addTask()} style={[styles.button, {backgroundColor:props.color}]}>
            <Image source={{uri: 'https://img.icons8.com/android/24/plus.png'}} height={30} width={30}/>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
          );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center", 
  },
  closeBtn:{
    position:"absolute", 
    right: 32, 
    top:55, 
    alignItems:"center", 
    justifyContent:"center"
  },
  title: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: "bold",
  },
  titleContainer: {
    width:"100%",
    alignItems:"center",
    borderBottomWidth:4,
    borderRadius:0,
    marginTop:30
  },
  tasksNumber: {
    fontSize: 16,
    marginBottom: 15,
    color: "grey",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "purple",
    borderWidth: 1,
    width: 250,
    marginBottom: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 60,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  }

});
