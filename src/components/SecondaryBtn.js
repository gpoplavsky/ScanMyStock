import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../global/colors'

const SecondaryBtn = ({Title,onPress}) => {
  return (
    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonSecondary} onPress={onPress}>
            <Text style={styles.buttonSecondaryText}>{Title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SecondaryBtn

const styles = StyleSheet.create({
    buttonContainer:{
        padding:5
    },
    buttonSecondary:{
        backgroundColor: "#00000000",
        borderRadius: 3,
        width:277,
        height:48,
        justifyContent:"center"
    },
    buttonSecondaryText:{
        color: colors.color1,
        fontWeight: "bold",
        textAlign:"center",
        fontSize:18
    }
})