import {  StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function Task(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
      setIsClicked(props.check);
    }, [props.check]);

    const handleDone = () => {
      props.toggleTaskCompleted(props.title);
      setIsClicked(!isClicked);
    };

    const handleEdit = () => {
      setEditedTitle(props.title);
      setIsEditing(true);
      props.onEditStart(); 
    };

    const handleSave = () => {
      if (editedTitle.trim() === "") {
        return;
      }
      props.editTask(props.title, editedTitle);
      setIsEditing(false);
      props.onEditEnd(); 
    };
    
    const swipeoutBtn = [
      {
        text: 'Smazat',
        backgroundColor: 'white',
        color: 'red',
        onPress: () => props.deleteTask(props.title)
      }
    ];

  return (
    <View style = {{marginTop:15}}>
      <Swipeout right={swipeoutBtn}  autoClose={true} style={{backgroundColor:"white", borderRadius:10}}>
        <View style= {styles.container}>
          <View style={styles.containerContent}>
            <TouchableOpacity style={{width:"10%",}} onPress={handleDone}>
              {isClicked ? <Feather name="check-circle" size={24} color="black" /> : <Feather name="circle" size={24} color="black"  />}
            </TouchableOpacity>
            {isEditing ? (
            <TextInput value={editedTitle} onChangeText={setEditedTitle} onSubmitEditing={handleSave} scrollEnabled={true}
              style={{width:"80%", textDecorationLine: isClicked ? 'line-through' : 'none', color: isClicked ? 'gray' : 'black'}}
            />
          ) : (
            <Text numberOfLines={1} style={{width:"80%", textDecorationLine: isClicked ? 'line-through' : 'none', color: isClicked ? 'gray' : 'black'}}>{props.title}</Text>
          )}
            <TouchableOpacity style={styles.editIcon} onPress={isEditing ? handleSave : handleEdit}>
              <Feather name={isEditing ? "save" : "edit-2"} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Swipeout>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    borderWidth: 1,
    borderRadius: 10,
  },
  containerContent: {
    alignItems:"center", 
    flexDirection:"row", 
    width:"90%", 
    height:40,
  },
  editIcon: {
    width:"10%",
    alignItems:"center"
  }

});
