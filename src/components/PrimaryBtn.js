import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../global/colors'

const PrimaryBtn = ({Title, onPress}) => {
  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={onPress}>
            <Text style={styles.buttonPrimaryText}>{Title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default PrimaryBtn

const styles = StyleSheet.create({
    buttonContainer:{
        padding:5
    },
    buttonPrimary:{
        backgroundColor: colors.color1,
        borderRadius: 3,
        width:277,
        height:48,
        justifyContent:"center"
    },
    buttonPrimaryText:{
        color: "white",
        fontWeight: "bold",
        textAlign:"center",
        fontSize:18
    }
})