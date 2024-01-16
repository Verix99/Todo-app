import { StyleSheet, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';

export default function NewList(props) {
    const [newTask, setNewTask] = useState("");
    const userColors = ["#ff6347", "#ee82ee", "#9acd32", "#24A6D9", "#dc143c", "#8022D9", "#4169e1"]
    const [usrColor, setUsrColor] = useState(userColors[0])

    const createColors = () => {
      return userColors.map(color => {
          return( 
          <TouchableOpacity onPress={() => setUsrColor(color)} key={color} style={[styles.colorBox, {backgroundColor: color}]}/>
          )
      });
    };

    const handleCreate = () => {
      if (newTask.trim() === "") {
        alert("Název listu nemůže být prázdný.");
        return;
      }
      props.addItem({ name: newTask, color: usrColor, todos: [] });
      setNewTask("");
      setUsrColor(userColors[6]);
      props.onOpen();
    };
    
  return (
    <View style={styles.background}>
      <View style={styles.popup}>
        <TouchableOpacity onPress={props.onOpen} style = {styles.closeBtn}>
          <Image source={{uri:"https://img.icons8.com/ios-filled/50/delete-sign--v1.png"}} height={35} width={35}/>
        </TouchableOpacity>
        <Text style={styles.title}>Vytvoř nový list</Text>
        <View style = {styles.chooseContainer}>
          <TextInput style={[styles.input, {borderColor:usrColor}]} placeholder='Napiš název listu...' onChangeText={text => setNewTask(text)}/>
          <View  style={styles.colorContainer}>
            {createColors()}
          </View>
          <TouchableOpacity onPress={handleCreate} style={[styles.button, {backgroundColor:usrColor}]}>
            <Text>Vytvořit</Text>
          </TouchableOpacity>
        </View>
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
    background: {
      backgroundColor:"#000000aa", 
      flex:1, 
      justifyContent:"center"
    },
    popup:{
      backgroundColor:"white",
      borderWidth:2, 
      margin:30, 
      height:"60%", 
      alignItems:"center", 
      borderRadius:15, 
      justifyContent:"center"
    },
    closeBtn:{
      position:"absolute", 
      right: 20, 
      top:20, 
      alignItems:"center", 
      justifyContent:"center"
    },
    chooseContainer:{
      alignItems:"center",
      height:"45%",
      justifyContent:"space-evenly"
    },
    input:{
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: "#FFF",
      borderRadius: 10,
      borderColor: "blue",
      borderWidth: 1,
      width: 250,
    },
    title: {
      fontSize:35,
      marginBottom:40
    },
    colorBox:{
      width:30,
      height:30,
      borderRadius: 4,
      borderWidth:1,
    },
    colorContainer:{
      width:"80%",
      flexDirection:"row",
      justifyContent:"space-around",
      flexWrap:"wrap", 
      alignItems:"center" 
    }, 
    button:{
      marginTop:20, 
      backgroundColor:"blue", 
      padding:15,
      borderRadius:10, 
      alignItems:"center",
      width:250,
      borderWidth:1,
    }
    
  
  });
  