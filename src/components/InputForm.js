import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '../global/colors'

const InputForm = ({label, value, placeholder, onChangeText, error, isSecure}) => {
    
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={isSecure} />
        <View>
            <Text style={styles.error}>{error ? error : ""} </Text>
        </View>
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
    container: {
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        width:"100%"        
    },
    label:{
        width:"90%",
        fontSize:14,
        color:colors.light,
        marginBottom:7
    },
    error:{
        fontSize:10,
        color:"red"
    },
    input:{
        backgroundColor:"rgba(217, 217, 217, 0.2)",
        borderRadius:3,
        height:48,
        width:"90%",
        paddingHorizontal:10,
        alignItems:"center",
        color:colors.light,
        marginBottom:6,
    }
})