import { StyleSheet, Text, TouchableOpacity, View,Platform,StatusBar } from 'react-native'
import React from 'react'
import IconButton from './IconButton'
import { colors } from '../global/colors'
/* import { deleteSession } from '../db'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
 */


const Header = ({title}) => {

    console.log(title);
    

/*     const dispatch = useDispatch()
    const idToken = useSelector(state => state.auth.idToken)
  
    const onLogout = () =>{
        deleteSession()
        dispatch(clearUser())
    }
 */  
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title ? title : 'Sin título'}</Text>
{/*             {idToken} && 
            <TouchableOpacity onPress={onLogout} style={styles.logout}>
                <IconButton name={"logout"} size={24} color={"White"} />
            </TouchableOpacity>
 */}        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
    marginTop:Platform.OS === "android" ? StatusBar.currentHeight:0,
    backgroundColor:colors.color1,
    width:"100%",
    height:80,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    position:"relative"
    },
    text:{
    fontSize:25,
    },
    logout:{
    position:"absolute",
    right:10,
    bottom:20
    }    
})