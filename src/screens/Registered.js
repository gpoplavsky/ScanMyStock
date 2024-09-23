import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrimaryBtn from '../components/PrimaryBtn'
import { colors } from '../global/colors'

const Registered = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image source={require('../../assets/img/logo.png')}/>
        <Text style={styles.title}>Registro exitoso</Text>
        <Image style={styles.image} source={require('../../assets/img/registered.png')}/>
        <PrimaryBtn 
          onPress={() => navigation.navigate('Login')}
          Title={"Iniciar sesión"}
        />
    </View>
  )
}

export default Registered

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:colors.light
    },
    title:{
        marginVertical:43,
        color: colors.dark,
        fontSize: 24,
        fontWeight:"bold"
    },
    image:{
        marginBottom:117
    }
})