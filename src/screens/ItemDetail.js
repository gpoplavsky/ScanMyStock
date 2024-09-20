import { StyleSheet, Text, TextInput, View, Dimensions, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../global/colors'
import ShadowWrapper from '../components/ShadowWrapper'
import PrimaryBtn from '../components/PrimaryBtn'
import SecondaryBtn from '../components/SecondaryBtn'

const ItemDetail = ({route, navigation}) => {

  const {item} = route.params

  const [title, setTitle] = useState(item)
  const [dni, setDni] = useState('33876481')

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth *0.95;  

  const handleSubmit = () => {
    Alert.alert('Datos guardados',`Título: ${title}, DNI: ${dni}`)

    navigation.goBack()
  }

  return (
    <ShadowWrapper style={[styles.container, { width: itemWidth }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.descriptionText}>id</Text>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={(newTitle)=> setTitle(newTitle)}
        />
        <Text style={styles.descriptionText}>timestamp</Text>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.titleDetail}>
          <Text style={styles.text}>Datos del Cliente</Text>
        </View>
        <View style={styles.descriptionDetail}>
          <Text style={styles.descriptionText}>DNI</Text>
          <TextInput
            style={styles.input}
            placeholder='Ingrese el DNI del cliente'
            value={dni}
            onChangeText={(newDni)=> setDni(newDni)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryBtn Title="Modificar" onPress={handleSubmit}/>
        <SecondaryBtn Title="Volver" onPress={()=>navigation.goBack()}/>
      </View>
    </ShadowWrapper>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:colors.dark,
    borderWidth:0.4,
    borderColor:colors.dark,
    borderRadius:9,
    alignSelf:"center"
  },
  titleContainer:{
    justifyContent:"center",
    alignItems:"center",
    marginBottom:10
  },
  title:{
    fontWeight:"bold",
    fontSize:24,
    color:colors.light
  },
  descriptionText:{
    fontSize:10,
    color:colors.light
  },
  text:{
    fontSize:14,
    color:colors.light
  },
  detailContainer:{
    alignItems:"flex-start",
    justifyContent:"flex-start",
  },
  input:{
    backgroundColor:"rgba(217, 217, 217, 0.2)",
    borderRadius:3,
    height:30,
    width:"100%",
    paddingHorizontal:10,
    alignItems:"center",
    color:colors.light
  },
  titleDetail:{
    marginBottom:7
  },
  descriptionDetail:{
    gap:6
  },
  buttonContainer:{
    position:"absolute",
    bottom:0,
    gap:5,
    alignSelf:"center",
    marginVertical:10
},
})