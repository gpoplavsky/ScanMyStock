import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IconButton = ({name, size, color, onPressIconButton}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPressIconButton}>
            <MaterialIcons style={styles.iconButton} 
                name={name} 
                size={size} 
                color={color}
            />
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container:{
        height:36,
        width:36,
        margin:3,
        padding:3,
        borderRadius:32,
        justifyContent:"center",
        alignItems:"center"
    },
    iconButton:{
        flex:1,

    }
})