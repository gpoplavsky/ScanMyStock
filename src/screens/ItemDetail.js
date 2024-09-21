import { StyleSheet, Text, TextInput, View, Dimensions, Alert, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { colors } from '../global/colors'
import ShadowWrapper from '../components/ShadowWrapper'
import PrimaryBtn from '../components/PrimaryBtn'
import SecondaryBtn from '../components/SecondaryBtn'
import {Picker} from '@react-native-picker/picker'
import { useDispatch } from 'react-redux'
import { updateItem } from '../reducers/itemReducer'

const ItemDetail = ({route, navigation}) => {

  // paso el item por los parámetros de ruta
  const {item} = route.params

  // creo los estados que van a modificar los valores del item mostrado
  const [title, setTitle] = useState(item.title)
  const [dni, setDni] = useState(item.dni)
  const [name, setName] = useState(item.name)
  const [email, setEmail] = useState(item.email)
  const [account, setAccount] = useState(item.account)
  // creo un estado que será usado por Picker (el componente que me muestra un dropdown para Estado y Lista)
  const [selectedStatus, setSelectedStatus] = useState(item.status);
  const [selectedList, setSelectedList] = useState(item.list);

  // uso el dispatch de redux
  const dispatch = useDispatch()

  // para que al presionar el botón Modificar, se corre una función handleSubmit que guarda todos los cambios en el item, permitiendo que el mismo pueda ser visto en otras pantallas como Stock, Archived y Delivered 
  const handleSubmit = () => {
    const updatedItem = {
      ...item,
      title,
      dni,
      name,
      email,
      account,
      status: selectedStatus,
      list: selectedList,
    }
    //despacho la acción de redux para actualizar el item
    dispatch(updateItem(updatedItem))
    Alert.alert('Datos guardados',`Título: ${updatedItem.title}, DNI: ${updatedItem.dni}`)
    navigation.goBack() // y vuelvo a la pantalla anterior
  }

  // le damos estilos para cuando se abre y cierra el dropdown
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }  

  return (
    <ScrollView>
      <ShadowWrapper style={[styles.container, { width: Dimensions.get('window').width * 0.95 }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.descriptionText}>id: {item.id}</Text>
          <TextInput
            style={styles.title}
            value={title}
            onChangeText={setTitle}
          />
          <Text style={styles.descriptionText}>{item.date} </Text>
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
              onChangeText={setDni}
            />
          </View>
          <View style={styles.descriptionDetail}>
            <Text style={styles.descriptionText}>Nombre y Apellido</Text>
            <TextInput
              style={styles.input}
              placeholder='Ingrese el Nombre'
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.descriptionDetail}>
            <Text style={styles.descriptionText}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Ingrese el Email'
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.descriptionDetail}>
            <Text style={styles.descriptionText}>CC</Text>
            <TextInput
              style={styles.input}
              placeholder='Ingrese Cuenta comitente'
              value={account}
              onChangeText={setAccount}
            />
          </View>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.titleDetail}>
            <Text style={styles.text}>Detalles del envío</Text>
          </View>
          <View style={styles.descriptionDetail}>
            <Text style={styles.descriptionText}>Estado</Text>
            <Picker
              style={styles.dropdown}
              selectedValue={selectedStatus}
              onValueChange={(itemValue) => setSelectedStatus(itemValue)}
              selectionColor={colors.color3}
              prompt='Seleccione el estado del envío'
              ref={pickerRef}
              mode='dialog'
              dropdownIconColor={colors.light}
              dropdownIconRippleColor={colors.color3}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Cliente contactado" value="contacted" 
                  style={{backgroundColor:colors.dark40, color:colors.light, borderRadius:3}}/>
                <Picker.Item label="Segundo contacto" value="second-contact" 
                  style={{backgroundColor:colors.dark60, color:colors.light, borderRadius:3}}/>
                <Picker.Item label="Tercer contacto" value="third-contact" 
                  style={{backgroundColor:colors.dark80, color:colors.light, borderRadius:3}} />
                <Picker.Item label="Envío a domicilio" value="send-to-address"
                  style={{backgroundColor:"lightgreen", color:colors.dark, borderRadius:3}} />
                <Picker.Item label="Envío a Punto Pickit" value="send-to-pickit"
                  style={{backgroundColor:"lightgreen", color:colors.dark, borderRadius:3}} />
                <Picker.Item label="Retira por oficina" value="office-pickup"
                  style={{backgroundColor:"lightgreen", color:colors.dark, borderRadius:3}} />
                <Picker.Item label="PARA ARCHIVAR" value="to-archive"
                  style={{backgroundColor:"orange", color:colors.dark, borderRadius:3}} />
                <Picker.Item label="PARA DESPACHAR" value="to-delivery"
                  style={{backgroundColor:colors.color3, color:colors.dark, borderRadius:3}} />
            </Picker>
          </View>
          <View style={styles.descriptionDetail}>
            <Text style={styles.descriptionText}>Lista</Text>
            <Picker
              style={styles.dropdown}
              selectedValue={selectedList}
              onValueChange={(itemValue) => setSelectedList(itemValue)}
              selectionColor={colors.color3}
              prompt='Enviar a lista:'
              ref={pickerRef}
              mode='dialog'
              dropdownIconColor={colors.light}
              dropdownIconRippleColor={colors.color3}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="En Stock" value="stock" 
                  style={{backgroundColor:colors.color2, color:colors.light, borderRadius:3}}/>
                <Picker.Item label="Enviadas" value="delivered" 
                  style={{backgroundColor:colors.color1, color:colors.light, borderRadius:3}}/>
                <Picker.Item label="Archivadas" value="archived" 
                  style={{backgroundColor:colors.color3, color:colors.light, borderRadius:3}}/>
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryBtn Title="Modificar" onPress={handleSubmit}/>
          <SecondaryBtn Title="Volver" onPress={()=>navigation.goBack()}/>
        </View>
      </ShadowWrapper>
    </ScrollView>
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
    height:48,
    width:300,
    paddingHorizontal:10,
    alignItems:"center",
    color:colors.light,
    marginBottom:6,
  },
  titleDetail:{
    marginBottom:7
  },
  descriptionDetail:{
    gap:6
  },
  buttonContainer:{
    position:"relative",
    bottom:0,
    gap:5,
    alignSelf:"center",
    marginVertical:30
},
dropdown:{
  borderWidth:1,
  borderColor:"white",
  backgroundColor:"rgba(217, 217, 217, 0.2)",
  width:300,
  height:48,
  alignItems:"center",
  justifyContent:"center",
  marginBottom:7,
  borderRadius:3
}
})