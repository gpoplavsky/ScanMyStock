import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from './IconButton'
import { colors } from '../global/colors'

const Search = ({onSearch}) => {

    const [input, setInput] = useState("")
    const [error, setError] = useState("")

    const handleInputChange = (t) => {
        setInput(t)
    }

    const handleRemoveInput = () => {
        setInput("")
        onSearch("")
        setError("")
    }

    const search = () => {
        const regex = /[^a-zA-Z0-9 ]/
        if(regex.test(input)){
            setError("Caracteres no válidos")
        }else{
            setError("")
            onSearch(input)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={input}
                placeholder='Buscar tarjeta'
                placeholderTextColor={colors.dark}
                onChangeText={handleInputChange}
            />
            <View style={styles.iconContainer}>
            <IconButton
                    style={styles.icon}
                    name={'search'}
                    size={28}
                    color={colors.dark}   
                    onPressIconButton={search} 
                />
                <IconButton
                    style={styles.icon}
                    name={'cancel'}
                    size={28}
                    color={colors.dark}  
                    onPressIconButton={handleRemoveInput}                   
                />
            </View>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:53,
        padding:5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:5,
        marginBottom:10
    },
    input:{
        borderColor:"black",
        borderWidth:0.2,
        borderRadius:30,
        padding:10,
        width:"70%",
        backgroundColor:"white"
    },
    iconContainer:{
        flexDirection:"row",
        gap:5,
        position:"relative",
        right:0
    },
    error:{
        color:"red",
        fontSize:10
    }
})