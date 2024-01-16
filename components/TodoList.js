import {StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import TasksPage from './TaksPage';

export default function TodoList({list, deleteItem, data}) {
    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    const [TodoVisible, setTodoVisible] = useState(false);

    const toggleTodoModal = () => {
        setTodoVisible(!TodoVisible);
    }

    return (
        <View>
            <Modal animationType='slide' visible={TodoVisible} onRequestClose = {() => toggleTodoModal()}>
                <TasksPage  closeModal = {toggleTodoModal} remaining = {remainingCount} completed = {completedCount} color = {list.color} list = {list} name = {list.title} progress = {list.completed} data = {data}/>
            </Modal>
            <TouchableOpacity onPress={() => toggleTodoModal()} style = {[styles.listWrap, {backgroundColor: list.color}]}>
                
            <Text style = {styles.titleList}>
                {list.name}
            </Text>

            <View>
                <View style = {{alignItems:"center"}}>
                    <Text style = {styles.listNumber}>{completedCount}</Text>
                    <Text style = {styles.listText}>Hotovo</Text>
                </View>
                <View style = {{alignItems:"center"}}>
                    <Text style = {styles.listNumber}>{remainingCount}</Text>
                    <Text style = {styles.listText}>Nedokončeno</Text>
                </View>
                <TouchableOpacity style = {styles.deleteBtn}onPress={deleteItem}>
                    <Feather name="trash" size={24} color="black" />
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    listWrap:{
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems:"center",
        width: 200,
        height: 300
    },
    titleList:{
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 18
    },
    listNumber:{
        fontSize: 48,
        fontWeight: "bold",
        color: "black"
    },
    deleteBtn:{
        alignItems:"center",
        marginTop: 10
    },
    listText:{
        fontSize: 18,
        color: "white"
    }
})