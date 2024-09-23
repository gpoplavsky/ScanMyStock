import { StyleSheet, Text, TouchableOpacity, View,Platform,StatusBar } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSession } from '../db'
import { clearUser } from '../features/auth/authSlice'



const Header = ({title, navigation}) => { 

    const dispatch = useDispatch()
    const idToken = useSelector(state => state.auth.idToken)

    const onLogout = async () => {
        dispatch(clearUser())
        const sessionDeleted = await deleteSession({localId})
        console.log(sessionDeleted)
    }
 
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            {idToken && 
            <TouchableOpacity onPress={onLogout} style={styles.logout}>
                <IconButton name={"logout"} size={24} color="white" />
            </TouchableOpacity>}
        </View>      
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
    marginTop:Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor:colors.color1,
    width:"100%",
    height:64,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    position:"relative",
    marginBottom:10
    },
    text:{
    fontSize:24,
    color:"white",
    fontWeight:"bold"
    },
    logout:{
    position:"absolute",
    right:10,
    color:"white"
    }    
})